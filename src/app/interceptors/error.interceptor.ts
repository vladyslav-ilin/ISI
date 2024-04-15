import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, Subject, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(private userService: UserService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          errorMessage = `Backend returned code ${error.status}: ${error.statusText}`;
        }

        this.userService.setErrorStatus(error.status, error.statusText);
        this.router.navigateByUrl('/error');

        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
