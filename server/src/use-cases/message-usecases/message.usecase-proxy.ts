import { DynamicModule, Module } from "@nestjs/common";
import { MessageRepository } from "src/infrastructure/repositories/message-repository/message.repository";
import { RoomRepository } from "src/infrastructure/repositories/room-repository/room.repository";
import { MessageUseCase } from "./usecase-blocks/message.usecase";
import { RepositoryModule } from "src/infrastructure/repositories/repository.module";

@Module({})
export class MessageUseCaseModule {
    static MESSAGE_USECASE = 'MESSAGE_USECASE';

    static register(): DynamicModule {
        return {
            module: MessageUseCaseModule,
            exports:[this.MESSAGE_USECASE],
            providers:[
                {
                    inject: [RoomRepository, MessageRepository],
                    useFactory: (
                        roomRepo: RoomRepository,
                        messageRepo: MessageRepository
                    ) => new MessageUseCase(roomRepo, messageRepo),
                    provide: this.MESSAGE_USECASE
                }
            ],
            imports: [RepositoryModule]
        }
    }
}