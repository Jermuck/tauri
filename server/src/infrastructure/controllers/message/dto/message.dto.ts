import { IsNumberString } from "class-validator";

export class MessageParam{
    @IsNumberString()
    public conversationId: number;
}