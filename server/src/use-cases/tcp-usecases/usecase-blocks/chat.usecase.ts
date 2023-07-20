import { WsException } from "@nestjs/websockets";
import { MessageEntity } from "@prisma/client";
import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { DeleteRoomResponse } from "../response-data/response.interface";
import { RoomAbstractRepository } from "src/domain/repositories/room-repository/room-repository.abstract";

export class ChatUseCase {
  constructor(
    private readonly tcpService: TcpAbstractAdapter,
    private readonly userRepo: UserAbstractReposiotory,
    private readonly messageRepo: MessageAbstractRepository,
    private readonly roomRepo: RoomAbstractRepository
  ) { };

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

  public async deleteRoom(roomId: number, userId: number): Promise<DeleteRoomResponse> {
    const isExistRoom = await this.roomRepo.findRoomByRoomId(roomId);
    if(!isExistRoom) throw new WsException('Not found Room');
    const arrayOfRoomByUserId = [isExistRoom.userId, isExistRoom.conversationId];
    if(!arrayOfRoomByUserId.includes(userId)) throw new WsException('Not found Room');
    await this.roomRepo.deleteRoom(roomId);
    const pairRoom = await this.roomRepo.findOneRoom(isExistRoom.conversationId, userId);
    if(pairRoom) await this.roomRepo.deleteRoom(pairRoom.id);
    return {
      userRoomId: roomId,
      conversationRoomId: pairRoom ? pairRoom.id : null
    };
  };
};
