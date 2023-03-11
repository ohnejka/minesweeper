import { Dispatch } from 'react';
import { GameLevels } from '../../../common/bl/entities';
import {
  setCellIsOpen,
  setGameLevel as setGameLevelRedux,
  setIsAlive,
  setMatrix,
  setUserStatus,
  UserStatusCmd,
} from '../../../common/ds/redux/gameSlice';
import { GameMatrix } from '../../bl/entities';

export class HomeCommandRepo {
  constructor(private dispatch: Dispatch<any>) {}

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

  public setUserStatus = (cmd: UserStatusCmd): void => {
    const payload = setUserStatus(cmd);
    this.dispatch(payload);
  };
}
