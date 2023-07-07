import { Module } from "@nestjs/common";
import { JwtAdapterModule } from "../jwt/jwt.module";
import { JwtAdapter } from "../jwt/jwt.service";
import { TcpService } from "./tsc.service";

@Module({
  providers: [TcpService,
    {
      provide: 'JWT-SERVICE',
      useValue: JwtAdapter
    }
  ],
  exports: [TcpService],
  imports: [JwtAdapterModule]
})
export class TcpAdapterModule { }
