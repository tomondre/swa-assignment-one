import { AnyAction } from 'redux';
import { USER_ACTIONS } from './user.types';
import { UserData } from '../../types/user-data';
import { login, logout, signUp } from './user.action';

export type UserState = {
  currentUser: UserData | null;
  loading?: boolean;
  error?: string;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  loading: false,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case USER_ACTIONS.SIGN_UP:
      return {
        ...state,
        currentUser: action.payload,
      };
    case signUp.pending.type:
      return {
        ...state,
        loading: true,
      };
    case signUp.fulfilled.type:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case signUp.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case USER_ACTIONS.LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case login.pending.type:
      return {
        ...state,
        loading: true,
      };
    case login.fulfilled.type:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case login.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case USER_ACTIONS.LOG_OUT:
      return {
        ...state,
        currentUser: action.payload,
      };
    case logout.pending.type:
      return {
        ...state,
        loading: true,
      };
    case logout.fulfilled.type:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };
    case logout.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
