import { setLoading } from "../../../../store/LoadingStore/loading.store";
import { IMyMessage } from "../../../UI/MyMessage/MyMessage";
import { MessageController } from "../../../http/controllers/MessageController/message.controller";

export const getAsyncMessages = async (conversationId:number): Promise<IMyMessage[]>=> {
    try{
        setLoading(true)
        const apiInstance = MessageController.getInstance();
        const {data} = await apiInstance.getMessages(conversationId);
        const messages = data.data.map<IMyMessage>(el => ({...el, time: new Date(el.time)}));
        setLoading(false);
        return messages;
    }catch(err: any){
        setLoading(false)
        return [];
    }
}