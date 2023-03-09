import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameLevels, LevelOption } from '../../bl/entities';
import { GameCell, GameMatrix } from '../../../home/bl/entities';

type GameState = {
  level: GameLevels;
  levelOptions: LevelOption;
  levelOptionsNames: GameLevels[];
  isAlive: boolean;
  matrix: GameCell[][];
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
  isAlive: true,
  matrix: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameLevel(state: GameState, action: PayloadAction<GameLevels>) {
      state.level = action.payload;
    },
    setIsAlive(state: GameState, action: PayloadAction<boolean>) {
      state.isAlive = action.payload;
    },
    setMatrix(state: GameState, action: PayloadAction<GameMatrix>) {
      state.matrix = action.payload;
    },
    setCellIsOpen(
      state: GameState,
      action: PayloadAction<{ cellRow: number; cellCol: number }>
    ) {
      const { cellRow, cellCol } = action.payload;
      state.matrix[cellRow][cellCol].isOpen = true;
    },
  },
});

export const { setGameLevel, setIsAlive, setMatrix, setCellIsOpen } =
  gameSlice.actions;
export default gameSlice.reducer;
