import { Box, Text } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { AvatarChange } from "../../UI/AvatarChange/AvatarChange";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { PasswordChangeInput } from "../../UI/PasswordChangeInput/PasswordChangeInput";
import { useChangePassword } from "./HttpHookForChangePassword/http.hook";

export interface IPassword {
  password: string;
  newPassword: string;
  repeatPassword: string;
}

export const SettingsPassword = () => {
  const [getPassword, setPassword] = createSignal<IPassword>({} as IPassword);
  const { change, getError } = useChangePassword();

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
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <PasswordChangeInput
          title={'Current password'}
          onChange={value => setPassword({ ...getPassword(), password: value })}
          mt={10}
        />
        <PasswordChangeInput
          title={'New password'}
          mt={10}
          onChange={value => setPassword({ ...getPassword(), newPassword: value })}
        />
        <PasswordChangeInput
          title={'Repeat new password'}
          mt={10}
          onChange={value => setPassword({ ...getPassword(), repeatPassword: value })}
        />
      </Box>
      <Text color={'#F44D4D'} position={'absolute'} top={'70%'} fontSize={12}>{getError()}</Text>
      <CustomButton
        title={'Save'}
        width={280}
        height={38}
        onClick={() => change(getPassword())}
      />
    </Box>
  )
}
