import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer, SubscribeMessage, MessageBody
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthGatewayGuard } from "../common/guards/auth.gateway.guard";
import { BodyCanActivate } from "../controllers/auth/dto/user.register.dto";

@WebSocketGateway(8080, {
  cors: "*"
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  @UseGuards(AuthGatewayGuard)
  public handleMessage(client: Socket, @MessageBody() payload: {
    id: string,
    convId: string,
    msg: string
  }): void {
    this.server.sockets.sockets.forEach(element => {
      if (element.id === payload.convId) {
        element.send(payload.msg)
      }
    })
  };

  public handleConnection(client: Socket) {
    console.log(client.id);
  };
}
