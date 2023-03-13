import {
  createContext,
  FC,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector, useStore } from 'react-redux';
import { GameLevels, LevelOption } from '../../../common/bl/entities';
import { RootState } from '../../../common/ds/store';
import { GameMatrix } from '../../bl/entities';
import { GameUC } from '../../bl/gameUC';
import { GameCommandRepo } from '../../ds/repositories/game/commandRepo';
import { GameQueryRepo } from '../../ds/repositories/game/queryRepo';

export interface HomeContextState {
  readonly state: {
    readonly gameIsStarted: boolean;
    readonly levelOptions: ReadonlyArray<GameLevels>;
    readonly levelSettings: LevelOption;
    readonly currentLevel: GameLevels;
    readonly time: number;
    readonly isAlive: boolean;
    readonly matrix: GameMatrix;
    readonly restBombsQty: number;
    readonly isWin: boolean;
  };
  readonly fns: {
    readonly handleLevelOptionChange: (level: GameLevels) => void;
    readonly handleStartNewGame: () => void;
    readonly handleUpdateTimer: () => void;
    readonly onCellClick: (
      e: SyntheticEvent,
      rowIndex: number,
      colIndex: number
    ) => void;
    readonly onLongTouch: (rowIndex: number, colIndex: number) => void;
    readonly onPlayerAdded: () => void;
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
  const [startDate, setStartDate] = useState(0);

  const gameCommandRepo = useMemo(() => {
    return new GameCommandRepo(store.dispatch);
  }, [store]);

  const gameQueryRepo = useMemo(() => {
    return new GameQueryRepo(store);
  }, [store]);

  const gameUC = useMemo(() => {
    return new GameUC(gameCommandRepo, gameQueryRepo);
  }, [gameCommandRepo, gameQueryRepo]);

  // . init and update on level change
  const initGame = useCallback(() => {
    gameUC.initGame(levelSettings[currentLevel]);
    setGameIsStarted(false);
    setTime(0);
    setStartDate(Date.now());
  }, [currentLevel, levelSettings, gameUC]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const isWin = gameQueryRepo.getIsWin();

  const updateTimer = useCallback(() => {
    const delta = +((Date.now() - startDate) / 1000).toFixed();
    setTime(delta);
  }, [startDate]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isAlive || isWin) {
      return;
    }

    if (gameIsStarted) {
      intervalId = setInterval(() => updateTimer(), 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameIsStarted, isAlive, isWin, updateTimer]);

  const value: HomeContextState = {
    state: {
      time: timeInSeconds,
      gameIsStarted,
      levelOptions,
      levelSettings,
      currentLevel,
      matrix,
      isAlive,
      restBombsQty: gameQueryRepo.getFlaggedBombQty(),
      isWin,
    },
    fns: {
      handleLevelOptionChange: (level: GameLevels) => {
        gameUC.setGameLevel(level);
      },
      handleStartNewGame: () => {
        gameUC.initGame(levelSettings[currentLevel]);
        setGameIsStarted(true);
        setTime(0);
        setStartDate(Date.now());
      },
      handleUpdateTimer: () => {
        const delta = +((Date.now() - startDate) / 1000).toFixed();
        setTime(delta);
      },
      onCellClick: (e: SyntheticEvent, rowIndex: number, colIndex: number) => {
        gameUC.onCellClick(e, rowIndex, colIndex);
      },
      onLongTouch: (rowIndex: number, colIndex: number) => {
        gameUC.onLongTouch(rowIndex, colIndex);
      },
      onPlayerAdded: () => {
        gameUC.onPlayerAdded();
      },
    },
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
