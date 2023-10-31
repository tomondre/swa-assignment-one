import { AnyAction } from 'redux';
import { USER_ACTIONS } from './user.types';
import { UserDataResponse } from '../../types/user-data';
import { signUp } from './user.action';

export type UserState = {
  currentUser: UserDataResponse | null;
  loading?: boolean;
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
    default:
      return state;
  }
};
