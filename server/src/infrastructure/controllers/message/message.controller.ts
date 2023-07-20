import { Body, Controller, Get, HttpCode, Inject, Param, UseGuards } from "@nestjs/common";
import { BodyCanActivate } from "../auth/dto/user.register.dto";
import { AuthGuard } from "src/infrastructure/common/guards/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MessageParam } from "./dto/message.dto";
import { MessageUseCaseModule } from "src/use-cases/message-usecases/message.usecase-proxy";
import { MessageUseCase } from "src/use-cases/message-usecases/usecase-blocks/message.usecase";
import { IMessageResponse, UserOpenRoomResponse } from "src/use-cases/message-usecases/response-data/response.interface";

@Controller('/messages')
@ApiTags('Message')
export class MessageController{
    constructor(
        @Inject(MessageUseCaseModule.MESSAGE_USECASE)
        private readonly messageUseCaseInstance: MessageUseCase
    ){};

    @Get('/all/:conversationId')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        type: [IMessageResponse]
    })
    @ApiBearerAuth('access-token')
    @ApiOperation({ description: 'Get messages by user'})
    public async getMessages(
        @Param() param: MessageParam, 
        @Body() dto: BodyCanActivate
    ){
        return await this.messageUseCaseInstance.getMessages(dto._id, +param.conversationId);
    };

    @Get('/rooms')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiResponse({
        status: 200,
        type: [UserOpenRoomResponse]
    })
    @ApiBearerAuth('access-token')
    @ApiOperation({description: 'Get open messages transaction'})
    public async getRooms(@Body() dto: BodyCanActivate){
        return await this.messageUseCaseInstance.getRoomsWithLastMessage(dto._id);
    };

};