import { DynamicModule } from "@nestjs/common";
import { MessageRepository } from "src/infrastructure/repositories/message-repository/message.repository";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";
import { UserRepository } from "src/infrastructure/repositories/users-repository/users.reposiory";
import { TcpAdapterModule } from "src/infrastructure/services/tsp-service/tcp.module";
import { TcpService } from "src/infrastructure/services/tsp-service/tcp.service";
import { ChatUseCase } from "./usecase-blocks/chat.usecase";
import { RoomRepository } from "src/infrastructure/repositories/room-repository/room.repository";

export class TcpUseCaseModule {
  static TCP = 'CHAT_TCP';
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
          ) => new ChatUseCase(tcpService, userRepo, messageRepo, roomRepo),
          provide: this.TCP
        }
      ],
      imports: [TcpAdapterModule, RepositoryModule]
    }
  }
}
