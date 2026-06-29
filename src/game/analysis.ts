import type { LevelData } from "./types";

export type LevelMetrics = {
  regionSizes: number[];
  smallRegionCount: number;
  tinyRegionCount: number;
  minRegionSize: number;
  maxRegionSize: number;
  averageRegionSize: number;
  difficultyScore: number;
};

export function getRegionSizes(level: LevelData) {
  const sizes = Array<number>(level.catCount).fill(0);

  for (const row of level.grid) {
    for (const tile of row) {
      sizes[tile.colorId] += 1;
    }
  }

  return sizes;
}

export function analyzeLevel(level: LevelData): LevelMetrics {
  const regionSizes = getRegionSizes(level);
  const smallRegionCount = regionSizes.filter((size) => size >= 1 && size <= 6).length;
  const tinyRegionCount = regionSizes.filter((size) => size >= 1 && size <= 3).length;
  const minRegionSize = Math.min(...regionSizes);
  const maxRegionSize = Math.max(...regionSizes);
  const averageRegionSize = regionSizes.reduce((sum, size) => sum + size, 0) / regionSizes.length;
  const difficultyScore =
    level.boardSize * 10 +
    level.catCount * 8 +
    maxRegionSize * 0.4 -
    smallRegionCount * 9 -
    tinyRegionCount * 4 -
    (7 - Math.min(minRegionSize, 7)) * 2;

  return {
    regionSizes,
    smallRegionCount,
    tinyRegionCount,
    minRegionSize,
    maxRegionSize,
    averageRegionSize,
    difficultyScore
  };
}
