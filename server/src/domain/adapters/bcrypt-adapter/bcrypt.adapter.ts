export abstract class BcryptAbstractAdapter{
    abstract hash(password: string): Promise<string>;
    abstract unHash(password: string, hashPassword: string): Promise<boolean>;
};