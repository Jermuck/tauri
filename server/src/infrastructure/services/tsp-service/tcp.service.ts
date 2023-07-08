import { Inject } from "@nestjs/common";
import { UserEntity } from "@prisma/client";
import { JwtAbstractAdapter } from "src/domain/adapters/jwt-adapter/jwt.adapter";
import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";

export class TcpService implements TcpAbstractAdapter {
  constructor(
    @Inject('JWT-SERVICE')
    private readonly jwt: JwtAbstractAdapter<UserEntity>
  ) { };

  public getUserIdFromToken(header: [string, string]): number | null {
    const [bearer, access] = header;
    if (bearer !== "Bearer") return null;
    const user = this.jwt.validateToken(access);
    if (!user) return null;
    return user.id;
  }

}
