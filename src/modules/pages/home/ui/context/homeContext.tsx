import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GameLevels } from '../../../common/bl/entities';
import { HomeCommandRepo } from '../../ds/repositories/commandRepo';
import { HomeQueryRepo } from '../../ds/repositories/queryRepo';

export interface HomeContextState {
  readonly state: {
    readonly gameIsStarted: boolean;
    readonly levelOptions: ReadonlyArray<GameLevels>;
    readonly currentLevel: GameLevels;
    readonly time: number;
  };
  readonly fns: {
    readonly handleLevelOptionChange: (level: GameLevels) => void;
    readonly handleStartNewGame: () => void;
    readonly handleUpdateTimer: () => void;
  };
}

export const HomeContext = createContext<HomeContextState>(
  {} as HomeContextState
);

export const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [timeInSeconds, setTime] = useState(0);

  const homeQueryRepo = useMemo(() => {
    return new HomeQueryRepo();
  }, []);

  const dispatch = useDispatch();

  const homeCommandRepo = useMemo(() => {
    return new HomeCommandRepo(dispatch);
  }, [dispatch]);

  const value: HomeContextState = {
    state: {
      time: timeInSeconds,
      gameIsStarted,
      levelOptions: homeQueryRepo.getAllLevelsOptions(),
      currentLevel: homeQueryRepo.getCurrentLevel(),
    },
    fns: {
      handleLevelOptionChange: (level: GameLevels) => {
        homeCommandRepo.setGameLevel(level);
        // . prepare bomb field
        setGameIsStarted(false);
        setTime(0);
      },
      handleStartNewGame: () => {
        // . prepare bomb field
        setGameIsStarted(true);
        setTime(0);
      },
      handleUpdateTimer: () => {
        const newTime = timeInSeconds + 1;
        setTime(newTime);
      },
    },
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
