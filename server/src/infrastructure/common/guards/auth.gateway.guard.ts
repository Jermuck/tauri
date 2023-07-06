import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { Socket } from "socket.io";
import { JwtAdapter } from "../../services/jwt/jwt.service";

@Injectable()
export class AuthGatewayGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtAdapter
  ) { };

  private errorWithDisconect(msg: string, status: number, socket: Socket): void {
    socket.send(msg);
    socket.disconnect();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ws: Socket = context.switchToWs().getClient();
    const header = ws.handshake.headers.authorization;
    if (!header) {
      this.errorWithDisconect("Unaftorized", 401, ws);
      return;
    };
    const [bearer, access] = header.split(" ");
    const user = this.JwtService.validateToken(access);
    if (!user || bearer !== "Bearer") {
      this.errorWithDisconect("Unaftorized", 401, ws);
      return;
    };
    ws.data = {
      ...ws.data,
      _id: user.id
    }
    return true
  }
}
