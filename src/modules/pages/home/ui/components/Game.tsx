import { Box, Popover, Typography } from '@mui/material';
import {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  formatSeconds,
  TimerFormat,
} from '../../../../global/helpers/formatSeconds';
import { CellUserStatus, GameCell } from '../../bl/entities';
import { HomeContext, HomeContextState } from '../context/homeContext';
import {
  StyledCell,
  StyledDiv,
  StyledGameOverBanner,
  TimerBox,
  StyledTimerBox,
  BodyDiv,
  StyledGameBox,
} from './styled';
import clsx from 'clsx';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FlagIcon from '@mui/icons-material/Flag';
import { v4 } from 'uuid';
import { SavePlayer } from './SavePlayer/ui';

const Game: FC = () => {
  const homeContext: HomeContextState = useContext(HomeContext);
  const { state, fns } = homeContext;

  const {
    gameIsStarted,
    time,
    matrix,
    isAlive,
    restBombsQty,
    isWin,
    currentLevel,
  } = state;
  const { handleUpdateTimer, onCellClick, onPlayerAdded } = fns;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    let intervalId: any;

    if (!isAlive || isWin) {
      clearInterval(intervalId);
      return;
    }

    if (gameIsStarted) {
      intervalId = setInterval(() => handleUpdateTimer(), 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameIsStarted, handleUpdateTimer, time, isAlive, isWin]);

  const formattedTime: TimerFormat = formatSeconds(time);

  const baseForPopupRef = useRef(null);

  useEffect(() => {
    setAnchorEl(baseForPopupRef.current);
  }, []);

  const onWinPopoverClose = (e: SyntheticEvent, reason: string): void => {
    if (reason && reason === 'backdropClick') {
      return;
    }
  };

  const afterPlayerAdded = (): void => {
    onPlayerAdded();
    setAnchorEl(null);
  };

  return (
    <BodyDiv ref={baseForPopupRef} className='bodyBox'>
      <StyledTimerBox style={{ display: 'flex', gap: '10px' }}>
        <TimerBox className='time-box'>
          <Typography
            variant='subtitle1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            {formattedTime.h}
          </Typography>
          <Typography
            variant='subtitle1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            :
          </Typography>
          <Typography
            variant='subtitle1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            {formattedTime.m}
          </Typography>
          <Typography
            variant='subtitle1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            :
          </Typography>
          <Typography
            variant='subtitle1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            {formattedTime.s}
          </Typography>
        </TimerBox>

        <Typography
          variant='subtitle1'
          component='span'
          sx={{ fontFamily: 'monospace' }}
        >
          {restBombsQty} 💣
        </Typography>
      </StyledTimerBox>
      <Box sx={{ position: 'relative' }}>
        <StyledGameBox>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            className={clsx((!gameIsStarted || !isAlive) && '--muted')}
          >
            {matrix.map((row: ReadonlyArray<GameCell>, rowIndex) => {
              return (
                <div style={{ display: 'flex' }} key={rowIndex}>
                  {row.map((el: GameCell, elIndex) => {
                    return (
                      <div
                        key={el.id}
                        onClick={(e: SyntheticEvent) =>
                          onCellClick(e, rowIndex, elIndex)
                        }
                        onContextMenu={(e: SyntheticEvent) =>
                          onCellClick(e, rowIndex, elIndex)
                        }
                      >
                        <StyledCell
                          isOpen={el.isOpen}
                          bombsAround={el.bombsAround}
                          className={clsx(
                            !el.isOpen && '--closed',
                            !el.isOpen &&
                              el.status !== CellUserStatus.Untouched &&
                              '--user-attribute',
                            el.isOpen && '--open',
                            el.isOpen && el.isBomb && '--bombed',
                            el.isOpen && !el.isBomb && '--figure'
                          )}
                        >
                          {el.isOpen && el.isBomb && <span>💣</span>}
                          {el.isOpen && !el.isBomb && (
                            <span>{el.bombsAround}</span>
                          )}
                          {!el.isOpen &&
                            el.status === CellUserStatus.Untouched && (
                              <span>
                                <Typography variant='body1'>
                                  {el.bombsAround}
                                </Typography>
                              </span>
                            )}
                          {!el.isOpen && el.status === CellUserStatus.Flag && (
                            <span>
                              <FlagIcon sx={{ color: 'red' }} />
                            </span>
                          )}

                          {!el.isOpen &&
                            el.status === CellUserStatus.Question && (
                              <span>
                                <QuestionMarkIcon sx={{ color: 'blue' }} />
                              </span>
                            )}
                          {/* <div className={'hover-info'}>{JSON.stringify(el)}</div> */}
                        </StyledCell>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Box>
          {!isAlive && (
            <StyledGameOverBanner>
              <Typography
                variant='h4'
                component='span'
                sx={{ fontFamily: 'monospace' }}
              >
                {' '}
                You lost!{' '}
              </Typography>
            </StyledGameOverBanner>
          )}
        </StyledGameBox>
      </Box>

      {anchorEl && isWin && (
        <Popover
          id={v4()}
          open={isWin}
          anchorEl={anchorEl}
          onClose={onWinPopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <StyledDiv>
            <SavePlayer
              time={time}
              level={currentLevel}
              onAfterPlayerAdded={afterPlayerAdded}
            />
          </StyledDiv>
        </Popover>
      )}
    </BodyDiv>
  );
};

export const StyledGame = styled(Game)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledGame;
