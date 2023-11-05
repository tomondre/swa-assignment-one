import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GAME_ACTIONS } from './game.types';
import { GameDataWithToken } from '../../types/game-data';
import toast from 'react-hot-toast';

export const startGame = createAsyncThunk(
  GAME_ACTIONS.START_GAME,
  async (game: GameDataWithToken, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:9090/games?token=${game.token}`,
        game
      );
      console.log('Response for startGame: ', response);
      return response.data;
    } catch (error) {
      toast.error('Failed to start game!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
