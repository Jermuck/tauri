import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const now = Date.now();
    return next.
      handle().
      pipe(map(data => ({
        data: data,
        ip: req.ip,
        timeResponse: `${Date.now() - now}ms`,
        method: req.method,
      })));
  };
};