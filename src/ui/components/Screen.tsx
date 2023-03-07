import { FC } from 'react';
import styled from 'styled-components';
import StyledSettings from './Settings';

const StyledAside = styled.aside`
  display: flex;
`;

const Screen: FC = () => {
  return (
    <div>
      <h1>Bomber Game</h1>
      <div>
        <StyledSettings />
      </div>

      <StyledAside></StyledAside>
    </div>
  );
};

export default Screen;
