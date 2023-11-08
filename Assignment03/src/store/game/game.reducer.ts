import { AnyAction } from 'redux';
import { GAME_ACTIONS } from './game.types';
import { GameDataWithToken } from '../../types/game-data';
import { getGame, getGames, startGame, updateGame } from './game.action';

export type GameState = {
  game: GameDataWithToken | null;
  loading?: boolean;
  error?: string;
};

const INITIAL_STATE: GameState = {
  game: null,
  loading: false,
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GAME_ACTIONS.START_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case startGame.pending.type:
      return {
        ...state,
        loading: true,
      };
    case startGame.fulfilled.type:
      return {
        ...state,
        loading: false,
        game: action.payload,
      };
    case startGame.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GAME_ACTIONS.UPDATE_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case updateGame.pending.type:
      return {
        ...state,
        loading: true,
      };
    case updateGame.fulfilled.type:
      return {
        ...state,
        loading: false,
        game: action.payload,
      };
    case updateGame.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GAME_ACTIONS.GET_GAME:
      return {
        ...state,
        game: action.payload,
      };
    case getGame.pending.type:
      return {
        ...state,
        loading: true,
      };
    case getGame.fulfilled.type:
      return {
        ...state,
        loading: false,
        game: action.payload,
      };
    case getGame.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GAME_ACTIONS.GET_GAMES:
      return {
        ...state,
        game: action.payload,
      };
    case getGames.pending.type:
      return {
        ...state,
        loading: true,
      };
    case getGames.fulfilled.type:
      return {
        ...state,
        loading: false,
        game: action.payload,
      };
    case getGames.rejected.type:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
