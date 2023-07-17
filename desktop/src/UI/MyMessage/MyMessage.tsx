import { Box, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

export interface IMyMessage {
  id: number;
  message: string;
  userId: number;
  time: Date;
  roomId: number;
  username:string;
  conversationId:number;
}

export const MyMessage: Component<IMyMessage> = ({
  message, time
}) => {
  const getMinutes = (min:number) => min.toString().length === 1 ? `0${min}` : min.toString()
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
        marginLeft={60}
        paddingRight={35}
        position={'relative'}
      >
        <Text color={'#E2E2E4'} fontSize={16}>{message}</Text>
        <Text
          color={'#717790'}
          fontSize={9}
          marginLeft={12}
          position={'absolute'}
          bottom={5}
          right={5}
        >
          {time.getHours() + ':' + getMinutes(time.getMinutes())}
        </Text>
      </Box>
    </Box>
  )
}
