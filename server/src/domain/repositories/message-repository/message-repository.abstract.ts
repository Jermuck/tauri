import { MessageEntity, RoomEntity, UserEntity } from "@prisma/client";
import { MessageModel } from "src/domain/models/MessageModel/message.model";

export type RoomWithUserAndMessages = RoomEntity & {conversation: UserEntity, messageObject: MessageEntity[]}

export abstract class MessageAbstractRepository {
  abstract create(messageModel: MessageModel): Promise<MessageEntity>;
  abstract delete(id: number): Promise<void>;
  abstract getAll(userId:number, conversationId: number): Promise<MessageEntity[]>;
  abstract findOneRoom(userId:number, conversationId: number): Promise<RoomEntity>;
  abstract findRoomsByUserIdWithRelation(id:number, searchParam: 'userId' | 'conversationId'): Promise<RoomWithUserAndMessages[]>;
  abstract deleteRoom(roomId:number): Promise<void>;
}
