import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { gameReducer } from './game/game.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});
