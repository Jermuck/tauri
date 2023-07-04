import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer, SubscribeMessage, MessageBody
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthGuard } from "../common/guards/auth.guard";
import { BodyCanActivate } from "../controllers/auth/dto/user.register.dto";

@WebSocketGateway(8080)
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToClient', {});
  };


  public handleConnection(client: Socket) {
    console.log(`Client connect ${client.id}`);
  };
}
