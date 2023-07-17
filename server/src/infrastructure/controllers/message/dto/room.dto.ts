import { IsNumberString } from "class-validator";

export class RoomParamDto{
    @IsNumberString()
    readonly roomId: number;
}