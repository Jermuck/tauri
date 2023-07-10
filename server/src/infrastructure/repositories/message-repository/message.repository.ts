import { MessageEntity, RoomEntity } from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageRepository implements MessageAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  private async findRoom(userId: number, conversationId: number): Promise<RoomEntity>{
    const room = this.prisma.roomEntity.findFirst({
      where:{
        userId, conversationId
      }
    });
    return room;
  };
  
  private async createRoom(userId:number, conversationId: number): Promise<RoomEntity>{
    return await this.prisma.roomEntity.create({
      data: {userId, conversationId}
    })
  };

  private async createMessage(roomId: number, messageModel: MessageModel): Promise<MessageEntity>{
    return await this.prisma.messageEntity.create({
      data:{
        roomId: roomId,
        message: messageModel.message,
        time: new Date()
      } 
    })
  };

  public async create(messageModel: MessageModel): Promise<MessageEntity> {
    const isExistRoom = await this.findRoom(messageModel.userId, messageModel.conversationId);
    if(isExistRoom){
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

  public async getAll(userId: number, conversationId: number): Promise<MessageEntity[]> {
    const room = await this.findRoom(userId, conversationId);
    if(!room) return [];
    const messages = await this.prisma.messageEntity.findMany({
      where:{ roomId: room.id }
    });
    return messages;
  }
}
