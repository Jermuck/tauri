import { Body, Controller, Get, HttpCode, Inject, Param, UseGuards } from "@nestjs/common";
import { TcpUseCase } from "src/use-cases/tcp-usecases/usecase-blocks/tcp.usecase";
import { BodyCanActivate } from "../auth/dto/user.register.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IMessageResponse, UserOpenRoomResponse } from "src/use-cases/tcp-usecases/response-data/response.interface";
import { MessageParam } from "./dto/message.dto";

@Controller('/messages')
@ApiTags('Message')
export class MessageController{
    constructor(
        @Inject('TCP')
        private readonly tcpInstance: TcpUseCase
    ){};

    @Get('/all/:conversationId')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        type: [IMessageResponse]
    })
    @ApiOperation({ description: 'Get messages by user'})
    public async getMessages(
        @Param() param: MessageParam, 
        @Body() dto: BodyCanActivate
    ){
        return await this.tcpInstance.getMessages(dto._id, +param.conversationId);
    };
    @Get('/rooms')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        type: [UserOpenRoomResponse]
    })
    @ApiOperation({description: 'Get open messages transaction'})
    public async getRooms(@Body() dto: BodyCanActivate){
        return this.tcpInstance.getRoomsWithLastMessage(dto._id);
    };
};