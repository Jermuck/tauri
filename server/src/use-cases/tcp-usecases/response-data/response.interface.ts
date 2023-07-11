import { ApiProperty } from "@nestjs/swagger";
import { MessageEntity, UserEntity } from "@prisma/client";
import { ResultAuthorization } from "src/use-cases/auth-usecases/response-data/response.interfaces";

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
};


export class UserOpenRoomResponse {
    @ApiProperty()
    public user: UserEntity;

    @ApiProperty()
    public lastMessage: MessageEntity;
}
