import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import * as AuthActions from './auth.actions'
import { LoginUserDto } from 'src/app/model/login-user-dto';
/*
@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginRequest.loginRequest),
      exhaustMap((action) =>
        this.authService
          .login(new LoginUserDto(action.credentials.username, action.credentials.password ) )
          .pipe(
            map((loginSuccessResponse) =>
              AuthActions.LoginSuccess.loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.LoginFailure.loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LoginSuccess.loginSuccess),
        tap(({ loginSuccessResponse }) => {
         // this.router.navigateByUrl('/');
          alert(
            'Login Successful! ' +
              'Welcome, ' +
              loginSuccessResponse.username
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
*/