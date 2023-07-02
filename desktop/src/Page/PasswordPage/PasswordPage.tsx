import { Box, Image } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { getAvatar } from "../../../store/ChangeAvatarStore/avatar.store";
import { ModalChangeAvatar } from "../../components/ModalChangeAvatar/ModalChangeAvatar";
import { SettingsPassword } from "../../components/SettingsPassword/SettingsPassword";
import Path from "../ProfilePage/icons/path.svg";

export const PasswordPage = () => {
  const nav = useNavigate();
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
        <Image
          src={Path}
          width={38}
          height={38}
          cursor={'pointer'}
          onClick={() => nav('/profile')}
        />
      </Box>
      <SettingsPassword />
      {getAvatar().isOpen && <ModalChangeAvatar />}
    </Box >
  )
}
