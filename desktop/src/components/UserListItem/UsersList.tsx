import { Box, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

interface IUserListItem {
  id: number;
  username: string;
  msg?: string;
  time?: string;
}

export const UserListItem: Component<IUserListItem> = ({
  id, username, msg, time
}) => {
  return (
    <Box
      width={'100%'}
      height={71}
      display={'flex'}
      alignItems={'center'}
      borderColor={'#343A4F'}
      borderTopWidth={1}
      borderBottomWidth={1}
    >
      <Box width={47} height={47} background={'#343A4F'} borderRadius={47} marginLeft={11} />
      <Box
        width={193}
        marginLeft={20}
      >
        <Text color={'#E2E2E4'} fontSize={15}>{username}</Text>
        <Text color={'#9898B0'} fontSize={14}>{msg}</Text>
      </Box>
      <Text color={'#717790'} fontSize={11} marginBottom={27}>{time}</Text>
    </Box>
  )
}
