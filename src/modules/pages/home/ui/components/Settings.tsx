import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button,
  Box,
} from '@mui/material';
import { FC, ChangeEvent, useContext } from 'react';
import styled from 'styled-components';
import { GameLevels } from '../../../common/bl/entities';
import { HomeContext, HomeContextState } from '../context/homeContext';

const Settings: FC = () => {
  const homeContext: HomeContextState = useContext(HomeContext);
  const { state, fns } = homeContext;

  const { levelOptions, currentLevel } = state;
  const { handleLevelOptionChange, handleStartNewGame } = fns;

  const onOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = (event.target as HTMLInputElement).value;
    handleLevelOptionChange(newLevel as GameLevels);
  };

  const onStartNewGame = () => {
    handleStartNewGame();
  };

  return (
    <>
      <Grid container direction='column' alignItems='center' spacing={2}>
        <Grid item xs={4}>
          <FormControl>
            <RadioGroup
              aria-labelledby='game-level-options'
              name='game-level-options'
              row
              value={currentLevel}
              onChange={onOptionChange}
            >
              {levelOptions &&
                levelOptions.map((option: GameLevels) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ display: 'flex' }}>
            <Button variant='contained' onClick={onStartNewGame}>
              Start new game
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const StyledSettings = styled(Settings)`
  display: flex;
  flex-direction: column;
`;

export default StyledSettings;
