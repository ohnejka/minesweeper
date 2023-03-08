import { shuffleArray } from '../../../global/helpers/shuffleArray';
import { splitArrayIntoChunks } from '../../../global/helpers/splitArrayIntoChunks';
import { GameLevels, LevelOption } from '../../common/bl/entities';
import { GameCell } from './entities';

export class GameUC {
  private width = 0;
  private height = 0;
  private minesQty = 0;

  constructor(
    private levelSettings: LevelOption,
    private currentLevel: GameLevels
  ) {
    const currentSettings = this.levelSettings[this.currentLevel];
    const { width, height, minesQty } = currentSettings;
    this.width = width;
    this.height = height;
    this.minesQty = minesQty;
  }

  public initGame = (): ReadonlyArray<ReadonlyArray<GameCell>> => {
    const arrayWithBombs = this.createArrayWithBombs();
    const matrix = this.createMatrix(arrayWithBombs);
    return matrix;
  };

  private createMatrix = (
    arr: ReadonlyArray<0 | 1>
  ): ReadonlyArray<ReadonlyArray<GameCell>> => {
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

        const topLeftEl = isTopRow || isLeftCol ? null : upRow[leftCol];
        const topEl = isTopRow ? null : upRow[col];
        const topRight = isTopRow || isRightCol ? null : upRow[rightCol];
        const right = isRightCol ? null : row[rightCol];
        const bottomRight =
          isBottomRow || isRightCol ? null : bottomRow[rightCol];
        const bottom = isBottomRow ? null : bottomRow[col];
        const bottomLeft = isBottomRow || isLeftCol ? null : bottomRow[leftCol];
        const left = isLeftCol ? null : row[leftCol];

        const bombsAround = [
          topLeftEl,
          topEl,
          topRight,
          right,
          bottomRight,
          bottom,
          bottomLeft,
          left,
        ].filter((x) => x === 1).length;

        const cell: GameCell = {
          value: col,
          isBomb: Boolean(col),
          isOpen: false,
          bombsAround,
        };

        infusedRow.push(cell);
      }

      infusedMatrix.push(infusedRow);
    }

    const readonlyInfusedMatrix: ReadonlyArray<ReadonlyArray<GameCell>> = [
      ...infusedMatrix,
    ];

    return readonlyInfusedMatrix;
  };

  private createArrayWithBombs = (): ReadonlyArray<0 | 1> => {
    const totalCells = this.width * this.height;
    const flatArray: (0 | 1)[] = [];
    let totalBombsCreated = 0;

    for (let i = 0; i < totalCells; i++) {
      let cell: 0 | 1 = 0;
      const canCreateBomb = totalBombsCreated < this.minesQty;

      if (canCreateBomb) {
        totalBombsCreated++;
        cell = 1;
      }
      flatArray.push(cell);
    }

    return shuffleArray(flatArray);
  };
}
