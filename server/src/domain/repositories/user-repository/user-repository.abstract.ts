import { AbstractRepository } from "../global-repository/repository.abstract";
import { Prisma, UserEntity } from "@prisma/client";

export abstract class UserAbstractReposiotory extends AbstractRepository<Prisma.UserEntityCreateInput, UserEntity>{
  abstract getByEmail(email: string): Promise<UserEntity | null>;
  abstract getByUsername(username: string): Promise<UserEntity | null>;
  abstract updatePassword(userId: number, password: string): Promise<UserEntity>;
  abstract findAll(): Promise<UserEntity[]>;
};
