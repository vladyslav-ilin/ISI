import {IUserType} from "./user-type";

export interface IUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  type: IUserType;
  password: string;
}
