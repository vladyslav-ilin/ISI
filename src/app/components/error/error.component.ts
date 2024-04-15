import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit, OnDestroy {
  public errorStatus?: number;
  public errorMessage?: string;
  private errorSub?: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.errorSub = this.userService.getErrorAction$.subscribe((data) => {
      console.log(data);
      if (data) {
        this.errorStatus = data.status;
        this.errorMessage = data.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }

}
