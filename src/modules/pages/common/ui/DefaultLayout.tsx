import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseTheme } from '../../../global/styles/theme';

export const DefaultLayout: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <StyledBox className='layout-menu'>
      <AppBar
        component='nav'
        color='transparent'
        sx={{
          boxShadow: 'none',
          borderBottom: `1px solid ${baseTheme.layout.gray12}`,
        }}
      >
        <Toolbar>
          <Typography
            variant='h5'
            component='h1'
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'monospace',
            }}
          >
            Minesweeper game
          </Typography>
          <Box display={'flex'} gap={'10px'}>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? '--link-active' : '')}
            >
              <Typography
                variant='h6'
                component='span'
                sx={{ fontFamily: 'monospace' }}
              >
                Game
              </Typography>
            </NavLink>
            <NavLink
              to='/leaderboard'
              className={({ isActive }) => (isActive ? '--link-active' : '')}
            >
              <Typography
                variant='h6'
                component='span'
                sx={{ fontFamily: 'monospace' }}
              >
                Leaderboard
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <StyledBody className='styled-body'>{children}</StyledBody>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding-top: 64px;
`;
