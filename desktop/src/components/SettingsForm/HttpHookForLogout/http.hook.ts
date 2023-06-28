import { useNavigate } from "@solidjs/router";
import { setUser } from "../../../../store/UserStore/user.store";
import { AuthController } from "../../../http/controllers/AuthController/auth.controller"

type MyFunc = () => Promise<void>;

export const useLogout = (): MyFunc => {
  const nav = useNavigate();

  async function logout(): Promise<void> {
    try {
      const instance = AuthController.getInstance();
      await instance.logout();
      setUser(null)
      localStorage.removeItem('access');
      nav('/');
    } catch (err) {
      console.log('Server error');
    }
  };
  return logout;
}
