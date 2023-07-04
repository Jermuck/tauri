import { AxiosResponse } from "axios";
import { $api } from "../../axios/axios.config";
import { IUser, IUsersResponse } from "../../../../types/index.types";

export class UsersController {
  static getInstance(): UsersController {
    return new UsersController();
  };

  public async findAll(): Promise<AxiosResponse<IUsersResponse>> {
    return await $api.get<IUsersResponse>('/users');
  }
}
