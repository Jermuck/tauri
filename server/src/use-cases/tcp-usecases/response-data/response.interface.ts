import { ApiProperty } from "@nestjs/swagger";

export class IMessageResponse{
    @ApiProperty()
    id:number;

    @ApiProperty()
    userId:number;

    @ApiProperty()
    time: Date;

    @ApiProperty()
    message:string;

    @ApiProperty()
    roomId: number;
}