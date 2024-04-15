import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  isOpen: boolean = false;
  mode?: 'create' | 'edit';

  users$ = this.userService.users$

  getUserTitle$ = this.userService.getUserTitle$
    .pipe();

  selectedUser$ = this.userService.selectedUser$;

  constructor(private userService: UserService) {
    this.userService.getUsersList();
  }

  onSelected(userId: number) {
    this.mode = 'edit'
    this.isOpen = true;
    this.userService.selectedUserChanged(userId);
  }

  onClose() {
    this.userService.selectedUserChanged(0);
    this.isOpen = false;
  }
  createUser() {
    this.mode = 'create'
    this.isOpen = true;
  }

}
