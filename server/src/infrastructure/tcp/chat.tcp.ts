import { Inject, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
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
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { WebsocketExceptionFilter } from "../common/filters/WsExceptionFilter";
import { WsResponse } from "types/index.types";

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

  private setError(msg: string, client: Socket): void {
    client.send(new WsResponse('error', {}, msg));
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
  };

  @SubscribeMessage('msgToServer')
  @UseGuards(AuthGatewayGuard)
  @UseFilters(WebsocketExceptionFilter)
  @UsePipes(new ValidationPipe())
  public async handleMessage(@MessageBody() dto: MessageDto, @ConnectedSocket() socket: Socket) {
    const client = this.findSocket(dto.conversationId);
    const payload: MessageModel = { ...dto, userId: socket.data.id };
    const message = await this.tcpUseCaseInstance.saveMessage(payload);
    const wsResponse = new WsResponse('message', message, "success");
    if (client) client.send(wsResponse);
    socket.send(wsResponse)
  };

  public handleConnection(client: Socket) {
    const header = client.request.headers.authorization;
    if (!header) this.setError("Unaftorized", client);
    const userId = this.tcpUseCaseInstance.getUserId(header);
    if (!userId) this.setError('Unaftorized', client);
    client.data['id'] = userId;
  };
}
