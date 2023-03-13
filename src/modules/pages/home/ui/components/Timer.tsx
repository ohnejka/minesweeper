import { Typography } from '@mui/material';
import { FC, memo } from 'react';
import {
  TimerFormat,
  formatSeconds,
} from '../../../../global/helpers/formatSeconds';
import { TimerBox } from './styled';

type TimerProps = {
  readonly time: number;
};

const Timer: FC<TimerProps> = (props) => {
  const { time } = props;

  const formattedTime: TimerFormat = formatSeconds(time);

  return (
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
  );
};

export default memo(Timer);
