import { AbstractRepository } from "../global-repository/repository.abstract";
import { TokenEntity } from "@prisma/client";

export abstract class TokenAbstractRepository extends AbstractRepository<string, TokenEntity> {
  abstract update(id: number, token: string): Promise<TokenEntity>;
  abstract getByUserId(userId: number): Promise<TokenEntity>;
  abstract saveWithoutRelationUser(token: string, userId: number): Promise<TokenEntity>;
};
