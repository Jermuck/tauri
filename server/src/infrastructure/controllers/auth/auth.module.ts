import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthUseCaseModule } from "src/use-cases/auth-usecases/auth.usecases-proxy";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";

@Module({
    controllers:[AuthController],
    imports:[
        AuthUseCaseModule.register(),
        JwtAdapterModule
    ]
})
export class AuthModule {};