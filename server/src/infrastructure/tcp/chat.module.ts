import { Module } from "@nestjs/common";
import { TcpUseCaseModule } from "src/use-cases/tcp-usecases/tcp.usecases-proxy";
import { JwtAdapterModule } from "../services/jwt/jwt.module";
import { ChatGateway } from "./chat.tcp";

@Module({
  providers: [ChatGateway],
  imports: [JwtAdapterModule, TcpUseCaseModule.register()]
})
export class ChatModule { };
