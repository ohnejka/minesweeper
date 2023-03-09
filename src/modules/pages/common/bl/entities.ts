export enum GameLevels {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export type GameLevelParams = {
  width: number;
  height: number;
  minesQty: number;
};

export type LevelOption = {
  [key in GameLevels]: GameLevelParams;
};

export type PlayerRound = {
  readonly username: string;
  readonly time: number;
  readonly level: GameLevels;
};
