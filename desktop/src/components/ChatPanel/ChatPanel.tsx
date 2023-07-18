import { useNavigate } from "@solidjs/router";
import { createSignal, For, onMount } from "solid-js";
import { UserListItem } from "../UserListItem/UsersList";
import { getAsyncUsers } from "./HttpHookForGetUsers/http.hook";
import { Box, Input, Image } from "@hope-ui/solid";
import Polygon from "./images/Polygon.svg";
import { useOpenRoomsFilter } from "./useOpenRoomsFilter";
import { getRooms, setRooms } from "../../../store/openRoomStore/room.store";

export const ChatPanel = () => {
  const nav = useNavigate();
  const {
    getOpenRoomsWithFilter,
    convertToIUserListItem,
    sortByUserId
  } = useOpenRoomsFilter();

  onMount(async () => {
    const openRooms = await getOpenRoomsWithFilter();
    setRooms(convertToIUserListItem(openRooms));
  });

  async function usersHandler(searchParam: string): Promise<void> {
    if (!searchParam.length) {
      const openRooms = await getOpenRoomsWithFilter();
      setRooms(convertToIUserListItem(openRooms));
      return;
    };
    const users = await getAsyncUsers();
    setRooms(sortByUserId(getRooms(), users, searchParam));
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

      <Box width={310} height={'100vh'} marginTop={20} overflow={'auto'}>
        <For each={getRooms()}>{
          room =>
            <UserListItem {...room} />}</For>
      </Box>
    </Box>
  )
}
