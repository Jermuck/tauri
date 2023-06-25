import { Injectable } from "@nestjs/common";
import { TokenEntity } from "@prisma/client";
import { TokenAbstractRepository } from "src/domain/repositories/token-repository/token-repository.adapter";
import { PrismaService } from "src/infrastructure/config/prisma.config";

@Injectable()
export class TokensRepository implements TokenAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };

  public async save(data: string): Promise<TokenEntity> {
    return await this.prisma.tokenEntity.create({
      data: { token: data }
    });
  };

  public async delete(id: number): Promise<boolean> {
    const isDelete = await this.prisma.tokenEntity.delete({
      where: { id }
    });
    return isDelete ? true : false;
  };

  public async getById(id: number): Promise<TokenEntity> {
    return await this.prisma.tokenEntity.findUnique({
      where: { id }
    });
  };

  public async getByUserId(userId: number): Promise<TokenEntity> {
    return await this.prisma.tokenEntity.findUnique({
      where: { userId }
    });
  };

  public async update(id: number, token: string): Promise<TokenEntity> {
    return await this.prisma.tokenEntity.update({
      where: { id }, data: { token }
    });
  };

  public async saveWithoutRelationUser(token: string, userId: number): Promise<TokenEntity> {
    return await this.prisma.tokenEntity.create({
      data: { token, userId }
    })
  }
}
