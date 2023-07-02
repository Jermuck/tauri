import { Box, Text } from "@hope-ui/solid";
import { AvatarChange } from "../../UI/AvatarChange/AvatarChange";
import { SettingItem } from "../../UI/SettingItem/SettingItem";
import { getUser } from "../../../store/UserStore/user.store";
import { PasswordChangeInput } from "../../UI/PasswordChangeInput/PasswordChangeInput";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { getProfile } from "../../../store/ProfileStore/profile.store";
import { createSignal } from "solid-js";
import { useUpdateUserSettings } from "./HtttpHookForUpdateUserSettings/http.hook";

export interface IUserSettings {
  name: string;
  lastname: string;
  phone: string;
}

export const UserSettings = () => {
  const [getSettings, setSettings] = createSignal<IUserSettings>({} as IUserSettings);
  const { update, getError } = useUpdateUserSettings();

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
      <AvatarChange />
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
        <PasswordChangeInput
          title={'Name'}
          onChange={(value) => setSettings({ ...getSettings(), name: value })}
          type={'text'}
          value={getProfile()?.name}
          mt={10}
        />
        <PasswordChangeInput
          title={'Last name'}
          onChange={(value) => setSettings({ ...getSettings(), lastname: value })}
          type={'text'}
          value={getProfile()?.lastname}
          mt={10}
        />
        <PasswordChangeInput
          title={'Phone'}
          type={'text'}
          onChange={(value) => setSettings({ ...getSettings(), phone: value })}
          value={getProfile()?.phone}
          mt={10}
          placeholder={'+7'}
          isLine={false}
        />
      </Box>
      <Text color={'#F44D4D'} position={'absolute'} top={'75%'} fontSize={12}>{getError()}</Text>
      <CustomButton
        title={'Save'}
        width={280}
        height={38}
        onClick={() => update(getSettings())}
      />
    </Box>
  )
}
