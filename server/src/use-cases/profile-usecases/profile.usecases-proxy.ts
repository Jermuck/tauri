import { DynamicModule, Module } from "@nestjs/common";
import { ProfileReposiory } from "src/infrastructure/repositories/profile-repository/profile.repository";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { BcryptModule } from "src/infrastructure/services/bcrypt/bcrypt.module";
import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { ProfileUseCase } from "./usecase-blocks/profile.usecase";

@Module({})
export class ProfileUseCaseModule {
  static PROFILE = "PROFILE";

  static register(): DynamicModule {
    return {
      imports: [RepositoryModule, BcryptModule.register(3)],
      providers: [
        {
          inject: [ProfileReposiory, UserRepository, BcryptService],
          useFactory: (
            profileRepo: ProfileReposiory,
            userRepo: UserRepository,
            bcrypt: BcryptService
          ) => new ProfileUseCase(profileRepo, userRepo, bcrypt),
          provide: this.PROFILE
        }
      ],
      exports: [this.PROFILE],
      module: ProfileUseCaseModule
    }
  }
}

