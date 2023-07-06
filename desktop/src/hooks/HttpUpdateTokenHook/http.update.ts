import { useNavigate } from "@solidjs/router";
import { setLoading } from "../../../store/LoadingStore/loading.store";
import { setUser } from "../../../store/UserStore/user.store"
import { AuthController } from "../../http/controllers/AuthController/auth.controller";

type funcUpdate = () => Promise<void>;

export const useUpdateToken = (): funcUpdate => {
  const nav = useNavigate();

  async function update(): Promise<void> {
    try {
      setLoading(true)
      const token = localStorage.getItem('access');
      if (!token) return;
      const instance = AuthController.getInstance();
      const { data } = await instance.refresh();
      setUser(data.data.user);
      localStorage.setItem('access', data.data.access);
      setLoading(false)
      nav('/home');
    } catch (err) {
      setLoading(false)
      setUser(null);
      localStorage.removeItem('access');
    }
  };

  return update;
}
