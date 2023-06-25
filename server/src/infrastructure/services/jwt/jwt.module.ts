import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAdapter } from "./jwt.service";

@Module({
    providers:[
        JwtAdapter
    ],
    imports: [JwtModule.register({})],
    exports: [
        JwtAdapter
    ]
})
export class JwtAdapterModule { };