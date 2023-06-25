import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { BodyCanActivate } from "./user.register.dto";

export class UserLoginDto {
  @ApiProperty({ required: true, format: "email" })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ required: true, minLength: 7, maxLength: 20 })
  @Length(7, 20)
  public readonly password: string;
}
