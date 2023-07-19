import { IsNumber } from "class-validator";

export class DeleteRoomDto{
    @IsNumber()
    public readonly roomId: number;

    @IsNumber()
    public readonly conversationId: number;
}