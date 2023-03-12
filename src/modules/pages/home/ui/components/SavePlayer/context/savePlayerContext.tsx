import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from 'react';
import { Control, useForm } from 'react-hook-form';

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

export const SavePlayerContext = createContext<SavePLayerContext>(
  {} as SavePLayerContext
);

export const SavePLayerContextProvider: FC<
  PropsWithChildren<{ time: number }>
> = ({ time, children }) => {
  const { register, handleSubmit, control } =
    useForm<SavePlayerContextStateForm>({
      defaultValues: {
        name: '',
      },
    });

  const onSubmit = handleSubmit((data: SavePlayerContextStateForm) => {
    console.log('on submit!');
    console.log();
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
  }, []);

  return (
    <SavePlayerContext.Provider value={value}>
      {children}
    </SavePlayerContext.Provider>
  );
};
