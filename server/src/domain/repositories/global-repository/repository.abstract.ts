export abstract class AbstractRepository<T, U>{
  abstract save(data: T): Promise<U>;
  abstract delete(id: number): Promise<boolean | null>;
  abstract getById(id: number): Promise<U | null>;
};
