import { Box, Image } from "@hope-ui/solid";
import { SettingsForm } from "../../components/SettingsForm/SettingsForm";
import Path from "./icons/path.svg";

export const ProfilePage = () => {
  return (
    <Box
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      background={'#343A4F'}
    >
      <Box
        width={74}
        height={'100vh'}
        backgroundColor={'#252838'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Image src={Path} width={38} height={38} />
      </Box>
      <SettingsForm />
    </Box >
  )
}
