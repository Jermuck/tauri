import { AxiosResponse } from "axios";
import { IPasswordResponse, IPasswordRequestBody } from "../../../../types/index.types";
import { $api } from "../../axios/axios.config";

export class ProfileController {

  static getInstance(): ProfileController {
    return new ProfileController();
  };
  public async change(data: IPasswordRequestBody): Promise<AxiosResponse<IPasswordResponse>> {
    return $api.post<IPasswordResponse>("/profile/changepassword", data);
  };
}
