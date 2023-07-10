import { Inject, UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TcpUseCase } from "src/use-cases/tcp-usecases/usecase-blocks/tcp.usecase";
import { AuthGatewayGuard } from "../common/guards/auth.gateway.guard";
import { MessageDto } from "./dto/msg.dto";

@WebSocketGateway(8080, {
  cors: '*'
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    @Inject('TCP')
    private readonly tcpUseCaseInstance: TcpUseCase
  ) { };

  @WebSocketServer()
  private server: Server;

  private setError(msg: string, client: Socket) {
    client.send(msg);
    client.disconnect();
  };

  private findSocket(conversationId: number): Socket | null {
    let client: Socket | null = null;
    this.server.sockets.sockets.forEach(socket => {
      if (socket.data.id === conversationId && socket.connected) {
        client = socket;
      }
    });
    return client;
  }

  @SubscribeMessage('msgToServer')
  @UseGuards(AuthGatewayGuard)
  public async handleMessage(@MessageBody() payload: MessageDto) {
    const client = this.findSocket(payload.conversationId);
    if (client) {
      const message = await this.tcpUseCaseInstance.saveMessage(payload);
      client.send(message);
    }else{
      await this.tcpUseCaseInstance.saveMessage(payload);
    }
  };

  public handleConnection(client: Socket) {
    try{
      const header = client.request.headers.authorization;
      if(!header) throw new Error('Unaftorized');
      const userId = this.tcpUseCaseInstance.getUserId(header);
      if(!userId) throw new Error('Unaftorized');
      client.data['id'] = userId;
    }
    catch(err){
      this.setError(err, client);
    }
  };
}
