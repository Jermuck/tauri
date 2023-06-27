import { Box } from "@hope-ui/solid";
import { AvatarChange } from "../../UI/AvatarChange/AvatarChange";
export const SettingsForm = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      width={'100%'}
      height={'100vh'}
    >
      <AvatarChange />
    </Box>
  )
}
