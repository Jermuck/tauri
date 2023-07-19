import { BadRequestException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { MessageEntity } from "@prisma/client";
import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { DeleteRoomResponse, UserOpenRoomResponse } from "../response-data/response.interface";
import { RoomAbstractRepository } from "src/domain/repositories/room-repository/room-repository.abstract";
import { RoomWithUserAndMessages } from "src/domain/repositories/room-repository/room-repository.abstract";

export class TcpUseCase {
  constructor(
    private readonly tcpService: TcpAbstractAdapter,
    private readonly userRepo: UserAbstractReposiotory,
    private readonly messageRepo: MessageAbstractRepository,
    private readonly roomRepo: RoomAbstractRepository
  ) { };

  private compare(firstMessage: MessageEntity, secondMessage: MessageEntity): number {
    if (firstMessage.id > secondMessage.id) return 1;
    if (firstMessage.id < secondMessage.id) return -1;
    return 0;
  };

  private async convertToUserOpenMessageChatList(array: RoomWithUserAndMessages[] ): Promise<UserOpenRoomResponse[]> {
    const sortedArray: Array<UserOpenRoomResponse> = [];
    for (const element of array) {
      const messages = await this.getMessages(element.userId, element.conversationId);
      sortedArray.push({
        user: element.user,
        conversation: element.conversation,
        lastMessage: messages.at(-1)
      });
    };
    return sortedArray;
  };

  public getUserId(header: string): number | null {
    const arrayOfHeader = header.split(' ');
    if (arrayOfHeader.length !== 2) return null;
    //@ts-ignore
    const userId = this.tcpService.getUserIdFromToken(arrayOfHeader);
    if (!userId) return null;
    return userId;
  }

  public async saveMessage(messageModel: MessageModel): Promise<MessageEntity & { userId: number, conversationId: number, username: string }> {
    const isExistConversation = await this.userRepo.getById(messageModel.conversationId);
    const isExistUser = await this.userRepo.getById(messageModel.userId);
    if (!isExistUser || !isExistConversation) return;
    const newMessage = await this.messageRepo.create(messageModel);
    return { userId: messageModel.userId, conversationId: messageModel.conversationId, ...newMessage, username: isExistUser.username };
  }

  public async getMessages(userId: number, conversationId: number): Promise<MessageEntity[]> {
    const isExistDialogByNotConversation = await this.roomRepo.findOneRoom(userId, conversationId);
    const isExistDialogByConversation = await this.roomRepo.findOneRoom(conversationId, userId);
    if (!isExistDialogByConversation && !isExistDialogByNotConversation) throw new BadRequestException('Not found room');
    const messageByUser = await this.messageRepo.getAll(userId, conversationId);
    const messageByConversation = await this.messageRepo.getAll(conversationId, userId);
    const combineArrayOfMessages = messageByUser.concat(messageByConversation);
    combineArrayOfMessages.sort(this.compare);
    return combineArrayOfMessages;
  };


  public async getRoomsWithLastMessage(userId: number): Promise<UserOpenRoomResponse[] | any> {
    const arrayRoomsWhereUserId = await this.roomRepo.findRoomsByUserIdWithRelation(userId, 'userId');
    const arrayRoomsWhereConversatioId = await this.roomRepo.findRoomsByUserIdWithRelation(userId, 'conversationId');
    return this.convertToUserOpenMessageChatList(arrayRoomsWhereUserId.concat(arrayRoomsWhereConversatioId));
  };

  public async deleteRoom(roomId: number, userId: number): Promise<DeleteRoomResponse> {
    const isExistRoom = await this.roomRepo.findRoomByRoomId(roomId);
    if(!isExistRoom) return;
    const arrayOfRoomByUserId = [isExistRoom.userId, isExistRoom.conversationId];
    if(!arrayOfRoomByUserId.includes(userId)) return;
    await this.roomRepo.deleteRoom(roomId);
    const pairRoom = await this.roomRepo.findOneRoom(isExistRoom.conversationId, userId);
    if(pairRoom) await this.roomRepo.deleteRoom(pairRoom.id);
    return {
      userRoomId: roomId,
      conversationRoomId: pairRoom ? pairRoom.id : null
    };
  };
};
