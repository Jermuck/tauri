import { MessageEntity, RoomEntity} from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";
import { Injectable } from "@nestjs/common";
import { RoomWithUserAndMessages } from "src/domain/repositories/message-repository/message-repository.abstract";

type MessageOfUserId = MessageEntity & { userId: number };

@Injectable()
export class MessageRepository implements MessageAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  private convertToNormalMessageData(array: (MessageEntity & { room: RoomEntity })[]): MessageOfUserId[] {
    return array.map<MessageOfUserId>(msg => ({
      userId: msg.room.userId,
      id: msg.id,
      message: msg.message,
      time: msg.time,
      roomId: msg.roomId
    }));
  };


  private async createRoom(userId: number, conversationId: number): Promise<RoomEntity> {
    return await this.prisma.roomEntity.create({
      data: { userId, conversationId }
    })
  };

  private async createMessage(roomId: number, messageModel: MessageModel): Promise<MessageEntity> {
    return await this.prisma.messageEntity.create({
      data: {
        roomId: roomId,
        message: messageModel.message,
        time: new Date()
      }
    })
  };
  public async findRoom(userId: number, conversationId: number): Promise<RoomEntity> {
    const room = this.prisma.roomEntity.findFirst({
      where: {
        userId, conversationId
      }
    });
    return room;
  };

  public async create(messageModel: MessageModel): Promise<MessageEntity> {
    const isExistRoom = await this.findRoom(messageModel.userId, messageModel.conversationId);
    if (isExistRoom) {
      return await this.createMessage(isExistRoom.id, messageModel);
    }
    const room = await this.createRoom(messageModel.userId, messageModel.conversationId);
    return await this.createMessage(room.id, messageModel);
  };

  public async delete(id: number): Promise<void> {
    await this.prisma.messageEntity.delete({
      where: { id }
    })
  };

  public async getAll(userId: number, conversationId: number): Promise<MessageOfUserId[]> {
    const room = await this.findRoom(userId, conversationId);
    if (!room) return [];
    const messagesOfTable = await this.prisma.messageEntity.findMany({
      where: { roomId: room.id }, include: { room: true }
    });
    const messages = this.convertToNormalMessageData(messagesOfTable);
    return messages;
  };

  public async findRoomByUserId(userId: number): Promise<RoomWithUserAndMessages[]> {
    return await this.prisma.roomEntity.findMany({
      where: { userId }, include: { messageObject: true, conversation: true }
    });
  };
}
