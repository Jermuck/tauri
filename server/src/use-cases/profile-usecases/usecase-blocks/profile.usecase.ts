import { ProfileAbstractRepository } from "src/domain/repositories/profile-repository/profile-repository.abstract";
import { ProfileDto } from "src/infrastructure/controllers/profile/dto/profile.dto";

export class ProfileUseCase {
  constructor(
    private readonly profileRepo: ProfileAbstractRepository
  ) { };

  public async update(data: ProfileDto): Promise<any> {
    const isExistProfile = await this.profileRepo.getByUserId(data._id);
    if (!isExistProfile) {
      const newProfile = await this.profileRepo.create({ ...data, userId: data._id });
      return newProfile;
    }
    const updateProfile = await this.profileRepo.update({ ...data, userId: data._id });
    return updateProfile;
  }
}
