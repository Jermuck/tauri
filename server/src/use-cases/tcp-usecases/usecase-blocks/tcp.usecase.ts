import { WsException } from "@nestjs/websockets";
import { MessageEntity } from "@prisma/client";
import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { MessageAbstractRepository } from "src/domain/repositories/message-repository/message-repository.abstract";
import { UserAbstractReposiotory } from "src/domain/repositories/user-repository/user-repository.abstract";

export class TcpUseCase {
  constructor(
    private readonly tcpService: TcpAbstractAdapter,
    private readonly userRepo: UserAbstractReposiotory,
    private readonly messageRepo: MessageAbstractRepository
  ) { };

  public getUserId(header: string): number | null {
    const arrayOfHeader = header.split(' ');
    if (arrayOfHeader.length !== 2) return null;
    //@ts-ignore
    const userId = this.tcpService.getUserIdFromToken(arrayOfHeader);
    if (!userId) return null;
    return userId;
  }

  public async saveMessage(messageModel: MessageModel): Promise<MessageEntity> {
    const isExistUser = await this.userRepo.getById(messageModel.conversationId);
    if (!isExistUser) throw new WsException('Not found conversation');
    const newMessage = await this.messageRepo.create(messageModel);
    return newMessage;
  }


  public async getMessages(userId:number, conversationId: number){
    const messageByUser = await this.messageRepo.getAll(userId, conversationId);
    const messageByConversation = await this.messageRepo.getAll(conversationId, userId);
    const combineArrayOfMessages = messageByUser.concat(messageByConversation);
    combineArrayOfMessages.sort(el => el.id);
    return combineArrayOfMessages;
  };
  
}
