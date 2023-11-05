import { AnyAction } from 'redux';
import { GAME_ACTIONS } from './game.types';
import { GameData } from '../../types/game-data';

export type GameState = {
  game: GameData | null;
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
    default:
      return state;
  }
};
