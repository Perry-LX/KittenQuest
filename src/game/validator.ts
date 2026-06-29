import type { CatPlacement, LevelData } from "./types";
import { maxCats } from "./generator";

function areCatsSeparated(cats: CatPlacement[]) {
  for (let index = 0; index < cats.length; index += 1) {
    for (let other = index + 1; other < cats.length; other += 1) {
      const dx = Math.abs(cats[index].x - cats[other].x);
      const dy = Math.abs(cats[index].y - cats[other].y);
      if (dx <= 1 && dy <= 1) {
        return false;
      }
    }
  }

  return true;
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

function isColorConnected(level: LevelData, colorId: number) {
  const positions: Array<{ x: number; y: number }> = [];

  for (const row of level.grid) {
    for (const tile of row) {
      if (tile.colorId === colorId) {
        positions.push({ x: tile.x, y: tile.y });
      }
    }
  }

  if (positions.length === 0) {
    return false;
  }

  const visited = new Set<string>();
  const queue = [positions[0]];
  visited.add(`${positions[0].x}:${positions[0].y}`);

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const neighbor of getNeighbors(current.x, current.y, level.boardSize)) {
      if (level.grid[neighbor.y][neighbor.x].colorId !== colorId) {
        continue;
      }

      const key = `${neighbor.x}:${neighbor.y}`;
      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      queue.push(neighbor);
    }
  }

  return visited.size === positions.length;
}

export function validateLevel(level: LevelData) {
  if (level.catCount > maxCats(level.boardSize)) {
    return false;
  }

  if (level.cats.length !== level.catCount) {
    return false;
  }

  const rows = new Set(level.cats.map((cat) => cat.y));
  const cols = new Set(level.cats.map((cat) => cat.x));
  const colors = new Set(level.cats.map((cat) => cat.colorId));

  if (rows.size !== level.catCount || cols.size !== level.catCount || colors.size !== level.catCount) {
    return false;
  }

  if (!areCatsSeparated(level.cats)) {
    return false;
  }

  for (let colorId = 0; colorId < level.catCount; colorId += 1) {
    let occurrences = 0;
    for (const row of level.grid) {
      for (const tile of row) {
        if (tile.colorId === colorId) {
          occurrences += 1;
        }
      }
    }
    if (occurrences < 1) {
      return false;
    }

    if (!isColorConnected(level, colorId)) {
      return false;
    }
  }

  for (const cat of level.cats) {
    if (level.grid[cat.y][cat.x].colorId !== cat.colorId) {
      return false;
    }
  }

  return true;
}
