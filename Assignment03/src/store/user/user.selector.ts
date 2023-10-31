import { RootState } from '../store';
import { UserState } from './user.reducer';

export const selectUserReducer = (state: RootState): UserState => state.user;
