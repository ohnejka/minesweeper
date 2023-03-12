import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameLevels } from '../../bl/entities';
import { v4 } from 'uuid';

export type Player = {
  readonly id: string;
  readonly username: string;
  readonly level: GameLevels;
  readonly timeInSeconds: number;
};

export type PlayersState = {
  players: Player[];
};

const initialState: PlayersState = {
  players: [],
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state: PlayersState, action: PayloadAction<Omit<Player, 'id'>>) {
      const { username, level, timeInSeconds } = action.payload;
      state.players.push({
        id: v4(),
        username,
        level,
        timeInSeconds,
      });
    },
  },
});

export const { addPlayer } = playersSlice.actions;
export default playersSlice.reducer;
