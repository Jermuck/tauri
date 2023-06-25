import { DynamicModule, Module } from "@nestjs/common";
import { TokensRepository } from "src/infrastructure/repositories/tokens-repository/tokens.repository";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { AuthUseCase } from "./usecase-blocks/auth.usecase";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";
import { BcryptService } from "src/infrastructure/services/bcrypt/bcrypt.service";
import { ConfigService } from "@nestjs/config";
import { BcryptModule } from "src/infrastructure/services/bcrypt/bcrypt.module";

@Module({})
export class AuthUseCaseModule {
  static AUTHORIZATION = "AUTHORIZATION";

  static register(): DynamicModule {
    return {
      module: AuthUseCase,
      providers: [
        {
          inject: [UserRepository, TokensRepository, BcryptService, JwtAdapter, ConfigService],
          useFactory: (
            userRepo: UserRepository,
            tokenRepo: TokensRepository,
            bcrypt: BcryptService,
            jwt: JwtAdapter,
            config: ConfigService
          ) => new AuthUseCase(userRepo, tokenRepo, bcrypt, jwt, config),
          provide: this.AUTHORIZATION
        }
      ],
      exports: [
        this.AUTHORIZATION
      ],
      imports: [RepositoryModule, JwtAdapterModule, BcryptModule.register(3)]
    }
  }
}
