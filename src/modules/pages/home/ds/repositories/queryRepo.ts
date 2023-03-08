import { useSelector } from 'react-redux';
import { RootState } from '../../../common/ds/store';

export class HomeQueryRepo {
  getAllLevelsOptions = () => {
    return useSelector((state: RootState) => state.game.levelOptionsNames);
  };

  getCurrentLevel = () => {
    return useSelector((state: RootState) => state.game.level);
  };
}
