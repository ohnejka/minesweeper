import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, memo, SyntheticEvent } from 'react';
import { GameCell, CellUserStatus } from '../../bl/entities';
import { StyledCell } from './styled';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FlagIcon from '@mui/icons-material/Flag';

type BoardProps = {
  readonly gameIsStarted: boolean;
  readonly isAlive: boolean;
  readonly matrix: GameCell[][];
  readonly onCellClick: (
    e: SyntheticEvent,
    rowIndex: number,
    elIndex: number
  ) => void;
};

export const Board: FC<BoardProps> = ({
  gameIsStarted,
  isAlive,
  matrix,
  onCellClick,
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className={clsx((!gameIsStarted || !isAlive) && '--muted')}
    >
      {matrix.map((row: ReadonlyArray<GameCell>, rowIndex: number) => {
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
                    {el.isOpen && !el.isBomb && <span>{el.bombsAround}</span>}
                    {!el.isOpen && el.status === CellUserStatus.Untouched && (
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

                    {!el.isOpen && el.status === CellUserStatus.Question && (
                      <span>
                        <QuestionMarkIcon sx={{ color: 'blue' }} />
                      </span>
                    )}
                  </StyledCell>
                </div>
              );
            })}
          </div>
        );
      })}
    </Box>
  );
};

export default memo(Board);
