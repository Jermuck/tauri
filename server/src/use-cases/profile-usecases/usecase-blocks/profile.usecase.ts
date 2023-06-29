import { BadRequestException } from "@nestjs/common";
import { ProfileEntity, UserEntity } from "@prisma/client";
import { BcryptAbstractAdapter } from "src/domain/adapters/bcrypt-adapter/bcrypt.adapter";
import { ProfileModel } from "src/domain/models/ProfileModel/profile.model";
import { ProfileAbstractRepository } from "src/domain/repositories/profile-repository/profile-repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { ChangePasswordDto } from "src/infrastructure/controllers/profile/dto/changePassword.dto";
import { ProfileDto } from "src/infrastructure/controllers/profile/dto/profile.dto";
import { ResultProfile } from "../response-data/response.interfaces";

export class ProfileUseCase {
  constructor(
    private readonly profileRepo: ProfileAbstractRepository,
    private readonly userRepo: UserAbstractReposiotory,
    private readonly bcrypt: BcryptAbstractAdapter
  ) { };

  private convertToProfileModel(data: ProfileDto): ProfileModel {
    return {
      userId: data._id,
      lastname: data.lastname,
      name: data.name,
      phone: data.phone
    };
  };

  public async update(data: ProfileDto): Promise<ProfileEntity> {
    const isExistProfile = await this.profileRepo.getByUserId(data._id);
    const profileModel = this.convertToProfileModel(data);
    if (!isExistProfile) {
      const newProfile = await this.profileRepo.create(profileModel);
      return newProfile;
    }
    const updateProfile = await this.profileRepo.update(profileModel);
    return updateProfile;
  };

  public async changePassword(data: ChangePasswordDto): Promise<ResultProfile.ResponseChangePassword> {
    const user = await this.userRepo.getById(data._id);
    const verifyPassword = await this.bcrypt.unHash(data.password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException("Not valid password");
    }
    const hashPassword = await this.bcrypt.hash(data.newPassword);
    const updateUser = await this.userRepo.updatePassword(data._id, hashPassword);
    return { password: data.newPassword };
  };
}
