import { AnyAction, CombinedState, Store } from '@reduxjs/toolkit';
import { GameState } from '../../../common/ds/redux/gameSlice';
import { PlayersState } from '../../../common/ds/redux/playersSlice';

export class HomeQueryRepo {
  constructor(
    private store: Store<
      CombinedState<{ game: GameState; players: PlayersState }>,
      AnyAction
    >
  ) {}

  public getMatrix = () => {
    return this.store.getState().game.matrix;
  };
}
