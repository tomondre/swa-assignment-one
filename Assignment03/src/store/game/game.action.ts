import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GAME_ACTIONS } from './game.types';
import { GameData, GameDataWithToken } from '../../types/game-data';
import toast from 'react-hot-toast';

export const startGame = createAsyncThunk(
  GAME_ACTIONS.START_GAME,
  async (game: GameDataWithToken, thunkAPI) => {
    try {
      const newGameData: GameData = {
        id: game.id,
        user: game.user,
        score: game.score,
        completed: game.completed,
        board: game.board,
        numberOfMoves: game.numberOfMoves,
      };
      const response = await axios.post(
        `http://localhost:9090/games?token=${game.token}`,
        newGameData
      );
      console.log('Response for startGame: ', response);
      return response.data;
    } catch (error) {
      toast.error('Failed to start game!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const updateGame = createAsyncThunk(
  GAME_ACTIONS.UPDATE_GAME,
  async (game: GameDataWithToken, thunkAPI) => {
    try {
      const newGameData: GameData = {
        id: game.id,
        user: game.user,
        score: game.score,
        completed: game.completed,
        board: game.board,
        numberOfMoves: game.numberOfMoves,
      };
      const response = await axios.patch(
        `http://localhost:9090/games/${game.id}?token=${game.token}`,
        newGameData
      );
      console.log(
        'Response for updateGame: ',
        JSON.parse(response.config.data)
      );
      const gameData: GameData = JSON.parse(response.config.data);
      return gameData;
    } catch (error) {
      toast.error('Failed to update game!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const getGame = createAsyncThunk(
  GAME_ACTIONS.GET_GAME,
  async (game: GameDataWithToken, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/games/${game.id}?token=${game.token}`
      );
      console.log('Response for getGame: ', response);
      return response.data;
    } catch (error) {
      toast.error('Failed to get game!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);

export const getGames = createAsyncThunk(
  GAME_ACTIONS.GET_GAMES,
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/games/?token=${token}`
      );
      console.log('Response for getGames: ', response);
      return response.data;
    } catch (error) {
      toast.error('Failed to get games!');
      return thunkAPI.rejectWithValue({ error: (error as Error).message });
    }
  }
);
