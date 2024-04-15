import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  Subject, take
} from "rxjs";
import {IUser} from "../../dtos/user";
import {IUserTitle} from "../../dtos/user-title";
import {IUserType} from "../../dtos/user-type";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersListUrl: string = 'api/users';
  public userTitleUrl: string = 'api/userTitle';
  public userTypeUrl: string = 'api/userType';

  readonly userListSubject = new BehaviorSubject<IUser[] | null>(null);

  public get users$(): Subject<IUser[] | null> {
    return this.userListSubject;
  }

  private errorSubject = new BehaviorSubject<{ status: number, message: string } | null>(null);
  getErrorAction$ = this.errorSubject.asObservable();

  public getUsersList() {
    this.http.get<IUser[]>(this.usersListUrl)
      .subscribe((users) => this.userListSubject.next(users));
  }

  getUserTitle$ = this.http.get<IUserTitle[]>(this.userTitleUrl)
    .pipe(
    );

  // updateUser$ = this.userUpdatedAction$
  //   .pipe(
  //     switchMap((user) => {
  //       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //
  //       return this.http.put<IUser>(this.usersListUrl, user, {headers})
  //     }),
  //   )

  // createUser$ = this.userInsertedAction$
  //   .pipe(
  //     switchMap((user) => {
  //       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //
  //       return this.http.post<IUser>(this.usersListUrl, user, {headers})
  //     }),
  //   )

  selectedUser$ = new BehaviorSubject<IUser>(null);

  getUserType$ = this.http.get<IUserType[]>(this.userTypeUrl)
    .pipe(
    );

  constructor(private http: HttpClient) { }

  selectedUserChanged(selectedUserId: number): void {
    let users = this.userListSubject.getValue();
    if (users !== null && selectedUserId !== null) {
      this.selectedUser$.next(users.find((user) => user.id === selectedUserId))
    } else {
      this.selectedUser$.next(null);
    }
  }

  updateUser(updatedUser?: IUser) {
    if (updatedUser) {
      this.userListSubject.pipe(
        take(1)
      ).subscribe(users => {
        if (users) {
          const index = users.findIndex(user => user.id === updatedUser.id);
          if (index !== -1) {
            const updatedUsers = [...users];
            updatedUsers[index] = updatedUser;
            updatedUsers.sort((user, item) => user.id - item.id);
            this.userListSubject.next(updatedUsers);
          }
        }
      });
    }
  }

  createUser(newUser?: IUser) {
    if (newUser)
      this.userListSubject.pipe(
        take(1)
      ).subscribe((users) => {
        if (users) {
          const newUserList = [...users, newUser].sort((a, b) => a.id - b.id); // Припустимо, що користувачі мають поле id для сортування
          this.userListSubject.next(newUserList);
        }
      });
  }

  deleteUser(userId: number) {
    this.userListSubject.pipe(
      take(1)
    ).subscribe((users) => {
      if (users) {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
          const updatedUsers = [...users.slice(0, index), ...users.slice(index + 1)];
          this.userListSubject.next(updatedUsers);
        }
      }
    });
  }

  setErrorStatus(status: number, message: string) {
    this.errorSubject.next({ status, message })
  }
}
