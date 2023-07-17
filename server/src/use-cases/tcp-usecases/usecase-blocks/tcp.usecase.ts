import { BadRequestException } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { MessageEntity } from "@prisma/client";
import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository, RoomWithUserAndMessages } from "src/domain/repositories/message-repository/message-repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { UserOpenRoomResponse } from "../response-data/response.interface";

export class TcpUseCase {
  constructor(
    private readonly tcpService: TcpAbstractAdapter,
    private readonly userRepo: UserAbstractReposiotory,
    private readonly messageRepo: MessageAbstractRepository
  ) { };

  private compare(firstMessage: MessageEntity, secondMessage: MessageEntity): number {
    if (firstMessage.id > secondMessage.id) return 1;
    if (firstMessage.id < secondMessage.id) return -1;
    return 0;
  };

  private async convertToUserOpenMessageChatList(array: RoomWithUserAndMessages[]): Promise<UserOpenRoomResponse[]> {
    const sortedArray: Array<UserOpenRoomResponse> = [];
    for (const element of array) {
      if (!sortedArray.find(el => el.user.id === element.userId)) {
        const messages = await this.getMessages(element.userId, element.conversationId);
        sortedArray.push({
          user: element.conversation,
          lastMessage: messages[messages.length - 1]
        });
      }
    };
    return sortedArray;
  }

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
    if (!isExistUser || !isExistConversation) throw new WsException('Not found conversation');
    const newMessage = await this.messageRepo.create(messageModel);
    return { userId: messageModel.userId, conversationId: messageModel.conversationId, ...newMessage, username: isExistUser.username };
  }

  public async getMessages(userId: number, conversationId: number): Promise<MessageEntity[]> {
    const isExistDialog = await this.messageRepo.findOneRoom(userId, conversationId);
    if (!isExistDialog) throw new BadRequestException('Not found room');
    const messageByUser = await this.messageRepo.getAll(userId, conversationId);
    const messageByConversation = await this.messageRepo.getAll(conversationId, userId);
    const combineArrayOfMessages = messageByUser.concat(messageByConversation);
    combineArrayOfMessages.sort(this.compare);
    return combineArrayOfMessages;
  };


  public async getRoomsWithLastMessage(userId: number): Promise<UserOpenRoomResponse[] | any> {
    const roomsWhereUserNotConversation = await this.messageRepo.findRoomsByUserIdWithRelation(userId, 'userId');
    const roomsWhereUserConversation = await this.messageRepo.findRoomsByUserIdWithRelation(userId, 'conversationId');
    const result = await this.convertToUserOpenMessageChatList(roomsWhereUserNotConversation.concat(roomsWhereUserConversation));
    return result;
  };

  public async deleteRoom(roomId: number, userId: number): Promise<string> {
    const roomsWhereUserExistNotCoversation = await this.messageRepo.findRoomsByUserIdWithRelation(userId, 'userId');
    const roomsWhereUserExistConversation = await this.messageRepo.findRoomsByUserIdWithRelation(userId, "conversationId");
    const generalRooms = roomsWhereUserExistConversation.concat(roomsWhereUserExistNotCoversation);
    const isFind = generalRooms.find(el => el.id === roomId);
    if (!isFind) throw new BadRequestException('Not found this room');
    await this.messageRepo.deleteRoom(roomId);
    return 'success';
  }
}
