export abstract class JwtAbstractAdapter<T>{
  abstract create(data: T, expiresIn: number): string;
  abstract validateToken(token: string): T | null;
};
