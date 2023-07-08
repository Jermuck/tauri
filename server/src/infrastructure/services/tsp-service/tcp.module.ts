import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtAdapterModule } from "../jwt/jwt.module";
import { JwtAdapter } from "../jwt/jwt.service";
import { TcpService } from "./tcp.service";

@Module({
  providers: [TcpService,
    {
      provide: 'JWT-SERVICE',
      useFactory: (jwt: JwtService, cfg: ConfigService) => new JwtAdapter(jwt, cfg),
      inject: [JwtService, ConfigService]
    }
  ],
  exports: [TcpService],
  imports: [JwtAdapterModule, JwtModule.register({})]
})
export class TcpAdapterModule { }
