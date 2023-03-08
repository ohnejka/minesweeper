import { FC } from 'react';
import StyledGame from './components/Game';
import StyledSettings from './components/Settings';
import GlobalStyles from '../../../global/styles/global';

const Screen: FC = () => {
  return (
    <div>
      <div>
        <StyledSettings />
        <StyledGame />
        <GlobalStyles />
      </div>
    </div>
  );
};

export default Screen;
