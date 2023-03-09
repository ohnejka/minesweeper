export type GameCell = {
  readonly value: 0 | 1;
  readonly bombsAround: number;
  readonly isBomb: boolean;
  isOpen: boolean;
  readonly id: string;
};

export type GameMatrix = Array<Array<GameCell>>;
