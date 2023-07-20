import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";
import { MessageUseCaseModule } from "src/use-cases/message-usecases/message.usecase-proxy";

@Module({
    controllers:[MessageController],
    imports:[
        MessageUseCaseModule.register(),
        JwtAdapterModule
    ]
})
export class MessageModule{ };