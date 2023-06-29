import { Module } from "@nestjs/common";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";
import { ProfileController } from "./profile.controller";
import { ProfileUseCaseModule } from "src/use-cases/profile-usecases/profile.usecases-proxy";

@Module({
  imports: [ProfileUseCaseModule.register(), JwtAdapterModule],
  controllers: [ProfileController]
})
export class ProfileModule { }
