import { shuffleArray } from './helpers/shuffleArray';
import { splitArrayIntoChunks } from './helpers/splitArrayIntoChunks';
import { CellUserStatus, GameCell, GameMatrix } from './entities';
import { v4 } from 'uuid';
import { GameCommandRepo } from '../ds/repositories/game/commandRepo';
import { GameLevelParams, GameLevels } from '../../common/bl/entities';
import { SyntheticEvent } from 'react';
import { GameQueryRepo } from '../ds/repositories/game/queryRepo';

export class GameUC {
  private width = 0;
  private height = 0;
  private bombsQty = 0;

  constructor(
    private commandRepo: GameCommandRepo,
    private queryRepo: GameQueryRepo
  ) {}

  public initGame = (params: GameLevelParams): void => {
    const { width, height, minesQty } = params;
    this.width = width;
    this.height = height;
    this.bombsQty = minesQty;

    const arrayWithBombs = this.createArrayWithBombs();
    const matrix = this.createMatrix(arrayWithBombs);

    // console.log('init game');

    const isAlive = this.queryRepo.getIsAlive();

    if (!isAlive) {
      this.commandRepo.setIsAlive(true);
    }

    this.commandRepo.setMatrix(matrix);
  };

  public onLongTouch = (rowIndex: number, colIndex: number): void => {
    const matrix = this.queryRepo.getMatrix();
    const matrixCell = matrix[rowIndex][colIndex];

    this.flagCell(matrixCell, rowIndex, colIndex);
  };

  public onCellClick = (
    e: SyntheticEvent,
    rowIndex: number,
    colIndex: number
  ): void => {
    const matrix = this.queryRepo.getMatrix();
    const matrixCell = matrix[rowIndex][colIndex];

    // . right click
    if (e.type === 'contextmenu') {
      e.preventDefault();
      this.flagCell(matrixCell, rowIndex, colIndex);
      return;
    }

    // . middle click
    if ((e as any).button === 1) {
      // . check if clicked cell is open
      // .. if not - do nothing
      // . check if  matrixCell.bomsAround === real qty of open bombs around
      // .. if match, open all other cells around (recursive for empty ones)
      // .. if not, do nothing
    }

    // . left click
    // .. if bomb - game over
    if (matrixCell.isBomb) {
      this.commandRepo.openCell(rowIndex, colIndex);
      this.commandRepo.setIsAlive(false);
      return;
    }

    // .. cell is empty - open recursively all empty cells
    if (matrixCell.bombsAround === 0) {
      this.openCellAndEmptyAround(matrixCell);

      const allClearCellsOpen = this.checkIfAllClearCellsAreOpen();
      if (allClearCellsOpen) {
        this.commandRepo.setIsWin(true);
      }
      return;
    }

    // .. cell has something inside
    this.commandRepo.openCell(rowIndex, colIndex);

    const allClearCellsOpen = this.checkIfAllClearCellsAreOpen();
    if (allClearCellsOpen) {
      this.commandRepo.setIsWin(true);
    }
  };

  public setGameLevel = (level: GameLevels): void => {
    this.commandRepo.setGameLevel(level);

    const isAlive = this.queryRepo.getIsAlive();
    if (!isAlive) {
      this.commandRepo.setIsAlive(true);
    }
  };

  public onPlayerAdded = (): void => {
    this.commandRepo.setIsWin(false);
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
          rowIndex: i,
          columnIndex: k,
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

  private checkIfAllBombsAreFlagged = (): boolean => {
    const bombCells = this.queryRepo.getBombCells();

    const matrix = this.queryRepo.getMatrix();
    const checkedCells = matrix
      .flat()
      .filter((c: GameCell) => c.status === CellUserStatus.Flag);

    if (checkedCells.length !== bombCells.length) {
      return false;
    }

    const bombIds = bombCells.map((c) => c.id);
    const checkedIds = checkedCells.map((c) => c.id);

    const allBombsChecked = bombIds.every((id) => checkedIds.includes(id));

    return allBombsChecked;
  };

  private checkIfAllClearCellsAreOpen = (): boolean => {
    const bombCells = this.queryRepo.getBombCells();

    const flatMatrix = this.queryRepo.getMatrix().flat();
    const allCellsQty = flatMatrix.length;

    const allOpenCells = flatMatrix.filter((c) => c.isOpen);

    if (allOpenCells.length !== allCellsQty - bombCells.length) {
      return false;
    }

    return true;
  };

  private flagCell = (
    matrixCell: GameCell,
    rowIndex: number,
    colIndex: number
  ): void => {
    if (matrixCell.isOpen) {
      return;
    }

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

    const allBombsFlagged = this.checkIfAllBombsAreFlagged();

    if (allBombsFlagged) {
      this.commandRepo.setIsWin(true);
    }
  };

  private openCellAndEmptyAround = (cell: GameCell) => {
    const row = cell.rowIndex;
    const col = cell.columnIndex;

    const matrix = this.queryRepo.getMatrix();

    const upRow = matrix[row - 1];
    const bottomRow = matrix[row + 1];
    const leftCol = matrix[row][col - 1];
    const rightCol = matrix[row][col + 1];

    const isTopRow = upRow === undefined;
    const isBottomRow = bottomRow === undefined;
    const isLeftCol = leftCol === undefined;
    const isRightCol = rightCol === undefined;

    const topLeftEl = isTopRow || isLeftCol ? null : upRow[col - 1];
    const topEl = isTopRow ? null : upRow[col];
    const topRight = isTopRow || isRightCol ? null : upRow[col + 1];
    const right = isRightCol ? null : matrix[row][col + 1];
    const bottomRight = isBottomRow || isRightCol ? null : bottomRow[col + 1];
    const bottom = isBottomRow ? null : bottomRow[col];
    const bottomLeft = isBottomRow || isLeftCol ? null : bottomRow[col - 1];
    const left = isLeftCol ? null : matrix[row][col - 1];

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

    // . get existing cells around
    const existingCellsAround = aroundArr.filter((c: GameCell | null) => !!c);
    const verifiedCellsAround = existingCellsAround as GameCell[];

    // . if parent cell is flagged - open it separately
    if (!cell.isOpen && cell.status !== CellUserStatus.Untouched) {
      this.commandRepo.openCell(row, col);
    } else {
      // . if it's clear - process with other cells
      verifiedCellsAround.push(cell);
    }

    // . get only closed and without user flags
    const verifiedAndClosedCells = verifiedCellsAround.filter(
      (c) => !c.isOpen && c.status === CellUserStatus.Untouched
    );

    // . if no closed left - leave recursion
    if (verifiedAndClosedCells.length === 0) {
      return;
    }

    // . if there are closed - open them all
    this.commandRepo.openCellArray(
      verifiedAndClosedCells.map((c: GameCell) => {
        return {
          cellRow: c.rowIndex,
          cellCol: c.columnIndex,
        };
      })
    );

    // . repeat recursively for empty cells
    const emptyCells = aroundArr.filter(
      (c: GameCell | null) => c && c.bombsAround === 0
    );

    (emptyCells as GameCell[]).forEach((c: GameCell) =>
      this.openCellAndEmptyAround(c)
    );
  };
}
