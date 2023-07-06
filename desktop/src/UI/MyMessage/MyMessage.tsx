import { Box, Container, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

interface IMyMessage {
  id: number;
  message: string;
  isCheck: boolean;
}

export const MyMessage: Component<IMyMessage> = ({
  id, message, isCheck
}) => {
  return (
    <Box
      backgroundColor={'#252838'}
      width={'fit-content'}
      padding={7}
      borderTopRightRadius={8}
      borderBottomLeftRadius={8}
      borderTopLeftRadius={8}
      display={'flex'}
    >
      <Text color={'#E2E2E4'} fontSize={16}>{message}</Text>
      <Text color={'#717790'} fontSize={9} marginLeft={12}>12:00</Text>
    </Box>
  )
}
