import { AxiosError, IUser, IUserModel } from "../../../../types/index.types";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller";
import { isLength, isEmail } from "../../SignIn/validation/validation";
import { Accessor, createSignal } from "solid-js";
import { } from "effector";
import { useUserFromStore } from "../../../../store/UserStore/user.store";
import { useNavigate } from "@solidjs/router";
interface IRegisterHook {
  getError: Accessor<string | null>;
  register: (user: IUserModel) => Promise<void>;
}

export function useRegister(): IRegisterHook {
  const [getError, setError] = createSignal<string | null>(null);
  const [_, setUser] = useUserFromStore();
  const nav = useNavigate();

  async function showError(message: string): Promise<void> {
    setError(message);
    setTimeout(() => { setError(null) }, 2000);
  };

  async function register(user: IUserModel): Promise<void> {
    try {
      const { username, email, password } = user;
      const isValidForm = !isEmail(email) || !isLength(username) || !isLength(password);
      if (isValidForm) {
        await showError('Incorrect form');
        return;
      };
      const instance = AuthController.getInstance();
      const response = await instance.register(email, password, username);
      localStorage.setItem('access', response.data.data.access);
      //@ts-ignore
      setUser(response.data.data.user);
      nav('/home')
    } catch (err: any) {
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        await showError(response.data.message);
      }
    }
  };

  return { getError, register };
}
