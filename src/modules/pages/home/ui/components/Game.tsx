import { Box, Popover, Typography } from '@mui/material';
import {
  FC,
  memo,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { HomeContext, HomeContextState } from '../context/homeContext';
import {
  StyledDiv,
  StyledGameOverBanner,
  BodyDiv,
  StyledGameBox,
  StyledTimerBox,
} from './styled';
import { v4 } from 'uuid';
import { SavePlayer } from './SavePlayer/ui';
import { GameLevels } from '../../../common/bl/entities';
import Timer from './Timer';
import Board from './Board';

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
  const { onCellClick, onLongTouch, onPlayerAdded } = fns;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
      <StyledTimerBox>
        <Timer time={time} />
        <Typography
          variant='subtitle1'
          component='span'
          sx={{ fontFamily: 'monospace' }}
        >
          {restBombsQty} 💣
        </Typography>
      </StyledTimerBox>

      <Box sx={{ position: 'relative' }}>
        <StyledGameBox
          isEasyLevel={currentLevel === GameLevels.Easy}
          isMediumLevel={currentLevel === GameLevels.Medium}
          isHardLevel={currentLevel === GameLevels.Hard}
        >
          <Board
            gameIsStarted={gameIsStarted}
            isAlive={isAlive}
            matrix={matrix}
            onCellClick={onCellClick}
            onLongTouch={onLongTouch}
          />
          {!isAlive && (
            <StyledGameOverBanner>
              <Typography
                variant='h4'
                component='span'
                sx={{ fontFamily: 'monospace' }}
              >
                YOU LOST
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
            vertical: 'bottom',
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

export default memo(StyledGame);
