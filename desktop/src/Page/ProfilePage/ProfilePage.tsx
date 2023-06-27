import { Box, Image } from "@hope-ui/solid";
import { useAvatarStore } from "../../../store/ChangeAvatarStore/avatar.store";
import { ModalChangeAvatar } from "../../components/ModalChangeAvatar/ModalChangeAvatar";
import { SettingsForm } from "../../components/SettingsForm/SettingsForm";
import Path from "./icons/path.svg";
export const ProfilePage = () => {
  const [isModal, _] = useAvatarStore()

  return (
    <>
      <Box
        backgroundColor={'#343A4F'}
        width={'100%'}
        height={'100vh'}
        display={'flex'}
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
      //@ts-ignore
      {isModal.isOpen && <ModalChangeAvatar />}
    </>
  )
}
