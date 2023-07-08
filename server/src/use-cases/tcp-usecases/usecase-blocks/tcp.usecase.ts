import { TcpAbstractAdapter } from "src/domain/adapters/tcp-adapter/tcp.adapter";

export class TcpUseCase {
  constructor(
    private readonly tcpService: TcpAbstractAdapter
  ) { };

  public getUserId(header: string): number | null {
    const arrayOfHeader = header.split(' ');
    if (arrayOfHeader.length !== 2) return null;
    //@ts-ignore
    const userId = this.tcpService.getUserIdFromToken(arrayOfHeader);
    if (!userId) return null;
    return userId;
  }
}
