import { Player } from '../../../common/ds/redux/playersSlice';
import { FC } from 'react';
import styled from 'styled-components';

type TableProps = {
  players: ReadonlyArray<Player>;
};

const BaseTable: FC<TableProps> = ({ players }) => {
  return (
    <section className='table'>
      <ul className='table__row table__row--head'>
        <li className='table__item'>
          <span>player name</span>
          <span>game time</span>
        </li>
      </ul>

      <ul className='table__row table__row--body'>
        {players.length > 0 &&
          players.map((player: Player) => (
            <li className='table__item' key={player.id}>
              <span>{player.username}</span>
              <span>{player.timeInSeconds}</span>
            </li>
          ))}
        {players.length === 0 && <div>No leaders on this level yet...</div>}
      </ul>
    </section>
  );
};

const StyledBaseTable = styled(BaseTable)`
  .table {
    display: flex;
    flex-direction: column;

    &__row {
      display: flex;
    }

    &__item {
      display: flex;
    }
  }
`;

export default StyledBaseTable;
