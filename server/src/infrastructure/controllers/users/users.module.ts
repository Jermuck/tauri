import { Module } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/config/prisma.config";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: "Repository",
      useFactory: () => new UserRepository(new PrismaService())
    },
  ],
  imports: [JwtAdapterModule]
})
export class UsersModule { }
