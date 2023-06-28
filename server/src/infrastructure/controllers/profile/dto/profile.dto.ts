import { Length } from "class-validator";
import { ProfileModel } from "src/domain/models/ProfileModel/profile.model";
import { BodyCanActivate } from "../../auth/dto/user.register.dto";

export class ProfileDto extends BodyCanActivate
  implements Omit<ProfileModel, "userId">{
  @Length(4, 28)
  public readonly name: string;

  @Length(4, 28)
  public readonly lastname: string;

  @Length(9, 9)
  public readonly phone: string;
}
