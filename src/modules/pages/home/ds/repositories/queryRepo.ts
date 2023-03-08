import { useSelector } from 'react-redux';
import { RootState } from '../../../common/ds/store';

export class HomeQueryRepo {
  getLevelsOptions = () => {
    return useSelector((state: RootState) => state.game.levelOptionsNames);
  };

  getLevelSettings = () => {
    return useSelector((state: RootState) => state.game.levelOptions);
  };

  getCurrentLevel = () => {
    return useSelector((state: RootState) => state.game.level);
  };
}
