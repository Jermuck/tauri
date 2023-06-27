import { Box, Text } from "@hope-ui/solid";


export const ModalChangeAvatar = () => {
  return (
    <Box
      width={400}
      height={300}
      borderRadius={12}
      backgroundColor={'#343A4F'}
      boxShadow={'0px 0px 6px 0px rgba(0, 0, 0, 0.14)'}
      position={'absolute'}
      left={'50%'}
      transform={'translateX(-50%)'}
      top={'50%'}
      marginTop={-150}
    >
      <Text
        color={'#E2E2E4'}

      >Upload File</Text>
    </Box>
  )
}
