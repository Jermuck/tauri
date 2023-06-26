import { ISign } from "../src/Page/AuthPage/AuthPage";

export interface IUserModel {
  username: string;
  email: string;
  password: string;
};

export interface IUser extends IUserModel {
  id: number;
  updateDate: Date;
  createData: Date;
}
export interface IAuthorizationReponse {
  data: {
    access: string;
    user: IUser;
  }
};

export interface AxiosError {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    }
  }
};

export interface ISignChange {
  change: (type: ISign) => void;
}
