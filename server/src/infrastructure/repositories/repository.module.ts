import { UserRepository } from "./users-repository/users.reposiory";
import { TokensRepository } from "./tokens-repository/tokens.repository";
import { Module } from "@nestjs/common"
import { PrismaService } from "../config/prisma.config";

@Module({
  providers: [
    UserRepository,
    TokensRepository,
    PrismaService,
  ],
  exports: [
    UserRepository,
    TokensRepository,
  ]
})
export class RepositoryModule { };
