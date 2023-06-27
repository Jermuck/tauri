import { Box } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { useUserFromStore } from "../../../store/UserStore/user.store";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";

export type ISign = "SignUp" | "SignIn";

export const AuthPage = () => {
  const [getModal, setModal] = createSignal<ISign>("SignUp");
  const [user, _] = useUserFromStore();
  const nav = useNavigate();

  onMount(() => {
    //@ts-ignore
    if (user.username) nav('/profile');
  });

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

