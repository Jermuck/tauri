import { createStore } from "solid-js/store";
import { IUserListItem } from "../../src/components/UserListItem/UsersList";

const [room, setStoreRooms] = createStore<{rooms: IUserListItem[]}>({rooms: []});

export const getRooms = (): IUserListItem[] => room.rooms;

export const setRooms = (rooms: IUserListItem[]) => setStoreRooms('rooms', rooms);

export const setMessageByRoom = (userId: number, conversationId: number, msg: string): void => {
    setStoreRooms('rooms', room.rooms.map<IUserListItem>(el => {
        if(el.id === userId){
            return {...el, msg}
        }
        if(el.id === conversationId){
            return {...el, msg}
        }
        return el;
    }))
}