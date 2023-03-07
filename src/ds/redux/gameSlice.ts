import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum GameLevels {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

type GameState = {
  level: GameLevels;
  levelOptions: {
    [key in GameLevels]: { width: number; height: number; minesQty: number };
  };
  levelOptionsNames: GameLevels[];
};

const initialState: GameState = {
  level: GameLevels.Easy,
  levelOptions: {
    [GameLevels.Easy]: {
      width: 8,
      height: 8,
      minesQty: 10,
    },
    [GameLevels.Medium]: {
      width: 16,
      height: 16,
      minesQty: 40,
    },
    [GameLevels.Hard]: {
      width: 32,
      height: 16,
      minesQty: 100,
    },
  },
  levelOptionsNames: [GameLevels.Easy, GameLevels.Medium, GameLevels.Hard],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameLevel(state: GameState, action: PayloadAction<GameLevels>) {
      state.level = action.payload;
    },
  },
});

export const { setGameLevel } = gameSlice.actions;
export default gameSlice.reducer;
