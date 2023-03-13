import { GameLevels } from '../../../../common/bl/entities';
import {
  setCellArrayIsOpen,
  setCellIsOpen,
  setGameLevel as setGameLevelRedux,
  setIsAlive,
  setIsWin,
  setMatrix,
  setUserStatus,
  UserStatusCmd,
} from '../../../../common/ds/redux/gameSlice';
import { AppDispatch } from '../../../../common/ds/store';
import { GameMatrix } from '../../../bl/entities';

export class GameCommandRepo {
  constructor(private dispatch: AppDispatch) {}

  public setGameLevel = (level: GameLevels): void => {
    const payload = setGameLevelRedux(level);
    this.dispatch(payload);
  };

  public setIsAlive = (flag: boolean): void => {
    const payload = setIsAlive(flag);
    this.dispatch(payload);
  };

  public setMatrix = (matrix: GameMatrix): void => {
    const payload = setMatrix(matrix);
    this.dispatch(payload);
  };

  public openCell = (cellRow: number, cellCol: number): void => {
    const payload = setCellIsOpen({ cellRow, cellCol });
    this.dispatch(payload);
  };

  public openCellArray = (
    cellsArr: Array<{ cellRow: number; cellCol: number }>
  ): void => {
    const payload = setCellArrayIsOpen(cellsArr);
    this.dispatch(payload);
  };

  public setUserStatus = (cmd: UserStatusCmd): void => {
    const payload = setUserStatus(cmd);
    this.dispatch(payload);
  };

  public setIsWin = (status: boolean): void => {
    const payload = setIsWin(status);
    this.dispatch(payload);
  };
}
