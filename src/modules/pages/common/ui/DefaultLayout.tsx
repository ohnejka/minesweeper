import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseTheme } from '../../../global/styles/theme';

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledBox className='layout-menu'>
      <AppBar
        component='nav'
        color='transparent'
        sx={{
          boxShadow: 'none',
          borderBottom: `1px solid ${baseTheme.layout.gray5}`,
        }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            component='h1'
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'monospace',
              color: baseTheme.layout.gray5,
            }}
          >
            minesweeper
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
                game
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
                leaderboard
              </Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <StyledBody className='styled-body'>{children}</StyledBody>
      <Footer>
        <Typography
          variant='caption'
          component='span'
          sx={{ fontFamily: 'monospace', color: baseTheme.layout.gray2 }}
        >
          ohnejka 2023
        </Typography>
      </Footer>
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

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
  padding: 0 20px;
`;
