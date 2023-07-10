import { Body, Controller, Get, HttpCode, Inject, Param, UseGuards } from "@nestjs/common";
import { TcpUseCase } from "src/use-cases/tcp-usecases/usecase-blocks/tcp.usecase";
import { BodyCanActivate } from "../auth/dto/user.register.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";

@Controller('/messages')
export class MessageController{
    constructor(
        @Inject('TCP')
        private readonly tcp: TcpUseCase
    ){};

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    public async getAll(
        @Param('conversationId') conversationId: number, 
        @Body() dto: BodyCanActivate
    ){
        return await this.tcp.getMessages(dto._id, conversationId);
    };
};