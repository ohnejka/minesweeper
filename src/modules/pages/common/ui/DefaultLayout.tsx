import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const DefaultLayout: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <Container>
      <AppBar component='nav'>
        <Toolbar>
          <Typography
            variant='h6'
            component='h1'
            sx={{ mr: 2, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Minesweeper game
          </Typography>
          <Box display={'flex'} gap={'10px'}>
            <RouterLink to='/'>
              <Typography>Home</Typography>
            </RouterLink>
            <RouterLink to='/leaderboard'>
              <Typography>Leaderboard</Typography>
            </RouterLink>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '80px' }}>{children}</div>
    </Container>
  );
};
