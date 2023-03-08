import { DefaultLayout } from '../common/ui/DefaultLayout';
import Screen from './ui/Screen';
import { FC, memo } from 'react';
import { HomeContextProvider } from './ui/context/homeContext';
import { withContext } from '../../global/react/WithContext';

const HomePageInner: FC = () => {
  return DefaultLayout({ children: <Screen /> });
};

export const HomePage = memo(
  withContext(HomeContextProvider, memo(HomePageInner))
);
