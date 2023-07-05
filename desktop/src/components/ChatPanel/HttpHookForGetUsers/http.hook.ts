import { IUser } from "../../../../types/index.types";
import { UsersController } from "../../../http/controllers/UsersController/users.controller";

export async function getAsyncUsers(): Promise<IUser[]> {
  try {
    const apiInstance = UsersController.getInstance();
    const { data } = await apiInstance.findAll();
    return data.data;
  } catch (err: any) {
    return [];
  }
}
