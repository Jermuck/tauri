import { Injectable } from "@nestjs/common";
import { RoomEntity } from "@prisma/client";
import { RoomAbstractRepository } from "src/domain/repositories/room-repository/room-repository.abstract";
import { RoomWithUserAndMessages } from "src/domain/repositories/room-repository/room-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";

@Injectable()
export class RoomRepository implements RoomAbstractRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { };

    public async findOneRoom(userId: number, conversationId: number): Promise<RoomEntity> {
        const room = this.prisma.roomEntity.findFirst({
            where: {
                userId, conversationId
            }
        });
        return room;
    };
    public async findRoomsByUserIdWithRelation(id: number, searchParam: 'userId' | 'conversationId'): Promise<RoomWithUserAndMessages[]> {
        return await this.prisma.roomEntity.findMany({
            where: {
                [searchParam]: id
            }, include: { messageObject: true, conversation: true, user: true }
        });
    };

    public async deleteRoom(roomId: number): Promise<void> {
        await this.prisma.roomEntity.deleteMany({
            where: { id: roomId },
        });
    };

    public async createRoom(userId: number, conversationId: number): Promise<RoomEntity> {
        return await this.prisma.roomEntity.create({
            data: { userId, conversationId }
        })
    };

}