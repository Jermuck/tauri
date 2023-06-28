import { Box, Text } from "@hope-ui/solid";
import { setAvatar } from "../../../store/ChangeAvatarStore/avatar.store";
import { CustomButton } from "../../UI/CustomButton/CustomButton";

export const ModalChangeAvatar = () => {
  return (
    <Box
      width={400}
      height={300}
      borderRadius={12}
      backgroundColor={'#252838'}
      boxShadow={'0px 0px 6px 0px rgba(0, 0, 0, 0.14)'}
      position={'absolute'}
      left={'50%'}
      transform={'translateX(-50%)'}
      top={'50%'}
      marginTop={-150}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-around'}
      transition={"3s"}
    >
      <Text
        color={'#E2E2E4'}
        textAlign={'center'}
        fontSize={20}
        fontWeight={500}
      >Upload File</Text>
      <Text
        color={'#3369F3'}
        textDecoration={'underline'}
        width={120}
        textAlign={'center'}
        cursor={'pointer'}
      >
        Select file on computer
      </Text>
      <CustomButton
        width={240}
        height={40}
        title={'Change'}
        //@ts-ignore
        onClick={() => setAvatar(false)}
      />
    </Box>
  )
}
