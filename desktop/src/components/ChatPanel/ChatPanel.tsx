import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal, For } from "solid-js";
import { getUser } from "../../../store/UserStore/user.store";
import { IResponseRoom, IUser } from "../../../types/index.types";
import { IUserListItem, UserListItem } from "../UserListItem/UsersList";
import { getAsyncUsers } from "./HttpHookForGetUsers/http.hook";
import { getAsyncOpenRooms } from "./HttpHookForGetOpenRooms/http.hook";
import { ISocketMessageResponse } from "../../../types/index.types";
import { IMyMessage } from "../../UI/MyMessage/MyMessage";
import { Box, Input, Image } from "@hope-ui/solid";
import Polygon from "./images/Polygon.svg";
import { socket } from "../../Page/HomePage/HomePage";
import { getCompanion } from "../../../store/CompanionStore/companion.store";

export const ChatPanel = () => {
  const nav = useNavigate();
  const [getUsers, setUsers] = createSignal<IUserListItem[]>([]);

  function convertToIUserListItem(array: IResponseRoom[]): IUserListItem[] {
    return array.map<IUserListItem>(el => ({
      id: el.user.id,
      username: el.user.username,
      roomId: el.lastMessage.roomId,
      msg: el.lastMessage.message,
      time: new Date(el.lastMessage.time)
    }));
  };

  function sortByUserId(prev: IUserListItem[], users: IUser[], searchParam: string): IUserListItem[] {
    const arrayOfuserId = prev.map(el => el.id);
    for (const user of users) {
      if (!arrayOfuserId.includes(user.id)) prev.push(user);
    };
    return prev.filter(el => el.username.includes(searchParam) && el.id !== getUser()?.id);
  };

  createEffect(async () => {
    const openRooms = await getAsyncOpenRooms();
    setUsers(convertToIUserListItem(openRooms));
  });

  async function usersHandler(searchParam: string): Promise<void> {
    if (!searchParam.length) {
      const openRooms = await getAsyncOpenRooms();
      setUsers(convertToIUserListItem(openRooms));
      return;
    };
    const users = await getAsyncUsers();
    setUsers(prev => sortByUserId(prev, users, searchParam));
  };

  socket.on('message', (socketData: ISocketMessageResponse<IMyMessage>) => {
    let isFind = false;
    setUsers(prev => prev.map(userMessage => {
      if (socketData.data.conversationId === userMessage.id || socketData.data.userId === userMessage.id) {
        isFind = true;
        return { ...userMessage, time: new Date(socketData.data.time), msg: socketData.data.message }
      }
      return userMessage;
    }));
    console.log(socketData)
    if (!isFind) {
      setUsers(prev => [...prev, { ...socketData.data, time: new Date(socketData.data.time), msg: socketData.data.message }])
    };
  })

  return (
    <Box
      width={310}
      height={'100vh'}
      backgroundColor={'#252838'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      borderRightWidth={1}
      borderRightColor={'#343A4F'}
    >
      <Box display={'flex'} justifyContent={'flex-end'} width={'100%'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={80}
          marginTop={21}
          marginRight={20}
          cursor={'pointer'}
          onClick={() => nav('/profile')}
        >
          <Box color={'#9898B0'} fontSize={19} textAlign={'right'}>Profile</Box>
          <Image src={Polygon} width={13} height={13} marginTop={3} />
        </Box>
      </Box>
      <Input
        placeholder={'Search'}
        width={'90%'}
        marginTop={23}
        backgroundColor={'#343A4F'}
        borderColor={'#343A4F'}
        color={'white'}
        onInput={el => usersHandler(el.target.value)}
      />

      <Box width={310} height={'100vh'} marginTop={20} overflow={'auto'}>
        <For each={getUsers()}>{
          user =>
            <UserListItem {...user} />}</For>
      </Box>
    </Box>
  )
}
