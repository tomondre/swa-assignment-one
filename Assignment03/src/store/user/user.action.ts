import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_ACTIONS } from './user.types';
import toast from 'react-hot-toast';

export const signUp = createAsyncThunk(
  USER_ACTIONS.SIGN_UP,
  async (user: UserData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:9090/users', user);
      console.log('Response for signUp: ', response);
      toast.success('Sign up successful!');
      return response.data;
    } catch (error) {
      toast.error('Sign up failed!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const login = createAsyncThunk(
  USER_ACTIONS.LOG_IN,
  async (user: UserData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:9090/login', user);
      console.log('Response for login: ', response);
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      toast.error('Login failed!');
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
      toast.success('Logout successful!');
      return response.data;
    } catch (error) {
      toast.error('Logout failed!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const getProfile = createAsyncThunk(
  USER_ACTIONS.GET_PROFILE,
  async (token: UserData, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:9090/users/${token.userId}?token=${token.token}`);
      console.log('Response for getProfile: ', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const updateProfile = createAsyncThunk(
  USER_ACTIONS.UPDATE_PROFILE,
  async (user: UserData, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:9090/users/${user.userId}?token=${user.token}`, user);
      console.log('Response for updateProfile: ', response);
      toast.success('Profile updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Profile update failed!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
