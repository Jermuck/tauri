import { Body, Controller, Get, HttpCode, Inject, Param, UseGuards } from "@nestjs/common";
import { TcpUseCase } from "src/use-cases/tcp-usecases/usecase-blocks/tcp.usecase";
import { BodyCanActivate } from "../auth/dto/user.register.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IMessageResponse } from "src/use-cases/tcp-usecases/response-data/response.interface";

@Controller('/messages')
@ApiTags('Message')
export class MessageController{
    constructor(
        @Inject('TCP')
        private readonly tcp: TcpUseCase
    ){};

    @Get(":conversationId")
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        type: [IMessageResponse]
    })
    @ApiOperation({ description: "Get messages by user"})
    public async getAll(
        @Param() param: {conversationId: number}, 
        @Body() dto: BodyCanActivate
    ){
        return await this.tcp.getMessages(dto._id, +param.conversationId);
    };
};