import { Box } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";

export type ISign = "SignUp" | "SignIn";

export const AuthPage = () => {
  const [getModal, setModal] = createSignal<ISign>("SignUp");

  return (
    <Box
      backgroundColor={'#252838'}
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {
        getModal() === 'SignUp' ?
          <SignUp change={setModal} />
          : <SignIn change={setModal} />
      }
    </Box>
  )
};

