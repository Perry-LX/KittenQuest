export type MarkState = "none" | "suspect" | "blocked";

export type TileData = {
  x: number;
  y: number;
  colorId: number;
};

export type CatPlacement = {
  x: number;
  y: number;
  colorId: number;
};

export type LevelData = {
  boardSize: number;
  catCount: number;
  lives: number;
  seed: string;
  grid: TileData[][];
  cats: CatPlacement[];
};

export type TileViewState = {
  mark: MarkState;
  revealed: boolean;
  wrongGuess: boolean;
};
