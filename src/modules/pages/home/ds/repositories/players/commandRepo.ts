import { GameLevels } from '../../../../common/bl/entities';
import { addPlayer } from '../../../../common/ds/redux/playersSlice';
import { AppDispatch } from '../../../../common/ds/store';

export class PlayersCommandRepo {
  constructor(private dispatch: AppDispatch) {}

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
