import { Injectable } from "@nestjs/common";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";
import { Prisma, UserEntity } from "@prisma/client";

@Injectable()
export class UserRepository implements UserAbstractReposiotory {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  public async save(data: Prisma.UserEntityCreateInput): Promise<UserEntity> {
    return await this.prisma.userEntity.create({
      data: data
    })
  };

  public async getByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.userEntity.findUnique({
      where: { email }
    })
  };

  public async getById(id: number): Promise<UserEntity> {
    return await this.prisma.userEntity.findUnique({
      where: { id }
    })
  };

  public async delete(id: number): Promise<boolean> {
    const isDelete = await this.prisma.userEntity.delete({
      where: { id }
    });
    return isDelete ? true : false;
  }
}
