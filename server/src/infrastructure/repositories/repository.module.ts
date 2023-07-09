import { UserRepository } from "./users-repository/users.reposiory";
import { TokenRepository } from "./tokens-repository/tokens.repository";
import { Module } from "@nestjs/common"
import { PrismaService } from "../config/prisma.config";
import { ProfileReposiory } from "./profile-repository/profile.repository";
import { MessageRepository } from "./message-repository/message.repository";

@Module({
  providers: [
    UserRepository,
    TokenRepository,
    PrismaService,
    ProfileReposiory,
    MessageRepository
  ],
  exports: [
    UserRepository,
    TokenRepository,
    ProfileReposiory,
    MessageRepository
  ]
})
export class RepositoryModule { };
