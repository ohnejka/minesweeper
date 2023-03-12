import { FC } from 'react';
import StyledGame from './components/Game';
import StyledSettings from './components/Settings';

const Home: FC = () => {
  return (
    <div className='home'>
      <StyledSettings />
      <StyledGame />
    </div>
  );
};

export default Home;
