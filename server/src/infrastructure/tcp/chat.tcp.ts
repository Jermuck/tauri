import { Inject, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatUseCase } from "src/use-cases/tcp-usecases/usecase-blocks/chat.usecase";
import { AuthGatewayGuard } from "../common/guards/auth.gateway.guard";
import { MessageDto } from "./dto/msg.dto";
import { MessageModel } from "src/domain/models/MessageModel/message.model";
import { WebsocketExceptionFilter } from "../common/filters/WsExceptionFilter";
import { WsResponse } from "types/index.types";
import { DeleteRoomDto } from "./dto/room.dto";

@WebSocketGateway(8080, {
  cors: 'localhost:1420'
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject('CHAT_TCP')
    private readonly tcpUseCaseInstance: ChatUseCase
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
  @UseFilters(new WebsocketExceptionFilter())
  @UsePipes(new ValidationPipe())
  public async handleMessage(@MessageBody() dto: MessageDto, @ConnectedSocket() socket: Socket) {
    const client = this.findSocket(dto.conversationId);
    const payload: MessageModel = { ...dto, userId: socket.data.id };
    const message = await this.tcpUseCaseInstance.saveMessage(payload);
    const wsResponse = new WsResponse('message', message, "success");
    if (client) { client.send(wsResponse) };
    socket.send(wsResponse)
  };

  @SubscribeMessage('deleteRoom')
  @UseGuards(AuthGatewayGuard)
  @UseFilters(new WebsocketExceptionFilter())
  @UsePipes(new ValidationPipe())
  public async deleteRoom(@MessageBody() dto: DeleteRoomDto, @ConnectedSocket() socket: Socket) {
    const client = this.findSocket(dto.conversationId);
    const rooms = await this.tcpUseCaseInstance.deleteRoom(dto.roomId, socket.data.id);
    const wsReponse = new WsResponse('room', rooms, 'success');
    if (client) socket.to(client.id).emit('room', wsReponse);
  }

  public handleConnection(client: Socket) {
    const header = client.request.headers.authorization;
    if (!header) this.setError("Unaftorized", client);
    const userId = this.tcpUseCaseInstance.getUserId(header);
    if (!userId) this.setError('Unaftorized', client);
    client.data['id'] = userId;
  };

  public handleDisconnect(client: Socket) {
    client.data['id'] = null;
  }
}
