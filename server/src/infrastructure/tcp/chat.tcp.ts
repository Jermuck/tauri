import { UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthGatewayGuard } from "../common/guards/auth.gateway.guard";
import { BodyCanActivate } from "../controllers/auth/dto/user.register.dto";

@WebSocketGateway(8080, {
  cors: 'http://localhost:1420'
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  @UseGuards(AuthGatewayGuard)
  public handleMessage(@MessageBody() payload: {
    id: string,
    conversationId: string,
    message: string
  }, @ConnectedSocket() client: Socket) {
    this.server.sockets.sockets.forEach(el => {
      console.log(el.data)
    })
  };

  public handleConnection(client: Socket) {
    const header = client.request.headers.authorization;

  };
}
