import { IsDate, IsNumber, IsString } from "class-validator";

export class MessageDto {
  @IsNumber()
  public readonly conversationId: number;
  @IsString()
  public readonly message: string;
};
