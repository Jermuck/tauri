import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { TcpUseCaseModule } from "src/use-cases/tcp-usecases/tcp.usecases-proxy";
import { JwtAdapterModule } from "src/infrastructure/services/jwt/jwt.module";

@Module({
    controllers:[MessageController],
    imports:[
        TcpUseCaseModule.register(),
        JwtAdapterModule
    ]
})
export class MessageModule{ };