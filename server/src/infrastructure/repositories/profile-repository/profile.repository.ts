import { Injectable } from "@nestjs/common";
import { ProfileEntity } from "@prisma/client";
import { ProfileModel } from "src/domain/models/ProfileModel/profile.model";
import { ProfileAbstractRepository } from "src/domain/repositories/profile-repository/profile-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";

@Injectable()
export class ProfileReposiory implements ProfileAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  public async create(profile: ProfileModel): Promise<ProfileEntity> {
    return await this.prisma.profileEntity.create({
      data: profile
    })
  };

  public async getByUserId(userId: number): Promise<ProfileEntity> {
    return await this.prisma.profileEntity.findUnique({
      where: { userId }
    })
  };

  public async update(newProfile: ProfileModel): Promise<ProfileEntity> {
    return await this.prisma.profileEntity.update({
      where: {
        userId: newProfile.userId
      },
      data: newProfile
    })
  }
}
