
import { createActionGroup, props } from '@ngrx/store';
import { LoginResponse } from 'src/app/model/loginResponse';

export const LoginRequest = createActionGroup({
  source: 'Auth',
  events: {
    'Login Request': props<{ credentials: { username: string, password: string }  }>()
  },
});

export const LoginSuccess = createActionGroup({
  source: 'Auth',
  events: {
    'Login Success': props<{ loginSuccessResponse: LoginResponse }>()
  },
});
export const LoginFailure = createActionGroup({
  source: 'Auth',
  events: {
    'Login Failure': props<{ error: string}>()
  },
});
export const Logout = createActionGroup({
  source: 'Auth',
  events: {
    'Logout': props<any|null>},
});
