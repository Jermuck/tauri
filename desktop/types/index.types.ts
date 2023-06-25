export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IAuthorizationReponse {
  data: {
    access: string;
    user: IUser;
  }
}
