import { Box, Text } from "@hope-ui/solid"
import { Component } from "solid-js"
import { IMyMessage } from "../MyMessage/MyMessage"

export const CompanionMessage: Component<IMyMessage> = ({
  id, message, isCheck
}) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'flex-start'}
      width={'100%'}
      marginTop={10}
    >
      <Box
        backgroundColor={'#4C546F'}
        width={'fit-content'}
        padding={7}
        borderTopRightRadius={8}
        borderBottomLeftRadius={8}
        borderRightRadius={8}
        display={'flex'}
        marginLeft={10}
      >
        <Text color={'#E2E2E4'} fontSize={16}>{message}</Text>
        <Text color={'#717790'} fontSize={9} marginLeft={12}>12:00</Text>
      </Box>
    </Box>

  )
}
