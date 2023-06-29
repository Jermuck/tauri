import { ApiProperty } from "@nestjs/swagger";
import { Length, IsOptional } from "class-validator";
import { BodyCanActivate } from "../../auth/dto/user.register.dto";

export class ProfileDto extends BodyCanActivate {
  @Length(6, 28)
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly name?: string;

  @Length(6, 28)
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly lastname?: string;

  @Length(8, 14)
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly phone?: string;
}
