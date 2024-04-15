import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {UserService} from "../../services/user.service";
import {combineLatest, Subject, takeUntil} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../../dtos/user";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCardComponent implements OnDestroy, OnInit, OnChanges {
  @Input() mode?: 'create' | 'edit';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  public userForm: FormGroup;

  selectedUser$ = this.userService.selectedUser$;

  userType$ = this.userService.getUserType$
    .pipe();

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      id: new FormControl(this.generateUniqueId())
    }, {
      validators: this.passwordValidator
    })
  }

  onDestroy = new Subject();

  ngOnInit() {
    if (this.mode === 'edit') {
      combineLatest([
        this.selectedUser$,
        this.userType$
      ]).pipe(
        takeUntil(this.onDestroy)
      ).subscribe(([user, userType]) => {
            if (user && userType) {
              this.userForm.reset({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                repeatPassword: user.password,
                type: user.type,
                id: user.id,
              });
            }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode']) {
      this.userForm.reset();
    }

    if (changes['mode'].currentValue === 'edit') {
      combineLatest([
        this.selectedUser$,
        this.userType$
      ]).pipe(
        takeUntil(this.onDestroy)
      ).subscribe(([user, userType]) => {
        if (user && userType) {
          this.userForm.reset({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            repeatPassword: user.password,
            type: user.type,
            id: user.id,
          });
        }
      });
    }
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
  }

  generateUniqueId(): string {
    const timestamp = Date.now().toString(16); // Текущий час у шістнадцятковому форматі
    const randomString = Math.random().toString(16).substr(2); // Випадковий рядок
    return timestamp + randomString; // Повертаємо поєднання часу та випадкового рядка
  }

  passwordValidator(control: AbstractControl) {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(!!password?.value && !!repeatPassword?.value && password?.value === repeatPassword?.value
      && password.value.length >= 8 && repeatPassword.value.length >= 8
      && passwordPattern.test(password.value) && passwordPattern.test(repeatPassword.value)) {
      password?.setErrors(null);
      repeatPassword?.setErrors(null);
      return null;
    }

    password?.setErrors({ mismatch: true });
    repeatPassword?.setErrors({ mismatch: true });

    if (!!password?.value && password.value.length < 8 && !!repeatPassword?.value && repeatPassword.value.length < 8
      && !passwordPattern.test(password.value) && !passwordPattern.test(repeatPassword.value)) {
      password.setErrors({ mismatch: true });
    }

    return { mismatch: true }
  }

  createUser(newUser?: IUser) {
    this.userService.createUser(newUser);
    this.onClose.emit();
  }

  saveUser(user: IUser) {
    this.userService.updateUser(user);
    this.onClose.emit();
  }

  deleteUser(userId: number) {
    this.onClose.emit();
    this.userService.deleteUser(+userId);
  }
}
