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

export interface IAuthorizationResponse {
  data: {
    access: string;
    user: IUser;
  }
}

export interface AxiosError {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    }
  }
}

export interface IPasswordRequestBody {
  password: string;
  newPassword: string;
}

export interface IPasswordResponse {
  data: IPasswordResponse
}

export interface ISignChange {
  change: (type: ISign) => void;
}

export interface IProfile {
  id: number;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  userId: number;
};

export interface IProfileResponse {
  data: IProfile;
};

export interface IUsersResponse {
  data: IUser[];
};

export interface ICompanion {
  id: number;
  username: string;
}

export interface CreateDtoMessage {
  conversationId: number;
  message: string;
  time: Date;
}
export interface ISocketMessageResponse<T>{
  error: 'error' | 'message';
  data: T;
  message: string;
}