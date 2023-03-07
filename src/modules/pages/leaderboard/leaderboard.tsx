import { FC } from 'react';
import { DefaultLayout } from '../common/ui/DefaultLayout';
import Leaderboard from './ui/Leaderboard';

const LeaderboardPage: FC = () => {
  return DefaultLayout({ children: <Leaderboard /> });
};

export default LeaderboardPage;
