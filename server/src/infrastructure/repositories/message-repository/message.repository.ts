import { MessageEntity } from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";

export class MessageRepository implements MessageAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  public async create(messageModel: MessageModel): Promise<MessageEntity> {
    return this.prisma.messageEntity.create({ data: { ...messageModel, time: new Date() } });
  };

  public async delete(id: number): Promise<void> {
    await this.prisma.messageEntity.delete({
      where: { id }
    });
  };
}
