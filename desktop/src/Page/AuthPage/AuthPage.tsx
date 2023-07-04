import { createSignal } from "solid-js";
import { SignIn } from "../../components/SignIn/SignIn";
import { SignUp } from "../../components/SignUp/SignUp";
import { Theme } from "../../UI/Theme/Theme";

export type ISign = "SignUp" | "SignIn";

export const AuthPage = () => {
  const [getModal, setModal] = createSignal<ISign>("SignUp");

  return (
    <Theme
    >
      {
        getModal() === 'SignUp' ?
          <SignUp change={setModal} />
          : <SignIn change={setModal} />
      }
    </Theme>
  )
};

