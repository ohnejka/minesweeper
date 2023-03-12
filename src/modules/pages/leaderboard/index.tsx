import { FC, memo } from 'react';
import { withContext } from '../../global/react/WithContext';
import { DefaultLayout } from '../common/ui/DefaultLayout';
import { LeaderboardContextProvider } from './ui/context/leaderboardContext';
import Leaderboard from './ui/Leaderboard';

const LeaderboardPageInner: FC = () => {
  return DefaultLayout({ children: <Leaderboard /> });
};

export const LeaderboardPage = memo(
  withContext(LeaderboardContextProvider, memo(LeaderboardPageInner))
);

export default LeaderboardPage;
