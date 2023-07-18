import { MessageEntity} from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";

export abstract class MessageAbstractRepository {
  abstract create(messageModel: MessageModel): Promise<MessageEntity>;
  abstract delete(id: number): Promise<void>;
  abstract getAll(userId:number, conversationId: number): Promise<MessageEntity[]>;
}
