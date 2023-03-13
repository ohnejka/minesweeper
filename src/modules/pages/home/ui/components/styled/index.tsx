import { Box } from '@mui/material';
import styled from 'styled-components';
import { device } from '../../../../../global/styles/mediaSizes';
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
  background-color: ${baseTheme.layout.gray2};
  border: 0.5px solid ${baseTheme.layout.gray5};
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
    background-color: ${baseTheme.layout.gray3};
    border: ${baseTheme.layout.gray6};
    box-shadow: inset 0 0 1px ${baseTheme.layout.gray6};

    span {
      opacity: 1;
    }
  }

  &.--bombed {
    background-color: ${baseTheme.layout.accent2};
    border: ${baseTheme.layout.accent2};
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
  font-family: monospace;
  color: ${baseTheme.layout.accent3};
`;

export const StyledTimerBox = styled(Box)`
  display: flex;
  gap: 10px;
  min-width: 240px;
  justify-content: space-between;
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
  color: ${baseTheme.layout.accent2};
`;

export const StyledDiv = styled.div`
  padding: 20px;
  width: 350px;
  min-height: 150px;
`;

export const BodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 0 10px;
  height: 100%;
  overflow-x: scroll;

  @media ${device.mobile_tablet} {
    padding: 0 20px;
  }
`;

export const StyledGameBox = styled.div`
  display: flex;
  justify-content: center;
`;
