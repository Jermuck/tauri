import { Module } from "@nestjs/common";
import { JwtAdapterModule } from "../services/jwt/jwt.module";
import { ChatGateway } from "./chat.tcp";

@Module({
  providers: [ChatGateway],
  imports: [JwtAdapterModule]
})
export class ChatModule { };
