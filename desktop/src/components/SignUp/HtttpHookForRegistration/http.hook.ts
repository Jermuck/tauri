import { AxiosError, IUserModel } from "../../../../types/index.types";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller";
import { isLength, isEmail } from "../../SignIn/validation/validation";
import { Accessor, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { setUser } from "../../../../store/UserStore/user.store";
import { setLoading } from "../../../../store/LoadingStore/loading.store";

interface IRegisterHook {
  getError: Accessor<string | null>;
  register: (user: IUserModel) => Promise<void>;
}

export function useRegister(): IRegisterHook {
  const [getError, setError] = createSignal<string | null>(null);
  const nav = useNavigate();

  function showError(message: string) {
    setError(message);
    setTimeout(() => { setError(null) }, 2000);
  };

  async function register(user: IUserModel): Promise<void> {
    try {
      const { username, email, password } = user;
      const isValidForm = !isEmail(email) || !isLength(username) || !isLength(password);
      if (isValidForm) {
        showError('Incorrect form');
        return;
      };
      setLoading(true)
      const instance = AuthController.getInstance();
      const response = await instance.register(email, password, username);
      localStorage.setItem('access', response.data.data.access);
      setUser(response.data.data.user);
      nav('/home');
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        showError(response.data.message);
      };
    }
  };

  return { getError, register };
}
