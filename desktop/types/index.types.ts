import { ISign } from "../src/page/AuthPage/AuthPage";
import { IMyMessage } from "../src/UI/MyMessage/MyMessage";

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
};

export interface IResponseGetMessages<T>{
  data: T;
};

export interface IResponseRoom{
  user: IUser;
  lastMessage: Omit<IMyMessage, 'userId'>;
  conversation: IUser;
};

export interface IDeleteRoomDto {
  roomId: number;
  conversationId: number | null;
};

export interface IDeleteRoomResponse{
  userRoomId: number;
  conversationRoomId: number;
}