import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { FC, ChangeEvent, useContext } from 'react';
import styled from 'styled-components';
import { GameLevels } from '../../common/bl/entities';
import { HomeContext, HomeContextState } from './context/homeContext';

const Settings: FC = () => {
  const homeContext: HomeContextState = useContext(HomeContext);
  const { state, fns } = homeContext;

  const { username, gameIsStarted, gameIsPaused, levelOptions, currentLevel } =
    state;
  const {
    handleLevelOptionChange,
    handleResetGame,
    handleStartNewGame,
    handleTogglePauseGame,
    handleUsernameChange,
  } = fns;

  const onOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = (event.target as HTMLInputElement).value;
    handleLevelOptionChange(newLevel as GameLevels);
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = (event.target as HTMLInputElement).value;
    handleUsernameChange(username);
  };

  const onStartNewGame = () => {
    handleStartNewGame();
  };

  const onToggleGame = () => {
    handleTogglePauseGame();
  };

  const onResetGame = () => {
    handleResetGame();
  };

  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <Grid item xs={6}>
        <FormControl>
          <TextField
            id='username'
            label='Player name'
            variant='outlined'
            hiddenLabel
            placeholder={'My name is...'}
            value={username}
            disabled={gameIsStarted}
            onChange={onUsernameChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel id='game-level-options'>Game level</FormLabel>
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
                  disabled={gameIsStarted}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <Button
          variant='contained'
          disabled={!username}
          onClick={onStartNewGame}
        >
          Start new game!
        </Button>
      </Grid>
      {gameIsStarted && (
        <Grid item xs={6}>
          <Button
            variant='outlined'
            disabled={!gameIsStarted}
            onClick={onToggleGame}
          >
            {gameIsPaused ? 'Continue' : 'Pause'}
          </Button>
          <Button variant='outlined' onClick={onResetGame}>
            Reset
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

const StyledSettings = styled(Settings)`
  display: flex;
  flex-direction: column;
`;

export default StyledSettings;
