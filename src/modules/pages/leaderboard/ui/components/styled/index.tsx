import styled from 'styled-components';
import { baseTheme } from '../../../../../global/styles/theme';

export const StyledTableDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const StyledBaseTable = styled.div`
  .table {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    outline: 1px dotted red;

    &__row {
      display: flex;
      justify-content: space-between;
    }

    &__head {
      margin-top: 20px;
      margin-bottom: 10px;
      padding: 5px 0;
      background-color: ${baseTheme.layout.gray1};
    }

    &__body {
      display: flex;
      flex-direction: column;
    }

    &__body-item {
      border-bottom: 1px solid ${baseTheme.layout.gray2};
    }

    &__item {
      display: flex;
      flex: 1;
    }
  }
`;
