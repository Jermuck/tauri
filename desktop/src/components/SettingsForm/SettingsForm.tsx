import { Box, Text } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { getUser } from "../../../store/UserStore/user.store";
import { useUpdateProfile } from "../../hooks/HttpUpdateProfileHook/http.hook";
import { AvatarChange } from "../../UI/AvatarChange/AvatarChange";
import { SettingItem } from "../../UI/SettingItem/SettingItem";
import { useLogout } from "./HttpHookForLogout/http.hook";
import { getProfile } from "../../../store/ProfileStore/profile.store";
import { createEffect, onMount } from "solid-js";

export const SettingsForm = () => {
  const logout = useLogout();
  const nav = useNavigate();
  const updateProfile = useUpdateProfile();

  createEffect(async () => await updateProfile());
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
      <Box display={'flex'} flexDirection={'column'} alignItems={"center"}>
        <AvatarChange />
        <Text
          color={'#E2E2E4'}
          fontSize={18}
          fontWeight={600}
          marginTop={31}
        >
          {
            getUser()?.username
          }
        </Text>
      </Box>
      <Box height={177} display={'flex'} flexDirection={'column'} justifyContent={"space-between"}>
        <SettingItem
          title={'Email'}
          value={getUser()?.email}
        />
        <SettingItem
          title={'Login'}
          value={getUser()?.username}
          mt={10}
        />
        <SettingItem
          title={'Name'}
          value={getProfile()?.name ? getProfile()?.name : 'your name'}
          mt={10}
        />
        <SettingItem
          title={'Last name'}
          value={getProfile()?.lastname ? getProfile()?.lastname : 'your last name'}
          mt={10}
        />
        <SettingItem
          title={'Phone'}
          value={getProfile()?.phone ? getProfile()?.phone : 'your phone'}
          mt={10}
          isLine={false}
        />
      </Box>
      <Box height={70} display={'flex'} flexDirection={'column'} justifyContent={"space-between"}>
        <SettingItem
          title={'Change data'}
          value={''}
          colorTitle={'#3369F3'}
          onClick={() => nav('/profile/settings')}
        />
        <SettingItem
          title={'Change password'}
          value={''}
          mt={10}
          colorTitle={'#3369F3'}
          onClick={() => nav('/profile/password')}
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
