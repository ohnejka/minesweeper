import { FC } from 'react';
import StyledGame from './components/Game';
import StyledSettings from './components/Settings';

const Home: FC = () => {
  return (
    <div>
      <StyledSettings />
      <StyledGame />
    </div>
  );
};

export default Home;
