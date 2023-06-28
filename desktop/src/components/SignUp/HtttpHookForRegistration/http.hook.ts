import { AxiosError, IUserModel } from "../../../../types/index.types";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller";
import { isLength, isEmail } from "../../SignIn/validation/validation";
import { Accessor, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { setUser } from "../../../../store/UserStore/user.store";

interface IRegisterHook {
  getError: Accessor<string | null>;
  register: (user: IUserModel) => Promise<void>;
}

export function useRegister(): IRegisterHook {
  const [getError, setError] = createSignal<string | null>(null);
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
      setUser(response.data.data.user);
      nav('/profile')
    } catch (err: any) {
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        await showError(response.data.message);
      }
    }
  };

  return { getError, register };
}
