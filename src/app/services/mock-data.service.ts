import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";
import {MockUserData} from "../data/mock-user";
import {IUser} from "../../../../../ISI/src/dtos/user";
import {IUserTitle} from "../../dtos/user-title";
import {MockUserTitleData} from "../data/mock-user-title";
import {IUserType} from "../../dtos/user-type";
import {MockUserType} from "../data/mock-user-type";

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {

  createDb(): { users: IUser[], userTitle: IUserTitle[], userType: IUserType[] } {
    const users = MockUserData.users;
    const userTitle = MockUserTitleData.userTitle;
    const userType = MockUserType.userType;

    return { users, userTitle, userType };
  }
}
