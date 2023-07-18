import { MessageEntity, RoomEntity } from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { Injectable } from "@nestjs/common";
import { RoomRepository } from "../room-repository/room.repository";
import { PrismaService } from "src/infrastructure/config/prisma.config";

type MessageOfUserId = MessageEntity & { userId: number };

@Injectable()
export class MessageRepository implements MessageAbstractRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomRepo: RoomRepository
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


  private async createMessage(roomId: number, messageModel: MessageModel): Promise<MessageEntity> {
    return await this.prisma.messageEntity.create({
      data: {
        roomId: roomId,
        message: messageModel.message,
        time: new Date()
      }
    })
  };

  public async create(messageModel: MessageModel): Promise<MessageEntity> {
    const isExistRoom = await this.roomRepo.findOneRoom(messageModel.userId, messageModel.conversationId);
    if (isExistRoom) {
      return await this.createMessage(isExistRoom.id, messageModel);
    }
    const room = await this.roomRepo.createRoom(messageModel.userId, messageModel.conversationId);
    return await this.createMessage(room.id, messageModel);
  };

  public async delete(id: number): Promise<void> {
    await this.prisma.messageEntity.delete({
      where: { id }
    })
  };

  public async getAll(userId: number, conversationId: number): Promise<MessageOfUserId[]> {
    const room = await this.roomRepo.findOneRoom(userId, conversationId);
    if (!room) return [];
    const messagesOfTable = await this.prisma.messageEntity.findMany({
      where: { roomId: room.id }, include: { room: true }
    });
    const messages = this.convertToNormalMessageData(messagesOfTable);
    return messages;
  };

}
