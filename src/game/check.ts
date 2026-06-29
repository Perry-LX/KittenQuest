import { generateCatPlacements, generateLevel, maxCats } from "./generator";
import { validateLevel } from "./validator";

function validatePlacements(boardSize: number, catCount: number) {
  const cats = generateCatPlacements(boardSize, catCount, `placements-${boardSize}-${catCount}`);
  const rows = new Set(cats.map((cat) => cat.y));
  const cols = new Set(cats.map((cat) => cat.x));
  const colors = new Set(cats.map((cat) => cat.colorId));

  if (rows.size !== catCount || cols.size !== catCount || colors.size !== catCount) {
    throw new Error(`Placement uniqueness check failed for ${boardSize}/${catCount}`);
  }

  for (let index = 0; index < cats.length; index += 1) {
    for (let other = index + 1; other < cats.length; other += 1) {
      const dx = Math.abs(cats[index].x - cats[other].x);
      const dy = Math.abs(cats[index].y - cats[other].y);
      if (dx <= 1 && dy <= 1) {
        throw new Error(`Placement adjacency check failed for ${boardSize}/${catCount}`);
      }
    }
  }
}

export function runGeneratorCheck() {
  for (let boardSize = 4; boardSize <= 13; boardSize += 1) {
    const max = maxCats(boardSize);
    for (let catCount = 1; catCount <= max; catCount += 1) {
      validatePlacements(boardSize, catCount);
    }

    const level = generateLevel(boardSize, `level-${boardSize}`);
    if (!validateLevel(level)) {
      throw new Error(`Level validation failed for boardSize=${boardSize}`);
    }
  }

  return "generator-check: ok";
}
