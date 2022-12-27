import { createReducer, on } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginFailure, LoginSuccess, Logout } from './auth.actions';

export interface State {
    token?: string ;
    username?: string;
    loginError?: string;
  }
  
  export const initialState: State = {
    token: null as any,
    username: null as any,
  };

  export const authReducer = createReducer(
    initialState,
    on(LoginSuccess.loginSuccess, (state, { loginSuccessResponse }) => loginSuccessResponse),on(Logout.logout,(state)=>{
      return{
        ...state,
        token:null as any,
        username:null as any
      }
    })
  );

  export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.username
);
 