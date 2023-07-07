import { Module } from "@nestjs/common";
import { JwtAdapterModule } from "../services/jwt/jwt.module";
import { TcpAdapterModule } from "../services/tsp-service/tsc.module";
import { ChatGateway } from "./chat.tcp";

@Module({
  providers: [ChatGateway],
  imports: [JwtAdapterModule, TcpAdapterModule]
})
export class ChatModule { };
