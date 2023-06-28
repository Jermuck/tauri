import { UserRepository } from "./users-repository/users.reposiory";
import { TokenRepository } from "./tokens-repository/tokens.repository";
import { Module } from "@nestjs/common"
import { PrismaService } from "../config/prisma.config";
import { ProfileReposiory } from "./profile-repository/profile.repository";

@Module({
  providers: [
    UserRepository,
    TokenRepository,
    PrismaService,
    ProfileReposiory
  ],
  exports: [
    UserRepository,
    TokenRepository,
    ProfileReposiory
  ]
})
export class RepositoryModule { };
