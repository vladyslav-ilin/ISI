import {IUserTitle} from "../../dtos/user-title";

export class MockUserTitleData {
  static userTitle: IUserTitle[] = [
    {id: 1, title: 'User Name'},
    {id: 2, title: 'First Name'},
    {id: 3, title: 'Last Name'},
    {id: 4, title: 'Email'},
    {id: 5, title: 'Type'},
  ]
}
