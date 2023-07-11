import { IResponseGetMessages, IResponseRoom } from "../../../../types/index.types";
import { MessageController } from "../../../http/controllers/MessageController/message.controller"

export const getAsyncOpenRooms = async (): Promise<IResponseRoom[]> => {
    try{
        const apiInstnce = MessageController.getInstance();
        const {data} = await apiInstnce.getOpenRooms();
        return data.data;
    }catch(err){
        console.log(err);
        return [];
    }
}