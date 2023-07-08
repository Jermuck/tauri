export abstract class TcpAbstractAdapter {
  abstract getUserIdFromToken(header: [string, string]): number | null;
};
