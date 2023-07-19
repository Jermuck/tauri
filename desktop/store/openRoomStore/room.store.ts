import { createStore } from "solid-js/store";
import { IUserListItem } from "../../src/components/UserListItem/UsersListItem";
import { IMyMessage } from "../../src/UI/MyMessage/MyMessage";
import { IDeleteRoomResponse } from "../../types/index.types";

const [room, setStoreRooms] = createStore<{rooms: IUserListItem[]}>({rooms: []});

export const getRooms = (): IUserListItem[] => room.rooms;

export const setRooms = (rooms: IUserListItem[]) => setStoreRooms('rooms', rooms);

export const setMessageByRoom = (userId: number, conversationId: number, msg: IMyMessage): void => {
    let isFind = false;
    setStoreRooms('rooms', room.rooms.map<IUserListItem>(el => {
        if(el.id === userId || el.id === conversationId){
            isFind = true;
            return {...el, time: new Date(msg.time), msg: msg.message, roomId: msg.roomId};
        }
        return {...el, roomId: el.roomId};
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
};

export const setMessageRoomIncludeDelete = (data: IDeleteRoomResponse) => {
    setStoreRooms('rooms', room.rooms.filter(client => {
        if(client.roomId !== data.userRoomId && client.roomId !== data.conversationRoomId){
            return client;
        };
        console.log("Da")
    }))
}