import { AxiosResponse } from "axios";
import { IAuthorizationReponse } from "../../../../types/index.types";
import { $api } from "../../axios/axios.config";

export class AuthController {
  static getInstance() {
    return new AuthController();
  };

  public async login(email: string, password: string): Promise<AxiosResponse<IAuthorizationReponse>> {
    return $api.post<IAuthorizationReponse>('/auth/login', {
      email, password
    });
  };

  public async register(email: string, password: string, username: string): Promise<AxiosResponse<IAuthorizationReponse>> {
    return $api.post<IAuthorizationReponse>('/auth/register', {
      email, password, username
    });
  };

  public async refresh(): Promise<AxiosResponse<IAuthorizationReponse>> {
    return await $api.get<IAuthorizationReponse>('/auth/refresh');
  };

  public async logout(): Promise<AxiosResponse<void>> {
    return $api.post<void>('/auth/logout');
  }
};
