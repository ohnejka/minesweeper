export enum CellUserStatus {
  'Untouched' = 0,
  'Flag' = 1,
  'Question' = 2,
}

export type GameCell = {
  readonly value: 0 | 1;
  readonly bombsAround: number;
  readonly isBomb: boolean;
  status: CellUserStatus;
  isOpen: boolean;
  readonly id: string;
  readonly rowIndex: number;
  readonly columnIndex: number;
};

export type GameMatrix = Array<Array<GameCell>>;
