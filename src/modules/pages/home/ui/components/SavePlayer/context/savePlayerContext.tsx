import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';
import { Control, useForm } from 'react-hook-form';
import { useStore } from 'react-redux';
import { GameLevels } from '../../../../../common/bl/entities';
import { RootState } from '../../../../../common/ds/store';
import { PlayersCommandRepo } from '../../../../ds/repositories/players/commandRepo';

export type SavePlayerContextStateForm = {
  name: string;
};

export type SavePLayerContext = {
  state: {
    control: Control<SavePlayerContextStateForm>;
    time: number;
  };
  fns: {
    onSubmit: () => void;
  };
};

type SavePlayerContextProviderProps = {
  time: number;
  level: GameLevels;
  onAfterPlayerAdded: () => void;
};

export const SavePlayerContext = createContext<SavePLayerContext>(
  {} as SavePLayerContext
);

export const SavePlayerContextProvider: FC<
  PropsWithChildren<SavePlayerContextProviderProps>
> = ({ time, level, onAfterPlayerAdded, children }) => {
  const store = useStore<RootState>();

  const { register, handleSubmit, control } =
    useForm<SavePlayerContextStateForm>({
      defaultValues: {
        name: '',
      },
    });

  const onSubmit = handleSubmit((data: SavePlayerContextStateForm) => {
    playersCommandRepo.addNewPlayer(data.name, time, level);
    onAfterPlayerAdded();
  });

  useEffect(() => {
    register('name', {
      required: {
        value: true,
        message: 'Name is required',
      },
      validate: (value) => value && value.trim().length > 0,
    });
  }, [register]);

  const playersCommandRepo = useMemo(() => {
    return new PlayersCommandRepo(store.dispatch);
  }, [store]);

  const value = useMemo(() => {
    return {
      state: {
        control,
        time,
      },
      fns: {
        onSubmit,
      },
    };
  }, [control, time, onSubmit]);

  return (
    <SavePlayerContext.Provider value={value}>
      {children}
    </SavePlayerContext.Provider>
  );
};
