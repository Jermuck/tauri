import { AxiosResponse } from "axios";
import { IResponseGetMessages } from "../../../../types/index.types";
import { IMyMessage } from "../../../UI/MyMessage/MyMessage";
import { $api } from "../../axios/axios.config";

export class MessageController{
    static getInstance(): MessageController {
        return new MessageController();
    };

    public async getMessages(conversationId:number): Promise<AxiosResponse<IResponseGetMessages<IMyMessage[]>>>{
        return await $api.get<IResponseGetMessages<IMyMessage[]>>(`/messages/${conversationId}`);
    }
}