import { Box, Container, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

export interface IMyMessage {
  id: number;
  message: string;
  isCheck?: boolean;
  time: Date
}

export const MyMessage: Component<IMyMessage> = ({
  id, message, isCheck, time
}) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      width={'100%'}
      marginTop={10}
    >
      <Box
        backgroundColor={'#252838'}
        width={'fit-content'}
        padding={7}
        borderTopRightRadius={8}
        borderBottomLeftRadius={8}
        borderTopLeftRadius={8}
        display={'flex'}
        marginRight={10}
      >
        <Text color={'#E2E2E4'} fontSize={16}>{message}</Text>
        <Text color={'#717790'} fontSize={9} marginLeft={12}>{
          time.getHours().toString() + ':' + time.getMinutes().toString()
        }</Text>
      </Box>
    </Box>
  )
}
