import type { CatPlacement, LevelData, TileData } from "./types";
import { createRandom, createSeed, range } from "../utils/random";

function assertBoardSize(boardSize: number) {
  if (!Number.isInteger(boardSize) || boardSize <= 0) {
    throw new Error("boardSize must be a positive integer");
  }
}

function assertCatCount(catCount: number) {
  if (!Number.isInteger(catCount) || catCount <= 0) {
    throw new Error("catCount must be a positive integer");
  }
}

function isFarEnough(x: number, y: number, cats: Array<Pick<CatPlacement, "x" | "y">>) {
  return cats.every((cat) => {
    const dx = Math.abs(cat.x - x);
    const dy = Math.abs(cat.y - y);
    return !(dx <= 1 && dy <= 1);
  });
}

function getNeighbors(x: number, y: number, boardSize: number) {
  const result: Array<{ x: number; y: number }> = [];

  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx === 0 && dy === 0) {
        continue;
      }

      const nextX = x + dx;
      const nextY = y + dy;

      if (nextX < 0 || nextX >= boardSize || nextY < 0 || nextY >= boardSize) {
        continue;
      }

      result.push({ x: nextX, y: nextY });
    }
  }

  return result;
}

function isOrthogonalNeighbor(x: number, y: number, nextX: number, nextY: number) {
  return Math.abs(nextX - x) + Math.abs(nextY - y) === 1;
}

function createEmptyGrid(boardSize: number) {
  return Array.from({ length: boardSize }, (_, y) =>
    Array.from({ length: boardSize }, (_, x) => ({ x, y, colorId: -1 } satisfies TileData))
  );
}

function createRandomRegionSizes(boardSize: number, catCount: number, seed: string) {
  const random = createRandom(`${seed}:region-sizes`);
  const totalTiles = boardSize * boardSize;
  const sizes = Array<number>(catCount).fill(1);
  let remaining = totalTiles - catCount;

  while (remaining > 0) {
    const colorId = random.nextInt(0, catCount - 1);
    sizes[colorId] += 1;
    remaining -= 1;
  }

  return sizes;
}

function assertRegionSizes(boardSize: number, catCount: number, regionSizes: number[]) {
  if (regionSizes.length !== catCount) {
    throw new Error("regionSizes length must equal catCount");
  }

  if (regionSizes.some((size) => !Number.isInteger(size) || size <= 0)) {
    throw new Error("regionSizes must contain positive integers");
  }

  const total = regionSizes.reduce((sum, size) => sum + size, 0);
  if (total !== boardSize * boardSize) {
    throw new Error("regionSizes must sum to boardSize * boardSize");
  }
}

function tryBuildColorIdsWithTargets(
  boardSize: number,
  cats: CatPlacement[],
  regionSizes: number[],
  seed: string
) {
  const random = createRandom(seed);
  const grid = createEmptyGrid(boardSize);
  const frontierByColor = Array.from({ length: cats.length }, () => [] as Array<{ x: number; y: number }>);
  const filledByColor = Array<number>(cats.length).fill(0);

  for (const cat of cats) {
    grid[cat.y][cat.x] = { x: cat.x, y: cat.y, colorId: cat.colorId };
    frontierByColor[cat.colorId].push({ x: cat.x, y: cat.y });
    filledByColor[cat.colorId] = 1;
  }

  const totalTiles = boardSize * boardSize;
  let filledTiles = cats.length;

  while (filledTiles < totalTiles) {
    const colorIds = random
      .shuffle(range(cats.length))
      .filter((colorId) => filledByColor[colorId] < regionSizes[colorId])
      .sort((left, right) => {
        const leftNeed = regionSizes[left] - filledByColor[left];
        const rightNeed = regionSizes[right] - filledByColor[right];
        return leftNeed - rightNeed;
      });

    let placed = false;

    for (const colorId of colorIds) {
      const orthogonalCandidatesByKey = new Map<string, { x: number; y: number }>();
      const diagonalCandidatesByKey = new Map<string, { x: number; y: number }>();

      for (const cell of frontierByColor[colorId]) {
        for (const neighbor of getNeighbors(cell.x, cell.y, boardSize)) {
          if (grid[neighbor.y][neighbor.x].colorId !== -1) {
            continue;
          }

          const key = `${neighbor.x}:${neighbor.y}`;
          if (isOrthogonalNeighbor(cell.x, cell.y, neighbor.x, neighbor.y)) {
            orthogonalCandidatesByKey.set(key, neighbor);
          } else {
            diagonalCandidatesByKey.set(key, neighbor);
          }
        }
      }

      const candidates =
        orthogonalCandidatesByKey.size > 0
          ? [...orthogonalCandidatesByKey.values()]
          : [...diagonalCandidatesByKey.values()];
      if (candidates.length === 0) {
        continue;
      }

      const choice = candidates[random.nextInt(0, candidates.length - 1)];
      grid[choice.y][choice.x] = {
        x: choice.x,
        y: choice.y,
        colorId
      };
      frontierByColor[colorId].push(choice);
      filledByColor[colorId] += 1;
      filledTiles += 1;
      placed = true;
      break;
    }

    if (!placed) {
      return null;
    }
  }

  return grid;
}

