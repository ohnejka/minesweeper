import { Box, Container, Tab, Typography } from '@mui/material';
import {
  FC,
  PropsWithChildren,
  SyntheticEvent,
  useContext,
  useMemo,
  useState,
} from 'react';
import Tabs from '@mui/material/Tabs';
import {
  LeaderboardContext,
  LeaderboardContextState,
} from '../context/leaderboardContext';
import { Player } from '../../../common/ds/redux/playersSlice';
import { GameLevels } from '../../../common/bl/entities';
import BaseTable from './BaseTable';
import { StyledTableDiv } from './styled';

export const LeaderTable: FC = () => {
  const leaderboardContext: LeaderboardContextState =
    useContext(LeaderboardContext);
  const { state } = leaderboardContext;
  const { players } = state;

  const [value, setValue] = useState(0);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const easyPlayers = useMemo(() => {
    return getFirstTenSortedPlayersByLevel(players, GameLevels.Easy);
  }, [players]);

  const mediumPlayers = useMemo(() => {
    return getFirstTenSortedPlayersByLevel(players, GameLevels.Medium);
  }, [players]);

  const hardPlayers = useMemo(() => {
    return getFirstTenSortedPlayersByLevel(players, GameLevels.Hard);
  }, [players]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: '20px',
      }}
      className='container'
    >
      <Typography
        variant='h5'
        component='h2'
        sx={{ fontFamily: 'monospace', marginBottom: '20px' }}
      >
        {' '}
        🏆 local leaders 🏆{' '}
      </Typography>
      <StyledTableDiv>
        <Tabs
          value={value}
          onChange={onTabChange}
          aria-label='leaderboard tabs'
          centered
        >
          <Tab label='easy' sx={{ fontFamily: 'monospace' }} />
          <Tab label='medium' sx={{ fontFamily: 'monospace' }} />
          <Tab label='hard' sx={{ fontFamily: 'monospace' }} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <BaseTable players={easyPlayers} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BaseTable players={mediumPlayers} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BaseTable players={hardPlayers} />
        </TabPanel>
      </StyledTableDiv>
    </Container>
  );
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel: FC<PropsWithChildren<TabPanelProps>> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const getFirstTenSortedPlayersByLevel = (
  players: ReadonlyArray<Player>,
  level: GameLevels
): ReadonlyArray<Player> => {
  const filteredSorted = players
    .filter((p: Player) => p.level === level)
    .sort((a: Player, b: Player) => a.timeInSeconds - b.timeInSeconds);

  const firstTen = filteredSorted.slice(0, 10);

  return firstTen;
};
