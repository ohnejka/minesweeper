import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector, useStore } from 'react-redux';
import { GameLevels, LevelOption } from '../../../common/bl/entities';
import { RootState } from '../../../common/ds/store';
import { GameMatrix } from '../../bl/entities';
import { GameUC } from '../../bl/gameUC';
import { HomeCommandRepo } from '../../ds/repositories/commandRepo';

export interface HomeContextState {
  readonly state: {
    readonly gameIsStarted: boolean;
    readonly levelOptions: ReadonlyArray<GameLevels>;
    readonly levelSettings: LevelOption;
    readonly currentLevel: GameLevels;
    readonly time: number;
    readonly isAlive: boolean;
    readonly matrix: GameMatrix;
  };
  readonly fns: {
    readonly handleLevelOptionChange: (level: GameLevels) => void;
    readonly handleStartNewGame: () => void;
    readonly handleUpdateTimer: () => void;
    readonly onCellClick: (rowIndex: number, colIndex: number) => void;
  };
}

export const HomeContext = createContext<HomeContextState>(
  {} as HomeContextState
);

export const HomeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useStore<RootState>();

  const isAlive = useSelector((state: RootState) => state.game.isAlive);
  const currentLevel = useSelector((state: RootState) => state.game.level);
  const matrix = useSelector((state: RootState) => state.game.matrix);

  const levelSettings = useMemo(
    () => store.getState().game.levelOptions,
    [store]
  );
  const levelOptions = useMemo(
    () => store.getState().game.levelOptionsNames,
    [store]
  );

  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [timeInSeconds, setTime] = useState(0);

  const homeCommandRepo = useMemo(() => {
    return new HomeCommandRepo(store.dispatch);
  }, [store]);

  const gameUC = useMemo(() => {
    return new GameUC(homeCommandRepo);
  }, [homeCommandRepo]);

  // . init gameboard
  useEffect(() => {
    gameUC.initGame(levelSettings[currentLevel]);
  }, []);

  // when level changes, update board and start
  useEffect(() => {
    gameUC.initGame(levelSettings[currentLevel]);
    setGameIsStarted(false);
    setTime(0);
  }, [gameUC, levelSettings, currentLevel]);

  const value: HomeContextState = {
    state: {
      time: timeInSeconds,
      gameIsStarted,
      levelOptions,
      levelSettings,
      currentLevel,
      matrix,
      isAlive,
    },
    fns: {
      handleLevelOptionChange: (level: GameLevels) => {
        homeCommandRepo.setGameLevel(level);
      },
      handleStartNewGame: () => {
        gameUC.initGame(levelSettings[currentLevel]);
        setGameIsStarted(true);
        setTime(0);
      },
      handleUpdateTimer: () => {
        const newTime = timeInSeconds + 1;
        setTime(newTime);
      },
      onCellClick: (rowIndex: number, colIndex: number) => {
        gameUC.onCellClick(rowIndex, colIndex);
      },
    },
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
