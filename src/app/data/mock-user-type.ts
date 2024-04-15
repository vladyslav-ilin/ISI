import {IUserType} from "../../dtos/user-type";

export class MockUserType {
  static userType: IUserType[] = [
    {id: 1, name: 'Administrator'},
    {id: 2, name: 'Driver'}
  ]
}
