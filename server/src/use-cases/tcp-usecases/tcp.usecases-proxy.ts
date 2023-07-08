import { DynamicModule } from "@nestjs/common";
import { TcpAdapterModule } from "src/infrastructure/services/tsp-service/tcp.module";
import { TcpService } from "src/infrastructure/services/tsp-service/tcp.service";
import { TcpUseCase } from "./usecase-blocks/tcp.usecase";

export class TcpUseCaseModule {
  static TCP = 'TCP';
  static register(): DynamicModule {
    return {
      exports: [this.TCP],
      module: TcpUseCaseModule,
      providers: [
        {
          inject: [TcpService],
          useFactory: (tcpService: TcpService) => new TcpUseCase(tcpService),
          provide: this.TCP
        }
      ],
      imports: [TcpAdapterModule]
    }
  }
}
