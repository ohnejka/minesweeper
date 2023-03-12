import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { useStore } from 'react-redux';
import { LevelOption } from '../../../common/bl/entities';
import { Player } from '../../../common/ds/redux/playersSlice';
import { RootState } from '../../../common/ds/store';
import { LeaderboardQueryRepo } from '../../ds/repositories/queryRepo';

export interface LeaderboardContextState {
  readonly state: {
    readonly players: ReadonlyArray<Player>;
    readonly levelSettings: LevelOption;
  };
}

export const LeaderboardContext = createContext<LeaderboardContextState>(
  {} as LeaderboardContextState
);

export const LeaderboardContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const store = useStore<RootState>();

  const queryRepo = useMemo(() => {
    return new LeaderboardQueryRepo(store);
  }, [store]);

  const levelSettings = useMemo(() => {
    return queryRepo.getLevelSettings();
  }, [queryRepo]);

  const players = useMemo(() => {
    return queryRepo.getPlayers();
  }, [queryRepo]);

  const value = {
    state: {
      levelSettings,
      players,
    },
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};
