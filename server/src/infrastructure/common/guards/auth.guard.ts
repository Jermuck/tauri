import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtAdapter } from "src/infrastructure/services/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly JwtService:JwtAdapter
    ){};

    public canActivate(context: ExecutionContext): boolean {
        const request:Request = context.switchToHttp().getRequest();
        let header = request.headers.authorization;
        if (!header){
            throw new UnauthorizedException("You are don't have token");
        }
        const [bearer, token]= header.split(" ");
        const user = this.JwtService.validateToken(token);
        if(!user || bearer !== "Bearer"){
            throw new UnauthorizedException();
        }
        request.body = {
            ...request.body,
            _id: user.id
        };
        return true;
    }
}