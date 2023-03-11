import { Divider, Grid, Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  formatSeconds,
  TimerFormat,
} from '../../../../global/helpers/formatSeconds';
import { GameCell } from '../../bl/entities';
import { HomeContext, HomeContextState } from '../context/homeContext';
import { StyledCell, TimerBox } from './styled';
import clsx from 'clsx';

const Game: FC = () => {
  const homeContext: HomeContextState = useContext(HomeContext);
  const { state, fns } = homeContext;

  const { gameIsStarted, time, matrix } = state;
  const { handleUpdateTimer, onCellClick } = fns;

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
      <Grid item xs={6} style={{ display: 'flex', gap: '10px' }}>
        <TimerBox>
          <Typography variant='body1'>{formattedTime.h}</Typography>
          <Typography variant='body1'>:</Typography>
          <Typography variant='body1'>{formattedTime.m}</Typography>
          <Typography variant='body1'>:</Typography>
          <Typography variant='body1'>{formattedTime.s}</Typography>
        </TimerBox>
        <Divider orientation='vertical' flexItem />
        <Typography variant='body1'>10 bombs left</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        style={{ display: 'flex', flexDirection: 'column' }}
        className={clsx(!gameIsStarted && '--muted')}
      >
        {matrix.map((row: ReadonlyArray<GameCell>, rowIndex) => {
          return (
            <div style={{ display: 'flex' }} key={rowIndex}>
              {row.map((el: GameCell, elIndex) => {
                return (
                  <div
                    key={el.id}
                    onClick={() => onCellClick(rowIndex, elIndex)}
                  >
                    {!el.isBomb && (
                      <StyledCell
                        isOpen={el.isOpen}
                        bombsAround={el.bombsAround}
                      >
                        <span>{el.bombsAround}</span>
                      </StyledCell>
                    )}
                    {el.isBomb && (
                      <StyledCell
                        isOpen={el.isOpen}
                        bombsAround={el.bombsAround}
                      >
                        <span>💣</span>
                      </StyledCell>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

export const StyledGame = styled(Game)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledGame;
