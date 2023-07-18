import { IResponseRoom, IUser } from "../../../../types/index.types";
import { IUserListItem } from "../../UserListItem/UsersList";
import { getUser } from "../../../../store/UserStore/user.store";
import { getAsyncOpenRooms } from "../HttpHookForGetOpenRooms/http.hook";

interface IUseOpenRoomsFilter {
    convertToIUserListItem: (array: IResponseRoom[]) => IUserListItem[];
    getOpenRoomsWithFilter: () => Promise<IResponseRoom[]>;
    sortByUserId: (prev: IUserListItem[], users: IUser[], searchParam: string) => IUserListItem[];
}

export const useOpenRoomsFilter = (): IUseOpenRoomsFilter => {
  function convertToIUserListItem(array: IResponseRoom[]): IUserListItem[] {
    return array.map<IUserListItem>(el => ({
      id: el.conversation.id,
      username: el.conversation.username,
      roomId: el.lastMessage.roomId,
      msg: el.lastMessage.message,
      time: new Date(el.lastMessage.time)
    }));
  };

  async function getOpenRoomsWithFilter(): Promise<IResponseRoom[]>{
    return await getAsyncOpenRooms();
  };

  function sortByUserId(prev: IUserListItem[], users: IUser[], searchParam: string): IUserListItem[] {
    const arrayOfuserId = prev.map(el => el.id);
    const newOpenRooms = [];
    for (const user of users) {
      if (!arrayOfuserId.includes(user.id)) newOpenRooms.push(user);
    };
    return newOpenRooms.filter(el => el.username.includes(searchParam) && el.id !== getUser()?.id);
  };

  return {
    convertToIUserListItem,
    getOpenRoomsWithFilter,
    sortByUserId
  }
}