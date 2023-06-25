import { AbstractRepository } from "../global-repository/repository.abstract";
import { Prisma, UserEntity } from "@prisma/client";

export abstract class UserAbstractReposiotory extends AbstractRepository<Prisma.UserEntityCreateInput, UserEntity>{
  abstract getByEmail(email: string): Promise<UserEntity | null>;
};
