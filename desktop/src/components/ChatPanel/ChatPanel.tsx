import { Box, Image, Input } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { getUser } from "../../../store/UserStore/user.store";
import { IUser } from "../../../types/index.types";
import { UserListItem } from "../UserListItem/UsersList";
import { getAsyncUsers } from "./HttpHookForGetUsers/http.hook";
import Polygon from "./images/Polygon.svg";

export const ChatPanel = () => {
  const nav = useNavigate();
  const [getUsers, setUsers] = createSignal<IUser[]>([]);

  async function usersHandler(searchParam: string): Promise<void> {
    if (searchParam.length === 0) {
      setUsers([]);
      return;
    }
    const users = await getAsyncUsers();
    setUsers(users.filter(el => el.username.includes(searchParam) && el.id !== getUser()?.id));
  };

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

      <Box width={310} marginTop={20}>
        <For each={getUsers()}>{
          user =>
            <UserListItem id={user.id} username={user.username} />}</For>
      </Box>
    </Box>
  )
}
