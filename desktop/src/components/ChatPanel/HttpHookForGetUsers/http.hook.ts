import { setLoading } from "../../../../store/LoadingStore/loading.store";
import { IUser } from "../../../../types/index.types";
import { UsersController } from "../../../http/controllers/UsersController/users.controller";

export async function getAsyncUsers(): Promise<IUser[]> {
  try {
    setLoading(true)
    const apiInstance = UsersController.getInstance();
    const { data } = await apiInstance.findAll();
    setLoading(false)
    return data.data;
  } catch (err: any) {
    setLoading(false);
    return [];
  }
}
