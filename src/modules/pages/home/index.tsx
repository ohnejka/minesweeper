import { DefaultLayout } from '../common/ui/DefaultLayout';
import Home from './ui/Home';
import { FC, memo } from 'react';
import { HomeContextProvider } from './ui/context/homeContext';
import { withContext } from '../../global/react/WithContext';

const HomePageInner: FC = () => {
  return DefaultLayout({ children: <Home /> });
};

export const HomePage = memo(
  withContext(HomeContextProvider, memo(HomePageInner))
);
