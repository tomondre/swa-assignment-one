import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// import {
//   createAction,
//   ActionWithPayload,
//   withMatcher,
// } from '../../utils/reducer/reducer.utils';
import { USER_ACTIONS } from './user.types';
import { UserDataRequest } from '../../types/user-data';

// type SignUp = ActionWithPayload<USER_ACTIONS.SIGN_UP, UserDataRequest>;

// export const signUp = withMatcher(
//   (user: UserDataRequest): SignUp => createAction(USER_ACTIONS.SIGN_UP, user)
// );

export const signUp = createAsyncThunk(
  USER_ACTIONS.SIGN_UP,
  async (user: UserDataRequest, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:9090/users', user);
      console.log('Response in THUNK: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
