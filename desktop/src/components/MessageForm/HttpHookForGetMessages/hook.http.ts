import { IMyMessage } from "../../../UI/MyMessage/MyMessage";
import { MessageController } from "../../../http/controllers/MessageController/message.controller";

export const getAsyncMessages = async (conversationId:number): Promise<IMyMessage[]>=> {
    try{
        const apiInstance = MessageController.getInstance();
        const {data} = await apiInstance.getMessages(conversationId);
        const messages = data.data.map<IMyMessage>(el => ({...el, time: new Date(el.time)}));
        return messages;
    }catch(err){
        console.log(err);
        return [];
    }
}