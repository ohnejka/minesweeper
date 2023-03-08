export type GameCell = {
  readonly value: 0 | 1;
  readonly bombsAround: number;
  readonly isBomb: boolean;
  readonly isOpen: boolean;
};
