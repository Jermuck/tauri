import { createStore } from "solid-js/store";
import { IUserListItem } from "../../src/components/UserListItem/UsersListItem";
import { IMyMessage } from "../../src/UI/MyMessage/MyMessage";

const [room, setStoreRooms] = createStore<{rooms: IUserListItem[]}>({rooms: []});

export const getRooms = (): IUserListItem[] => room.rooms;

export const setRooms = (rooms: IUserListItem[]) => setStoreRooms('rooms', rooms);

export const setMessageByRoom = (userId: number, conversationId: number, msg: IMyMessage): void => {
    let isFind = false;
    setStoreRooms('rooms', room.rooms.map<IUserListItem>(el => {
        if(el.id === userId || el.id === conversationId){
            isFind = true;
            return {...el, time: new Date(msg.time), msg: msg.message}
        }
        return el;
    }));
    const newUserListItem: IUserListItem = {
        id: msg.userId,
        //@ts-ignore
        username: msg.username,
        roomId: msg.roomId,
        time: new Date(msg.time),
        msg: msg.message
    }
    if(!isFind) setStoreRooms('rooms', [...room.rooms, newUserListItem]);
}