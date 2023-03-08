import { Box, Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  formatSeconds,
  TimerFormat,
} from '../../../../global/helpers/formatSeconds';
import { GameCell } from '../../bl/entities';
import { HomeContext, HomeContextState } from '../context/homeContext';

const Game: FC = () => {
  const homeContext: HomeContextState = useContext(HomeContext);
  const { state, fns } = homeContext;

  const { gameIsStarted, time, currentLevel } = state;
  const { handleUpdateTimer, initBoard } = fns;

  useEffect(() => {
    const drawBoard = (
      matrix: ReadonlyArray<ReadonlyArray<GameCell>>
    ): void => {};

    const gameSettings = initBoard();
    drawBoard(gameSettings);
  }, [currentLevel, initBoard]);

  useEffect(() => {
    let intervalId: any;

    if (gameIsStarted) {
      intervalId = setInterval(() => handleUpdateTimer(), 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameIsStarted, handleUpdateTimer, time]);

  const formattedTime: TimerFormat = formatSeconds(time);

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      spacing={2}
      marginTop={2}
    >
      <Grid item xs={6}>
        <TimerBox>
          <Typography variant='body1'>{formattedTime.h}</Typography>
          <Typography variant='body1'>:</Typography>
          <Typography variant='body1'>{formattedTime.m}</Typography>
          <Typography variant='body1'>:</Typography>
          <Typography variant='body1'>{formattedTime.s}</Typography>
        </TimerBox>
        <Box> 10 bombs left</Box>
      </Grid>
      <Grid item xs={6}>
        <div>field</div>
      </Grid>
    </Grid>
  );
};

const TimerBox = styled(Box)`
  display: flex;
`;

const StyledGame = styled(Game)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledGame;