function buildColorIds(boardSize: number, cats: CatPlacement[], seed: string, regionSizes?: number[]) {
  const resolvedRegionSizes = regionSizes ?? createRandomRegionSizes(boardSize, cats.length, seed);
  assertRegionSizes(boardSize, cats.length, resolvedRegionSizes);

  for (let attempt = 0; attempt < 400; attempt += 1) {
    const grid = tryBuildColorIdsWithTargets(
      boardSize,
      cats,
      resolvedRegionSizes,
      `${seed}:colors:${attempt}`
    );

    if (grid) {
      return grid;
    }
  }

  throw new Error("Failed to generate connected color regions for the requested region sizes");
}

export function maxCats(boardSize: number) {
  assertBoardSize(boardSize);
  if (boardSize === 1) {
    return 1;
  }

  if (boardSize < 4) {
    return 0;
  }

  return boardSize;
}

export function generateCatPlacements(boardSize: number, catCount: number, seed?: string): CatPlacement[] {
  assertBoardSize(boardSize);
  assertCatCount(catCount);

  const max = maxCats(boardSize);
  if (catCount > max) {
    throw new Error(`catCount must be less than or equal to ${max} for boardSize ${boardSize}`);
  }

  const resolvedSeed = seed ?? createSeed();
  const random = createRandom(`${resolvedSeed}:placements`);
  const rows = random.shuffle(range(boardSize));
  const usedColumns = new Set<number>();
  const result: Array<Pick<CatPlacement, "x" | "y">> = [];

  function backtrack(rowIndex: number): boolean {
    if (result.length === catCount) {
      return true;
    }

    if (rowIndex >= rows.length) {
      return false;
    }

    const remainingRows = rows.length - rowIndex;
    const need = catCount - result.length;
    if (remainingRows < need) {
      return false;
    }

    const row = rows[rowIndex];
    const columns = random.shuffle(range(boardSize));

    for (const column of columns) {
      if (usedColumns.has(column)) {
        continue;
      }

      if (!isFarEnough(column, row, result)) {
        continue;
      }

      result.push({ x: column, y: row });
      usedColumns.add(column);

      if (backtrack(rowIndex + 1)) {
        return true;
      }

      result.pop();
      usedColumns.delete(column);
    }

    return backtrack(rowIndex + 1);
  }

  const success = backtrack(0);
  if (!success) {
    throw new Error("Failed to generate valid cat placements");
  }

  const colorIds = random.shuffle(range(catCount));

  return result.map((point, index) => ({
    x: point.x,
    y: point.y,
    colorId: colorIds[index]
  }));
}

export function generateLevelWithCatCount(
  boardSize: number,
  catCount: number,
  seed?: string,
  regionSizes?: number[]
): LevelData {
  assertBoardSize(boardSize);
  assertCatCount(catCount);

  const resolvedSeed = seed ?? createSeed();
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const attemptSeed = `${resolvedSeed}:attempt:${attempt}`;

    try {
      const cats = generateCatPlacements(boardSize, catCount, attemptSeed);
      const grid = buildColorIds(boardSize, cats, attemptSeed, regionSizes);

      return {
        boardSize,
        catCount,
        lives: 3,
        seed: resolvedSeed,
        grid,
        cats
      };
    } catch {
      continue;
    }
  }

  throw new Error("Failed to generate a valid level after multiple attempts");
}

export function generateLevel(boardSize: number, seed?: string): LevelData {
  assertBoardSize(boardSize);

  const resolvedSeed = seed ?? createSeed();
  return generateLevelWithCatCount(boardSize, maxCats(boardSize), resolvedSeed);
}
