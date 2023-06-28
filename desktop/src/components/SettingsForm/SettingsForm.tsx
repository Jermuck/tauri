import { Box, Text } from "@hope-ui/solid";
import { getAvatar } from "../../../store/ChangeAvatarStore/avatar.store";
import { getUser } from "../../../store/UserStore/user.store";
import { AvatarChange } from "../../UI/AvatarChange/AvatarChange";
import { SettingItem } from "../../UI/SettingItem/SettingItem";
import { ModalChangeAvatar } from "../ModalChangeAvatar/ModalChangeAvatar";
import { useLogout } from "./HttpHookForLogout/http.hook";

export const SettingsForm = () => {
  const logout = useLogout();
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'space-around'}
      width={'100%'}
      height={800}
      position={'relative'}
    >
      {
        //@ts-ignore
        getAvatar().isOpen && <ModalChangeAvatar />
      }
      <Box display={'flex'} flexDirection={'column'} alignItems={"center"}>
        <AvatarChange />
        <Text
          color={'#E2E2E4'}
          fontSize={18}
          fontWeight={600}
          marginTop={31}
        >
          { //@ts-ignore
            getUser().username
          }
        </Text>
      </Box>
      <Box height={177} display={'flex'} flexDirection={'column'} justifyContent={"space-between"}>
        <SettingItem
          title={'Email'}
          //@ts-ignore
          value={getUser().email}
        />
        <SettingItem
          title={'Login'}
          //@ts-ignore
          value={getUser().username}
          mt={10}
        />
        <SettingItem
          title={'Name'}
          value={'your name'}
          mt={10}
        />
        <SettingItem
          title={'Last name'}
          value={'your last name'}
          mt={10}
        />
        <SettingItem
          title={'Phone'}
          value={'Your phone'}
          mt={10}
          isLine={false}
        />
      </Box>
      <Box height={70} display={'flex'} flexDirection={'column'} justifyContent={"space-between"}>
        <SettingItem
          title={'Change data'}
          value={''}
          colorTitle={'#3369F3'}
        />
        <SettingItem
          title={'Change password'}
          value={''}
          mt={10}
          colorTitle={'#3369F3'}
        />
        <SettingItem
          title={'Logout'}
          value={''}
          mt={10}
          colorTitle={'#F44D4D'}
          isLine={false}
          onClick={logout}
        />
      </Box>
    </Box >
  )
}
