import { MessageEntity, RoomEntity, UserEntity } from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";

export type RoomWithUserAndMessages = RoomEntity & {conversation: UserEntity, messageObject: MessageEntity[]}

export abstract class MessageAbstractRepository {
  abstract create(messageModel: MessageModel): Promise<MessageEntity>;
  abstract delete(id: number): Promise<void>;
  abstract getAll(userId:number, conversationId: number): Promise<MessageEntity[]>;
  abstract findRoom(userId:number, conversationId: number): Promise<RoomEntity>;
  abstract findRoomByUserId(userId:number): Promise<RoomWithUserAndMessages[]>;
}
