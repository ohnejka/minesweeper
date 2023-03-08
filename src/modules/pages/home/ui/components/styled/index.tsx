import { Box } from '@mui/material';
import styled from 'styled-components';
import { baseTheme } from '../../../../../global/styles/theme';
interface CellProps {
  isOpen: boolean;
  bombsAround: number;
}

export const StyledCell = styled.div<CellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${({ isOpen }) =>
    isOpen ? 'transparent' : baseTheme.gameColors.background};
  outline: 1px solid ${baseTheme.gameColors.border};
  color: ${({ bombsAround }) => {
    switch (bombsAround) {
      case 0:
        return 'pink';
      case 1:
        return baseTheme.gameColors.one;
      case 2:
        return baseTheme.gameColors.two;
      case 3:
        return baseTheme.gameColors.three;
      case 4:
        return baseTheme.gameColors.four;
      case 5:
        return baseTheme.gameColors.five;
      case 6:
        return baseTheme.gameColors.six;
      case 7:
        return baseTheme.gameColors.seven;
      case 8:
        return baseTheme.gameColors.eight;
    }
  }};
  cursor: pointer;
`;

export const TimerBox = styled(Box)`
  display: flex;
`;
