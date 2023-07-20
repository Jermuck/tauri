import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { RoomAbstractRepository } from "src/domain/repositories/room-repository/room-repository.abstract";
import { MessageEntity } from "@prisma/client";
import { BadRequestException } from "@nestjs/common";
import { RoomWithUserAndMessages } from "src/domain/repositories/room-repository/room-repository.abstract";
import { UserOpenRoomResponse } from "../response-data/response.interface";

export class MessageUseCase {
    constructor(
        private readonly roomRepo: RoomAbstractRepository,
        private readonly messageRepo: MessageAbstractRepository
    ) { }

    private compare(firstMessage: MessageEntity, secondMessage: MessageEntity): number {
        if (firstMessage.id > secondMessage.id) return 1;
        if (firstMessage.id < secondMessage.id) return -1;
        return 0;
    };

    private async convertToUserOpenMessageChatList(array: RoomWithUserAndMessages[]): Promise<UserOpenRoomResponse[]> {
        const sortedArray: Array<UserOpenRoomResponse> = [];
        for (const element of array) {
            const messages = await this.getMessages(element.userId, element.conversationId);
            sortedArray.push({
                user: element.user,
                conversation: element.conversation,
                lastMessage: messages.at(-1)
            });
        };
        return sortedArray;
    };

    public async getMessages(userId: number, conversationId: number): Promise<MessageEntity[]> {
        const isExistDialogByNotConversation = await this.roomRepo.findOneRoom(userId, conversationId);
        const isExistDialogByConversation = await this.roomRepo.findOneRoom(conversationId, userId);
        if (!isExistDialogByConversation && !isExistDialogByNotConversation) throw new BadRequestException('Not found room');
        const messageByUser = await this.messageRepo.getAll(userId, conversationId);
        const messageByConversation = await this.messageRepo.getAll(conversationId, userId);
        const combineArrayOfMessages = messageByUser.concat(messageByConversation);
        combineArrayOfMessages.sort(this.compare);
        return combineArrayOfMessages;
    };

    public async getRoomsWithLastMessage(userId: number): Promise<UserOpenRoomResponse[]> {
        const arrayRoomsWhereUserId = await this.roomRepo.findRoomsByUserIdWithRelation(userId, 'userId');
        const arrayRoomsWhereConversatioId = await this.roomRepo.findRoomsByUserIdWithRelation(userId, 'conversationId');
        return this.convertToUserOpenMessageChatList(arrayRoomsWhereUserId.concat(arrayRoomsWhereConversatioId));
    };

}
