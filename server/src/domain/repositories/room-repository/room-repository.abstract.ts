import { RoomEntity, UserEntity, MessageEntity } from "@prisma/client";

export type RoomWithUserAndMessages = RoomEntity & {conversation: UserEntity, user: UserEntity, messageObject: MessageEntity[]}

export abstract class RoomAbstractRepository{
  abstract findOneRoom(userId:number, conversationId: number): Promise<RoomEntity>;
  abstract findRoomsByUserIdWithRelation(id:number, searchParam: 'userId' | 'conversationId'): Promise<RoomWithUserAndMessages[]>;
  abstract deleteRoom(roomId:number): Promise<void>;
  abstract createRoom(userId: number, conversationId: number): Promise<RoomEntity>;
  abstract findRoomByRoomId(roomId: number): Promise<RoomEntity>;
}