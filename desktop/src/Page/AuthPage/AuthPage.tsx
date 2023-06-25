import { createSignal } from "solid-js";
import { Box } from "@hope-ui/solid";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";

export const AuthPage = () => {
  const [getValue, setValue] = createSignal<string | null>(null);
  return (
    <Box
      backgroundColor={'#252838'}
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SignUp />
    </Box>
  )
};

