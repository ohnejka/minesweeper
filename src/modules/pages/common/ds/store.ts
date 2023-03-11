import { configureStore, combineReducers } from '@reduxjs/toolkit';

import gameReducer from './redux/gameSlice';
import playersReducer from './redux/playersSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  players: playersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
