import { useNavigate } from "@solidjs/router";
import { useUserFromStore } from "../../../store/UserStore/user.store"
import { IUser } from "../../../types/index.types";
import { AuthController } from "../../http/controllers/AuthController/auth.controller";

type funcUpdate = () => Promise<void>;

export const useUpdate = (): funcUpdate => {
  const [_, setUser] = useUserFromStore();
  const nav = useNavigate();

  async function update(): Promise<void> {
    try {
      console.log("Da");
      const token = localStorage.getItem('access');
      if (!token) return;
      const instance = AuthController.getInstance();
      const { data } = await instance.refresh();
      //@ts-ignore
      setUser(data.data.user);
      localStorage.setItem('access', data.data.access);
      nav('/home');
    } catch (err) {
      //@ts-ignore
      setUser({} as IUser);
      localStorage.removeItem('access');
    }
  };

  return update;
}
