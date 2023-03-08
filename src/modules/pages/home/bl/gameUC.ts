import { shuffleArray } from '../../../global/helpers/shuffleArray';
import { GameLevels, LevelOption } from '../../common/bl/entities';
import { GameCell } from './entities';

export class GameUC {
  constructor(
    private levelSettings: LevelOption,
    private currentLevel: GameLevels
  ) {}

  public initGame = (): ReadonlyArray<ReadonlyArray<GameCell>> => {
    const arrayWithBombs = this.createArrayWithBombs();
    console.log(arrayWithBombs);

    // . поделить на подмассивы по строкам
    // . на каждое значение вернуть объект с типом GameCell
    // . вернуть в ui для отрисовки

    return [];
  };

  private createArrayWithBombs = (): ReadonlyArray<number> => {
    const currentSettings = this.levelSettings[this.currentLevel];
    const { width, height, minesQty } = currentSettings;

    const totalCells = width * height;
    const flatArray = [];
    let totalBombsCreated = 0;

    for (let i = 0; i < totalCells; i++) {
      let cell = 0;
      const canCreateBomb = totalBombsCreated < minesQty;
      const isBomb = Math.random() > 0.5 ? true : false;

      if (canCreateBomb && isBomb) {
        totalBombsCreated++;
        cell = 1;
      }
      flatArray.push(cell);
    }

    return shuffleArray(flatArray);
  };
}
