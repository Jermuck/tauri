import { ApiProperty } from "@nestjs/swagger";
import { MessageEntity, UserEntity } from "@prisma/client";

export class IMessageResponse {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public userId: number;

    @ApiProperty()
    public time: Date;

    @ApiProperty()
    public message: string;

    @ApiProperty()
    public roomId: number;

    @ApiProperty()
    public conversationId:number;
};


export class UserOpenRoomResponse {
    @ApiProperty()
    public user: UserEntity;

    @ApiProperty()
    public lastMessage: MessageEntity;

    @ApiProperty()
    public conversation: UserEntity;
};

export class DeleteRoomResponse {
    public userRoomId: number;
    public conversationRoomId: number | null;
}
