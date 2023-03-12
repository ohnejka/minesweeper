import { Box } from '@mui/material';
import styled from 'styled-components';
import { baseTheme } from '../../../../../global/styles/theme';
interface CellProps {
  isOpen: boolean;
  bombsAround: number;
}

export const StyledCell = styled.div<CellProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${baseTheme.gameColors.background};
  border: 0.5px solid ${baseTheme.gameColors.border};
  cursor: pointer;
  user-select: none;

  &.--closed {
    span {
      opacity: 0;
    }

    &.--user-attribute {
      span {
        opacity: 1;
      }
    }
  }

  &.--open {
    cursor: none;
    pointer-events: none;
    background-color: ${baseTheme.gameColors.openBackground};
    border: ${baseTheme.gameColors.openShadow};
    box-shadow: inset 0 0 1px ${baseTheme.gameColors.openShadow};

    span {
      opacity: 1;
    }
  }

  &.--bombed {
    background-color: ${baseTheme.gameColors.bombedBackground};
    border: ${baseTheme.gameColors.bombedBackground};
  }

  &.--figure {
    color: ${({ bombsAround }) => {
      switch (bombsAround) {
        case 0:
          return 'transparent';
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
  }

  /* .hover-info {
    position: absolute;
    top: 0;
    right: -200px;
    width: 100px;
    height: 10px;
    display: none;
    z-index: 1;
  }

  &:hover {
    .hover-info {
      display: block;
    }
  } */
`;

export const TimerBox = styled(Box)`
  display: flex;
`;

export const StyledGameOverBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${baseTheme.gameColors.bombedBackground};
`;

export const StyledDiv = styled.div`
  padding: 20px;
  width: 350px;
  min-height: 150px;
`;
