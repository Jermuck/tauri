import { AxiosResponse } from "axios";
import { $api } from "../../axios/axios.config";
import { IAuthorizationResponse } from "../../../../types/index.types";

export class AuthController {

  static getInstance(): AuthController {
    return new AuthController();
  }

  public async login(email: string, password: string): Promise<AxiosResponse<IAuthorizationResponse>> {
    return $api.post<IAuthorizationResponse>('/auth/login', {
      email, password
    });
  };

  public async register(email: string, password: string, username: string): Promise<AxiosResponse<IAuthorizationResponse>> {
    return $api.post<IAuthorizationResponse>('/auth/register', {
      email, password, username
    });
  };

  public async refresh(): Promise<AxiosResponse<IAuthorizationResponse>> {
    return $api.get<IAuthorizationResponse>('/auth/refresh');
  };

  public async logout(): Promise<AxiosResponse<void>> {
    return $api.post<void>('/auth/logout');
  }
};

