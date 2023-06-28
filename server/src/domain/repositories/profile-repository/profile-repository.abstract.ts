import { ProfileEntity } from "@prisma/client";
import { ProfileModel } from "src/domain/models/ProfileModel/profile.model";

export abstract class ProfileAbstractRepository {
  abstract getByUserId(userId: number): Promise<ProfileEntity>;
  abstract create(profile: ProfileModel): Promise<ProfileEntity>;
  abstract update(newProfile: ProfileModel): Promise<ProfileEntity>;
}
