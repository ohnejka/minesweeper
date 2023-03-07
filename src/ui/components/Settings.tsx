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
import { FC, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameLevels, setGameLevel } from '../../ds/redux/gameSlice';
import { RootState } from '../../ds/store';

const Settings: FC = () => {
  const [username, setUsername] = useState('');
  const [gameIsOn, setGameIsOn] = useState(false);
  const [gameIsPaused, setGameIsPaused] = useState(false);

  const levelOptions = useSelector(
    (state: RootState) => state.game.levelOptionsNames
  );
  const currentLevel = useSelector((state: RootState) => state.game.level);
  const dispatch = useDispatch();

  const onOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = (event.target as HTMLInputElement).value;
    dispatch(setGameLevel(newLevel as GameLevels));
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = (event.target as HTMLInputElement).value;
    setUsername(username);
  };

  const onStartNewGame = () => {
    setGameIsOn(true);
    setGameIsPaused(false);
    // . set timer for user
    // . unblock game field
  };

  const onToggleGame = () => {
    setGameIsPaused(!gameIsPaused);

    // . stop timer
    // . block game field
  };

  const onResetGame = () => {
    setGameIsOn(false);
    setGameIsPaused(false);

    // .  block and reset game field
    // . stop and reset timer
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
            disabled={gameIsOn}
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
              levelOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={gameIsOn}
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
      {gameIsOn && (
        <Grid item xs={6}>
          <Button
            variant='outlined'
            disabled={!gameIsOn}
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
