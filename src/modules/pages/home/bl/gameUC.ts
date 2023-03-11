import { shuffleArray } from '../../../global/helpers/shuffleArray';
import { splitArrayIntoChunks } from '../../../global/helpers/splitArrayIntoChunks';
import { CellUserStatus, GameCell, GameMatrix } from './entities';
import { v4 } from 'uuid';
import { HomeCommandRepo } from '../ds/repositories/commandRepo';
import { GameLevelParams, GameLevels } from '../../common/bl/entities';
import { SyntheticEvent } from 'react';
import { HomeQueryRepo } from '../ds/repositories/queryRepo';

export class GameUC {
  private width = 0;
  private height = 0;
  private bombsQty = 0;

  constructor(
    private commandRepo: HomeCommandRepo,
    private queryRepo: HomeQueryRepo
  ) {}

  public initGame = (params: GameLevelParams): void => {
    const { width, height, minesQty } = params;
    this.width = width;
    this.height = height;
    this.bombsQty = minesQty;

    const arrayWithBombs = this.createArrayWithBombs();
    const matrix = this.createMatrix(arrayWithBombs);

    console.log('repo set matrix');

    const isAlive = this.queryRepo.getIsAlive();

    if (!isAlive) {
      this.commandRepo.setIsAlive(true);
    }

    this.commandRepo.setMatrix(matrix);
  };

  public onCellClick = (
    e: SyntheticEvent,
    rowIndex: number,
    colIndex: number
  ): void => {
    const matrix = this.queryRepo.getMatrix();

    // . right click
    if (e.type === 'contextmenu') {
      e.preventDefault();

      const matrixCell = matrix[rowIndex][colIndex];

      let newStatus = CellUserStatus.Untouched;

      switch (matrixCell.status) {
        case CellUserStatus.Untouched:
          newStatus = CellUserStatus.Flag;
          break;
        case CellUserStatus.Flag:
          newStatus = CellUserStatus.Question;
          break;
      }

      this.commandRepo.setUserStatus({
        row: rowIndex,
        col: colIndex,
        status: newStatus,
      });

      // @TODO add check - if you flagged last bomb - you win

      return;
    }

    // . left click
    console.log(`clicked on cell: row ${rowIndex} col ${colIndex}`);

    this.commandRepo.openCell(rowIndex, colIndex);
    // @TODO add check - if open all non-bomb cells - you win

    const matrixCell = matrix[rowIndex][colIndex];

    if (matrixCell.isBomb) {
      this.commandRepo.setIsAlive(false);
      console.log('you loose');
      return;
    }

    if (matrixCell.bombsAround === 0) {
      console.log('this is empty');
      // .. recursive opening cells

      // @TODO add check - if open all non-bomb cells - you win
      return;
    }
  };

  public setGameLevel = (level: GameLevels): void => {
    this.commandRepo.setGameLevel(level);

    const isAlive = this.queryRepo.getIsAlive();
    if (!isAlive) {
      this.commandRepo.setIsAlive(true);
    }
  };

  private createMatrix = (arr: ReadonlyArray<0 | 1>): GameMatrix => {
    const matrix = splitArrayIntoChunks(arr, this.width);
    const infusedMatrix: Array<Array<GameCell>> = [];

    for (let i = 0; i < matrix.length; i++) {
      const row: ReadonlyArray<0 | 1> = matrix[i];
      const upRow = matrix[i - 1];
      const bottomRow = matrix[i + 1];

      const isTopRow = upRow === undefined;
      const isBottomRow = bottomRow === undefined;

      const infusedRow: Array<GameCell> = [];

      for (let k = 0; k < row.length; k++) {
        const col = row[k];
        const leftCol = row[k - 1];
        const rightCol = row[k + 1];

        const isLeftCol = leftCol === undefined;
        const isRightCol = rightCol === undefined;

        const topLeftEl = isTopRow || isLeftCol ? null : upRow[k - 1];
        const topEl = isTopRow ? null : upRow[k];
        const topRight = isTopRow || isRightCol ? null : upRow[k + 1];
        const right = isRightCol ? null : row[k + 1];
        const bottomRight = isBottomRow || isRightCol ? null : bottomRow[k + 1];
        const bottom = isBottomRow ? null : bottomRow[k];
        const bottomLeft = isBottomRow || isLeftCol ? null : bottomRow[k - 1];
        const left = isLeftCol ? null : row[k - 1];

        const aroundArr = [
          topLeftEl,
          topEl,
          topRight,
          right,
          bottomRight,
          bottom,
          bottomLeft,
          left,
        ];

        const bombsAround = aroundArr.filter((x) => x === 1).length;

        const cell: GameCell = {
          value: col,
          isBomb: Boolean(col),
          isOpen: false,
          status: CellUserStatus.Untouched,
          bombsAround,
          id: v4(),
        };

        infusedRow.push(cell);
      }

      infusedMatrix.push(infusedRow);
    }

    return infusedMatrix;
  };

  private createArrayWithBombs = (): ReadonlyArray<0 | 1> => {
    const totalCells = this.width * this.height;
    const flatArray: (0 | 1)[] = [];
    let totalBombsCreated = 0;

    for (let i = 0; i < totalCells; i++) {
      let cell: 0 | 1 = 0;
      const canCreateBomb = totalBombsCreated < this.bombsQty;

      if (canCreateBomb) {
        totalBombsCreated++;
        cell = 1;
      }
      flatArray.push(cell);
    }

    return shuffleArray(flatArray);
  };
}
