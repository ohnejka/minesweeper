import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GameLevels, LevelOption } from '../../../common/bl/entities';
import { GameCell } from '../../bl/entities';
import { GameUC } from '../../bl/gameUC';
import { HomeCommandRepo } from '../../ds/repositories/commandRepo';
import { HomeQueryRepo } from '../../ds/repositories/queryRepo';

export interface HomeContextState {
  readonly state: {
    readonly gameIsStarted: boolean;
    readonly levelOptions: ReadonlyArray<GameLevels>;
    readonly levelSettings: LevelOption;
    readonly currentLevel: GameLevels;
    readonly time: number;
  };
  readonly fns: {
    readonly handleLevelOptionChange: (level: GameLevels) => void;
    readonly handleStartNewGame: () => void;
    readonly handleUpdateTimer: () => void;
    readonly initBoard: () => ReadonlyArray<ReadonlyArray<GameCell>>;
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

  // . @TODO use memo or something
  const levelSettings = homeQueryRepo.getLevelSettings();
  const currentLevel = homeQueryRepo.getCurrentLevel();
  const levelOptions = homeQueryRepo.getLevelsOptions();

  const gameUC = useMemo(() => {
    return new GameUC(levelSettings, currentLevel);
  }, [levelSettings, currentLevel]);

  const value: HomeContextState = {
    state: {
      time: timeInSeconds,
      gameIsStarted,
      levelOptions,
      levelSettings,
      currentLevel,
    },
    fns: {
      handleLevelOptionChange: (level: GameLevels) => {
        homeCommandRepo.setGameLevel(level);
        gameUC.initGame();
        setGameIsStarted(false);
        setTime(0);
      },
      handleStartNewGame: () => {
        gameUC.initGame();
        setGameIsStarted(true);
        setTime(0);
      },
      handleUpdateTimer: () => {
        const newTime = timeInSeconds + 1;
        setTime(newTime);
      },
      initBoard: () => gameUC.initGame(),
    },
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
