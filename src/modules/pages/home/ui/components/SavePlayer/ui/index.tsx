import { TextField, Button, Typography, Box } from '@mui/material';
import { FC, useContext } from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import {
  formatSeconds,
  TimerFormat,
} from '../../../../../../global/helpers/formatSeconds';
import { withContext } from '../../../../../../global/react/WithContext';
import { TimerBox } from '../../styled';
import {
  SavePlayerContext,
  SavePLayerContextProvider,
} from '../context/savePlayerContext';

const SavePlayerInner: FC = () => {
  const { state, fns } = useContext(SavePlayerContext);
  const formattedTime: TimerFormat = formatSeconds(state.time);

  return (
    <StyledSection>
      <Box sx={{ display: 'flex' }}>
        <Typography>You win! Your time is:</Typography>
        <TimerBox>
          {formattedTime.withHours && (
            <Typography variant='body1'>{formattedTime.h} h</Typography>
          )}
          {formattedTime.withMinutes && (
            <Typography variant='body1'>{formattedTime.m} min</Typography>
          )}

          <Typography variant='body1'>{formattedTime.s} s</Typography>
        </TimerBox>
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
                style={{ marginBottom: 20 }}
                label='Name'
                variant='standard'
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
              />
            );
          }}
        />

        <Button variant='outlined' type='submit' sx={{ alignSelf: 'center' }}>
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
  SavePLayerContextProvider,
  SavePlayerInner
);
