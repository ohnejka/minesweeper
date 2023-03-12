import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameLevels, LevelOption } from '../../bl/entities';
import {
  CellUserStatus,
  GameCell,
  GameMatrix,
} from '../../../home/bl/entities';

export type GameState = {
  level: GameLevels;
  levelOptions: LevelOption;
  levelOptionsNames: GameLevels[];
  isAlive: boolean;
  matrix: GameCell[][];
  bombCells: ReadonlyArray<GameCell>;
  isWin: boolean;
};

export type UserStatusCmd = {
  row: number;
  col: number;
  status: CellUserStatus;
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
  isWin: false,
  matrix: [],
  bombCells: [],
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
      state.matrix[cellRow][cellCol].status = CellUserStatus.Untouched;
    },
    setCellArrayIsOpen(
      state: GameState,
      action: PayloadAction<Array<{ cellRow: number; cellCol: number }>>
    ) {
      const cellsArr = action.payload;

      cellsArr.forEach((c) => {
        state.matrix[c.cellRow][c.cellCol].isOpen = true;
      });
    },
    setUserStatus(state: GameState, action: PayloadAction<UserStatusCmd>) {
      const { row, col, status } = action.payload;
      state.matrix[row][col].status = status;
    },
    setIsWin(state: GameState, action: PayloadAction<boolean>) {
      state.isWin = action.payload;
    },
  },
});

export const {
  setGameLevel,
  setIsAlive,
  setMatrix,
  setCellIsOpen,
  setCellArrayIsOpen,
  setUserStatus,
  setIsWin,
} = gameSlice.actions;
export default gameSlice.reducer;
