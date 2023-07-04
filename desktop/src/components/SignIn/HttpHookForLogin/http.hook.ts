import { Accessor, createSignal } from "solid-js";
import { isEmail, isLength } from "../validation/validation";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller";
import { AxiosError } from "../../../../types/index.types";
import { useNavigate } from "@solidjs/router";
import { setUser } from "../../../../store/UserStore/user.store";
import { setLoading } from "../../../../store/LoadingStore/loading.store";

interface ILoginHook {
  getError: Accessor<string | null>;
  login: (email: string, password: string) => Promise<void>;
}

export function useLogin(): ILoginHook {
  const [getError, setError] = createSignal<string | null>(null);
  const nav = useNavigate();

  function showError(message: string): void {
    setError(message);
    setTimeout(() => { setError(null) }, 2000);
  };

  async function login(email: string, password: string): Promise<void> {
    try {
      if (!isEmail(email) || !isLength(password)) {
        showError("Incorrect form");
        return;
      };
      setLoading(true)
      const instance = AuthController.getInstance();
      //@ts-ignore
      const response = await instance.login(email, password);
      localStorage.setItem('access', response.data.data.access);
      setUser(response.data.data.user);
      nav('/home');
      setLoading(false)
    } catch (err) {
      setLoading(false)
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        showError(response.data.message);
      };
    }
  };

  return { getError, login };
}
