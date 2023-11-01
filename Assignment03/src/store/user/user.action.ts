import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_ACTIONS } from './user.types';
import { UserDataPatch, UserDataRequest } from '../../types/user-data';

export const signUp = createAsyncThunk(
  USER_ACTIONS.SIGN_UP,
  async (user: UserDataRequest, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:9090/users', user);
      console.log('Response for signUp: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const login = createAsyncThunk(
  USER_ACTIONS.LOG_IN,
  async (user: UserDataRequest, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:9090/login', user);
      console.log('Response for login: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const logout = createAsyncThunk(
  USER_ACTIONS.LOG_OUT,
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:9090/logout?token=${token}`);
      console.log('Response for logout: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const getProfile = createAsyncThunk(
  USER_ACTIONS.GET_PROFILE,
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:9090/users/${id}`);
      console.log('Response for getProfile: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const updateProfile = createAsyncThunk(
  USER_ACTIONS.UPDATE_PROFILE,
  async (user: UserDataPatch, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:9090/users/${user.id}`, user);
      console.log('Response for updateProfile: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
