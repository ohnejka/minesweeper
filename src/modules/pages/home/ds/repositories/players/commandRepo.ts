import { Dispatch } from 'react';
import { GameLevels } from '../../../../common/bl/entities';
import { addPlayer } from '../../../../common/ds/redux/playersSlice';

export class PlayersCommandRepo {
  constructor(private dispatch: Dispatch<any>) {}

  public addNewPlayer = (
    username: string,
    timeInSeconds: number,
    level: GameLevels
  ): void => {
    const payload = addPlayer({
      username,
      timeInSeconds,
      level,
    });
    this.dispatch(payload);
  };
}
