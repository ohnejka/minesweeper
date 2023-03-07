import { DefaultLayout } from '../common/ui/DefaultLayout';
import Screen from './ui/Screen';
import { FC } from 'react';

export const HomePage: FC = () => {
  return DefaultLayout({ children: <Screen /> });
};
