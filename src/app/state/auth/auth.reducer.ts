import { state } from '@angular/animations';
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
    on(LoginSuccess.loginSuccess, (_state, { loginSuccessResponse }) => loginSuccessResponse)
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
  /*
  const _authReducer = createReducer(
    initialState,
    on(LoginSuccess.loginSuccess, (state, { loginSuccessResponse }) =>{
        return {
          ...state,
          token: loginSuccessResponse.token,
          username: loginSuccessResponse.username,
        };
      }),
      on(LoginFailure.loginFailure, (state, {error}) => {
        return {
          ...state,
          loginError: error,
          token: null as any,
          username: null as any,
        };
      }),on(Logout.logout, (state) => {
        return {
          ...state,
          token: null as any,
          username: null as any,
        };
      }));
  
      export function authReducer(state:any, action:any) {
        return _authReducer(state, action);
      }
      
      export const selectAuthState = createFeatureSelector<State>('auth');
      
      export const selectToken = createSelector(
        selectAuthState,
        (state) => state.token
      );
      export const selectUsername = createSelector(
        selectAuthState,
        (state) => state.username
      );

  /*
  const _authReducer = createReducer(
    initialState,
    on(LoginSuccess.loginSuccess, (_state, { loginSuccessResponse }) => {
        loginSuccessResponse;
    }),
    on(loginFailure, (state, { error }) => {
      return {
        ...state,
        loginError: error,
        token: null,
        user: null,
      };
    }),
    on(logout, (state) => {
      return {
        ...state,
        token: null,
        user: null,
      };
    })
  );
  
  export function authReducer(state, action) {
    return _authReducer(state, action);
  }
  
  export const selectAuthState = createFeatureSelector<State>('auth');
  
  export const selectToken = createSelector(
    selectAuthState,
    (state) => state.token
  );
  export const selectUser = createSelector(
    selectAuthState,
    (state) => state.username
  );
  */