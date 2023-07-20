import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException} from '@nestjs/websockets';
import { Socket } from "socket.io";
import { WsResponse } from 'types/index.types';

@Catch(WsException, HttpException)
export class WebsocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost): void {
    const client = host.switchToWs().getClient() as Socket;
    client.to(client.id).emit('error',new WsResponse('error', {}, exception.message));
  }
}
