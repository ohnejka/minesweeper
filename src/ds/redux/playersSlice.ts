import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameLevels } from './gameSlice';

export type Player = {
  username: string;
  bestRounds: { [key in GameLevels]: number };
};

type PlayersState = {
  players: Player[];
};

const initialState: PlayersState = {
  players: [],
};

interface PlayerRound {
  readonly username: string;
  readonly time: number;
  readonly level: GameLevels;
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayer(state: PlayersState, action: PayloadAction<Player>) {
      console.log('add player', action.payload);
    },
    updatePlayerRound(state: PlayersState, action: PayloadAction<PlayerRound>) {
      console.log('update player roune', action.payload);

      //. check if new time is better
      // .. if yes, update
    },
  },
});

export const { addPlayer, updatePlayerRound } = playersSlice.actions;
export default playersSlice.reducer;
