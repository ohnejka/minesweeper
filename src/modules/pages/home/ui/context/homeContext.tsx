import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GameLevels } from '../../../common/bl/entities';
import { HomeCommandRepo } from '../../ds/repositories/commandRepo';
import { HomeQueryRepo } from '../../ds/repositories/queryRepo';

export interface HomeContextState {
  readonly state: {
    readonly username: string;
    readonly gameIsStarted: boolean;
    readonly gameIsPaused: boolean;
    readonly levelOptions: ReadonlyArray<GameLevels>;
    readonly currentLevel: GameLevels;
  };
  readonly fns: {
    readonly handleLevelOptionChange: (level: GameLevels) => void;
    readonly handleUsernameChange: (name: string) => void;
    readonly handleStartNewGame: () => void;
    readonly handleResetGame: () => void;
    readonly handleTogglePauseGame: () => void;
  };
}

export const HomeContext = createContext<HomeContextState>(
  {} as HomeContextState
);

export const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [gameIsPaused, setGameIsPaused] = useState(false);

  const homeQueryRepo = useMemo(() => {
    return new HomeQueryRepo();
  }, []);

  const dispatch = useDispatch();

  const homeCommandRepo = useMemo(() => {
    return new HomeCommandRepo(dispatch);
  }, [dispatch]);

  const value: HomeContextState = {
    state: {
      username,
      gameIsStarted,
      gameIsPaused,
      levelOptions: homeQueryRepo.getAllLevelsOptions(),
      currentLevel: homeQueryRepo.getCurrentLevel(),
    },
    fns: {
      handleLevelOptionChange: (level: GameLevels) => {
        homeCommandRepo.setGameLevel(level);
      },
      handleUsernameChange: (name: string) => {
        setUsername(name.trim());
      },
      handleStartNewGame: () => {
        setGameIsStarted(true);
        setGameIsPaused(false);
        //     // . set timer for user
        //     // . unblock game field
      },
      handleResetGame: () => {
        setGameIsStarted(false);
        setGameIsPaused(false);
        //     // .  block and reset game field
        //     // . stop and reset timer
      },
      handleTogglePauseGame: () => {
        setGameIsPaused(!gameIsPaused);
        //     // . stop timer
        //     // . block game field
      },
    },
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
