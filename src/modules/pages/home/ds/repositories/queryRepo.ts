import { AnyAction, CombinedState, Store } from '@reduxjs/toolkit';
import { GameState } from '../../../common/ds/redux/gameSlice';
import { PlayersState } from '../../../common/ds/redux/playersSlice';
import { CellUserStatus } from '../../bl/entities';

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

  public getIsAlive = () => {
    return this.store.getState().game.isAlive;
  };

  public getBombCells = () => {
    const allCells = this.store.getState().game.matrix.flat();
    const bombCells = allCells.filter((c) => c.isBomb);

    return bombCells;
  };

  public getFlaggedBombQty = () => {
    const allCells = this.store.getState().game.matrix.flat();

    const bombQty = allCells.filter((c) => c.isBomb).length;
    const flaggedQty = allCells.filter(
      (c) => c.status === CellUserStatus.Flag
    ).length;

    return bombQty - flaggedQty;
  };
}
