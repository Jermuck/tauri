import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class BodyCanActivate {
  _id: number;
}

export class UserRegisterDto extends BodyCanActivate {
  @ApiProperty({ required: true, minLength: 5, maxLength: 15 })
  @Length(5, 15)
  public readonly username: string;

  @ApiProperty({ required: true, minLength: 7, maxLength: 20 })
  @Length(7, 20)
  public readonly password: string;

  @ApiProperty({ required: false })
  public readonly description: string;

  @ApiProperty({ required: true, format: "email" })
  @IsEmail()
  public readonly email: string;
}
