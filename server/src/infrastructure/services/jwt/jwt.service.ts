import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { JwtAbstractAdapter } from "src/domain/adapters/jwt-adapter/jwt.adapter";

@Injectable()
export class JwtAdapter implements JwtAbstractAdapter<UserEntity> {

  private readonly secret_key: string;

  constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {
    this.secret_key = this.config.get<string>("SECRET_KEY");
  };

  public create(data: UserEntity, expiresIn: number): string {
    const token = this.jwt.sign(data, {
      expiresIn,
      secret: this.secret_key
    });
    return token;
  };

  public validateToken(token: string): UserEntity | null {
    try {
      const validate = this.jwt.verify<UserEntity>(token, {
        secret: this.secret_key
      });
      return validate;
    } catch (err) {
      return null;
    }
  };
}
