import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./auth.reducer";
/*
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