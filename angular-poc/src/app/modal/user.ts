export interface IUserRequest {
  emailId: string;
  password: string;
}

export interface IUserResponse {
    "message": string,
    "result" : boolean,
    "data": [],
}
