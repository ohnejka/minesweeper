import { FC } from 'react';
import styled from 'styled-components';
import StyledGame from './components/Game';
import StyledSettings from './components/Settings';

const Home: FC = () => {
  return (
    <StyledDiv className='home'>
      <StyledSettings />
      <StyledGame />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding-top: 20px;
`;

export default Home;
