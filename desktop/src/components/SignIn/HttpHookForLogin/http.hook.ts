import { Accessor, createSignal } from "solid-js";
import { isEmail, isLength } from "../validation/validation";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller";
import { AxiosError } from "../../../../types/index.types";
import { useUserFromStore } from "../../../../store/UserStore/user.store";
import { useNavigate } from "@solidjs/router";

interface ILoginHook {
  getError: Accessor<string | null>;
  login: (email: string, password: string) => Promise<void>;
}

export function useLogin(): ILoginHook {
  const [getError, setError] = createSignal<string | null>(null);
  const [_, setUser] = useUserFromStore();
  const nav = useNavigate();

  async function showError(message: string): Promise<void> {
    setError(message);
    setTimeout(() => { setError(null) }, 2000);
  };

  async function login(email: string, password: string): Promise<void> {
    try {
      if (!isEmail(email) || !isLength(password)) {
        await showError("Incorrect form");
        return;
      };
      const instance = AuthController.getInstance();
      //@ts-ignore
      const response = await instance.login(email, password);
      localStorage.setItem('access', response.data.data.access);
      //@ts-ignore
      setUser(response.data.data.user);
      nav('/home')
    } catch (err) {
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        await showError(response.data.message);
      }
    }
  };

  return { getError, login };
}
