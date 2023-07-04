import { useNavigate } from "@solidjs/router";
import { setLoading } from "../../../../store/LoadingStore/loading.store";
import { setUser } from "../../../../store/UserStore/user.store";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller"

type MyFunc = () => Promise<void>;

export const useLogout = (): MyFunc => {
  const nav = useNavigate();

  async function logout(): Promise<void> {
    try {
      setLoading(true);
      const instance = AuthController.getInstance();
      await instance.logout();
      setUser(null)
      localStorage.removeItem('access');
      setLoading(false);
      nav('/');
    } catch (err) {
      setLoading(false);
      console.log('Server error');
    }
  };
  return logout;
}
