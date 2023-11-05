import { RootState } from '../store';
import { GameState } from './game.reducer';

export const selectGameReducer = (state: RootState): GameState => state.game;
