import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer, SubscribeMessage, MessageBody
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { BodyCanActivate } from "../controllers/auth/dto/user.register.dto";

@WebSocketGateway(8080)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: {
    id: number,
    roomId: number,
    msg: string
  }): void {
    this.server.to(payload.roomId.toString()).emit(payload.msg);
  };


  public handleConnection(client: Socket) {
    client.join(client.id)
  };
}
