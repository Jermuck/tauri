import { Box, Image } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { getAvatar } from "../../../store/ChangeAvatarStore/avatar.store";
import { ModalChangeAvatar } from "../../components/ModalChangeAvatar/ModalChangeAvatar";
import { SettingsForm } from "../../components/SettingsForm/SettingsForm";
import { Theme } from "../../UI/Theme/Theme";
import Path from "./icons/path.svg";

export const ProfilePage = () => {
  const nav = useNavigate();
  return (
    <Theme background={'#343A4F'}>
      <Box
        width={74}
        height={'100vh'}
        backgroundColor={'#252838'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
      >
        <Image src={Path} width={38} height={38} onClick={() => nav('/home')} />
      </Box>
      <SettingsForm />
      {
        getAvatar().isOpen && <ModalChangeAvatar />
      }
    </Theme>
  )
}
