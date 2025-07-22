export interface IUserRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
    "message": string,
    "result" : boolean,
    "data": [],
}
