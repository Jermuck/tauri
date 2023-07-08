import { Inject, UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
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

  private setError(msg: string, socket: Socket) {
    socket.send(msg);
    socket.disconnect();
  }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  @UseGuards(AuthGatewayGuard)
  public handleMessage(@MessageBody() payload: MessageDto, @ConnectedSocket() client: Socket) {
    this.server.sockets.sockets.forEach(el => {
      if (el.data.id === payload.conversationId && el.connected) {
        el.send(payload)
      }
    })
  };

  public handleConnection(client: Socket) {
    const header = client.request.headers.authorization;
    if (!header) this.setError('Unaftorized', client);
    const userId = this.tcpUseCaseInstance.getUserId(header);
    if (!userId) this.setError('Unaftorized', client);
    client.data['id'] = userId;
  };
}
