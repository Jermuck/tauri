import { AxiosResponse } from "axios";
import { IPasswordResponse, IPasswordRequestBody, IProfileResponse } from "../../../../types/index.types";
import { IPassword } from "../../../components/SettingsPassword/SettingsPassword";
import { IUserSettings } from "../../../components/UserSettings/UserSettings";
import { $api } from "../../axios/axios.config";

export class ProfileController {

  static getInstance(): ProfileController {
    return new ProfileController();
  };
  public async change(data: IPasswordRequestBody): Promise<AxiosResponse<IPasswordResponse>> {
    return $api.post<IPasswordResponse>('/profile/changepassword', data);
  };

  public async getProfile(): Promise<AxiosResponse<IProfileResponse>> {
    return $api.get<IProfileResponse>('/profile');
  };

  public async updateSettings(data: IUserSettings): Promise<AxiosResponse<IProfileResponse>> {
    return $api.post<IProfileResponse>('/profile/update', data);
  };
}
