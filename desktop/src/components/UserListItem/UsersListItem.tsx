import { Box, Text } from "@hope-ui/solid";
import { Component } from "solid-js";
import { setCompanion } from "../../../store/CompanionStore/companion.store";

export interface IUserListItem {
  id: number;
  username: string;
  roomId?:number;
  msg?: string;
  time?: Date;
}

export const UserListItem: Component<IUserListItem> = ({
  id, username, msg, time
}) => {
  const getMinutes = (min: number | undefined) => { 
    if(!min) return;
    return min.toString().length === 1 ? `0${min}` : min.toString() 
  };

  const convertainMessage = (msg: string | undefined): undefined | string => {
    if(!msg) return undefined;
    if(msg.length > 25 ) return msg?.slice(0, 25) + '...';
    return msg;
  }
  return (
    <Box
      width={310}
      height={71}
      display={'flex'}
      alignItems={'center'}
      borderColor={'#343A4F'}
      borderTopWidth={1}
      borderBottomWidth={1}
      onClick={() => setCompanion({ id, username })}
      cursor={'pointer'}
    >
      <Box width={47} height={47} background={'#343A4F'} borderRadius={47} marginLeft={11} />
      <Box
        width={193}
        marginLeft={20}
      >
        <Text color={'#E2E2E4'} fontSize={15}>{username}</Text>
        <Text color={'#9898B0'} fontSize={14}>{convertainMessage(msg)}</Text>
      </Box>
      <Text color={'#717790'} fontSize={11} marginBottom={27}>{
        time && time?.getHours() + ':' + getMinutes(time?.getMinutes())
      }</Text>
    </Box >
  )
}
