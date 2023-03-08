import { Dispatch } from 'react';
import { GameLevels } from '../../../common/bl/entities';
import { setGameLevel as setGameLevelRedux } from '../../../common/ds/redux/gameSlice';
export class HomeCommandRepo {
  constructor(private dispatch: Dispatch<any>) {}

  public setGameLevel = (level: GameLevels): void => {
    const payload = setGameLevelRedux(level);

    this.dispatch(payload);
  };
}
