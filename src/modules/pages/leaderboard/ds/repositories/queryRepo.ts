import { Store, CombinedState, AnyAction } from '@reduxjs/toolkit';
import { LevelOption } from '../../../common/bl/entities';
import { GameState } from '../../../common/ds/redux/gameSlice';
import { Player, PlayersState } from '../../../common/ds/redux/playersSlice';

export class LeaderboardQueryRepo {
  constructor(
    private store: Store<
      CombinedState<{ game: GameState; players: PlayersState }>,
      AnyAction
    >
  ) {}

  public getLevelSettings = (): LevelOption => {
    return this.store.getState().game.levelOptions;
  };

  public getPlayers = (): ReadonlyArray<Player> => {
    return this.store.getState().players.players;
  };
}
