import { TextField, Button, Typography, Box } from '@mui/material';
import { FC, useContext } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import {
  formatSeconds,
  TimerFormat,
} from '../../../../../../global/helpers/formatSeconds';
import { withContext } from '../../../../../../global/react/WithContext';
import { baseTheme } from '../../../../../../global/styles/theme';
import { TimerBox } from '../../styled';
import {
  SavePlayerContext,
  SavePlayerContextProvider,
} from '../context/savePlayerContext';

const SavePlayerInner: FC = () => {
  const { state, fns } = useContext(SavePlayerContext);
  const formattedTime: TimerFormat = formatSeconds(state.time);

  return (
    <StyledSection>
      <Box
        marginBottom={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h6'
          component='span'
          sx={{ fontFamily: 'monospace', color: baseTheme.layout.accent2 }}
        >
          ✨You win!✨
        </Typography>
        <div
          style={{
            display: 'flex',
          }}
        >
          <Typography
            variant='body1'
            component='span'
            sx={{ fontFamily: 'monospace' }}
          >
            Your time is:
          </Typography>
          <TimerBox sx={{ color: baseTheme.layout.gray12 }}>
            {formattedTime.withHours && (
              <Typography variant='body1' sx={{ fontFamily: 'monospace' }}>
                {formattedTime.h}h
              </Typography>
            )}
            {formattedTime.withMinutes && (
              <Typography variant='body1' sx={{ fontFamily: 'monospace' }}>
                {formattedTime.m}min
              </Typography>
            )}

            <Typography variant='body1' sx={{ fontFamily: 'monospace' }}>
              {formattedTime.s}s
            </Typography>
          </TimerBox>
        </div>
      </Box>
      <form
        onSubmit={fns.onSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Controller
          control={state.control}
          name='name'
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                style={{ marginBottom: 24 }}
                label='Enter you name...'
                variant='standard'
                error={!!error}
                color='error'
                helperText={error?.message}
                onChange={onChange}
                value={value}
              />
            );
          }}
        />

        <Button
          variant='outlined'
          color='error'
          type='submit'
          sx={{ alignSelf: 'center', fontFamily: 'monospace' }}
        >
          Save
        </Button>
      </form>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SavePlayer = withContext(
  SavePlayerContextProvider,
  SavePlayerInner
);
