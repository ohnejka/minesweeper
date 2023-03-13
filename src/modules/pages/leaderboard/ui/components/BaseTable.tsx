import { Player } from '../../../common/ds/redux/playersSlice';
import { FC } from 'react';
import { StyledBaseTable } from './styled';
import { Typography } from '@mui/material';
import { TimerBox } from '../../../home/ui/components/styled';
import {
  TimerFormat,
  formatSeconds,
} from '../../../../global/helpers/formatSeconds';
import { baseTheme } from '../../../../global/styles/theme';

type TableProps = {
  players: ReadonlyArray<Player>;
};

const BaseTable: FC<TableProps> = ({ players }) => {
  return (
    <StyledBaseTable className='table'>
      <ul className='table__row table__head'>
        <li className='table__item'>
          <Typography variant='caption' sx={{ fontFamily: 'monospace' }}>
            place
          </Typography>
        </li>
        <li className='table__item'>
          <Typography variant='caption' sx={{ fontFamily: 'monospace' }}>
            player
          </Typography>
        </li>

        <li className='table__item'>
          <Typography variant='caption' sx={{ fontFamily: 'monospace' }}>
            time
          </Typography>
        </li>
      </ul>

      <ul className='table__body'>
        {players.length > 0 &&
          players.map((player: Player, index: number) => {
            const formattedTime: TimerFormat = formatSeconds(
              player.timeInSeconds
            );

            return (
              <li key={player.id} className='table__body-item'>
                <ul className='table__row'>
                  <li className='table__item'>
                    <Typography
                      variant='body2'
                      sx={{ fontFamily: 'monospace' }}
                    >
                      {index + 1}
                    </Typography>
                  </li>
                  <li className='table__item'>
                    <Typography
                      variant='body2'
                      sx={{ fontFamily: 'monospace' }}
                    >
                      {player.username}
                    </Typography>
                  </li>

                  <li className='table__item'>
                    <TimerBox sx={{ color: baseTheme.layout.accent2 }}>
                      {formattedTime.withHours && (
                        <Typography
                          variant='body2'
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {formattedTime.h}h
                        </Typography>
                      )}
                      {formattedTime.withMinutes && (
                        <Typography
                          variant='body2'
                          sx={{ fontFamily: 'monospace' }}
                        >
                          {formattedTime.m}min
                        </Typography>
                      )}

                      <Typography
                        variant='body2'
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {formattedTime.s}s
                      </Typography>
                    </TimerBox>
                  </li>
                </ul>
              </li>
            );
          })}
        {players.length === 0 && (
          <Typography variant='body2' sx={{ fontFamily: 'monospace' }}>
            No leaders on this level yet...
          </Typography>
        )}
      </ul>
    </StyledBaseTable>
  );
};

export default BaseTable;
