import { DynamicModule } from "@nestjs/common";
import { MessageRepository } from "src/infrastructure/repositories/message-repository/message.repository";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { TcpAdapterModule } from "src/infrastructure/services/tsp-service/tcp.module";
import { TcpService } from "src/infrastructure/services/tsp-service/tcp.service";
import { TcpUseCase } from "./usecase-blocks/tcp.usecase";
import { RoomRepository } from "src/infrastructure/repositories/room-repository/room.repository";

export class TcpUseCaseModule {
  static TCP = 'TCP';
  static register(): DynamicModule {
    return {
      exports: [this.TCP],
      module: TcpUseCaseModule,
      providers: [
        {
          inject: [TcpService, UserRepository, MessageRepository, RoomRepository],
          useFactory: (
            tcpService: TcpService,
            userRepo: UserRepository,
            messageRepo: MessageRepository,
            roomRepo: RoomRepository
          ) => new TcpUseCase(tcpService, userRepo, messageRepo, roomRepo),
          provide: this.TCP
        }
      ],
      imports: [TcpAdapterModule, RepositoryModule]
    }
  }
}
