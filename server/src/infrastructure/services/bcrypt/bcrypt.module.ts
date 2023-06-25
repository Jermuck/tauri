import { DynamicModule, Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";

@Module({})
export class BcryptModule {
    static register(saltForBcryptService:number): DynamicModule {
        return {
            module: BcryptModule,
            providers: [
                {
                    provide: "SALT",
                    useValue: saltForBcryptService
                },
                BcryptService
            ],
            exports: [
                BcryptService
            ]
        };
    };
} 