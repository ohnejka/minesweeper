import { FC } from 'react';
import { LeaderTable } from './components/LeaderTable';

const Leaderboard: FC = () => {
  return (
    <div className='leaderboard'>
      <LeaderTable />
    </div>
  );
};

export default Leaderboard;
