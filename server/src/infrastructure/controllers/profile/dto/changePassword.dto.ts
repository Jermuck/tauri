import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { BodyCanActivate } from "../../auth/dto/user.register.dto";

export class ChangePasswordDto extends BodyCanActivate {
  @Length(7, 20)
  @ApiProperty({ required: true, minLength: 7, maxLength: 20 })
  public readonly password: string;

  @Length(7, 20)
  @ApiProperty({ required: true, minLength: 7, maxLength: 20 })
  public readonly newPassword: string;
}
