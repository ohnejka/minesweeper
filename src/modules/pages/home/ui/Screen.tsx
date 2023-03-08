import { FC } from 'react';
import StyledGame from './components/Game';
import StyledSettings from './components/Settings';

const Screen: FC = () => {
  return (
    <div>
      <div>
        <StyledSettings />
        <StyledGame />
      </div>
    </div>
  );
};

export default Screen;
