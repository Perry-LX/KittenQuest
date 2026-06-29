import { useMemo, useRef } from "react";
import { Tile } from "./Tile";
import { useGameStore } from "../store/gameStore";
import type { TileData } from "../game/types";

const DOUBLE_CLICK_THRESHOLD = 400;

export function GameBoard() {
  const level = useGameStore((state) => state.level);
  const tiles = useGameStore((state) => state.tiles);
  const cycleMark = useGameStore((state) => state.cycleMark);
  const revealCat = useGameStore((state) => state.revealCat);

  const lastClick = useRef<{ x: number; y: number; time: number } | null>(null);

  const catSet = useMemo(() => {
    return new Set(level.cats.map((cat) => `${cat.x}:${cat.y}`));
  }, [level.cats]);

  function handleTileClick(tile: TileData) {
    const now = performance.now();
    const prev = lastClick.current;

    if (prev && prev.x === tile.x && prev.y === tile.y && now - prev.time < DOUBLE_CLICK_THRESHOLD) {
      lastClick.current = null;
      revealCat(tile.x, tile.y);
      return;
    }

    lastClick.current = { x: tile.x, y: tile.y, time: now };
    cycleMark(tile.x, tile.y);
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "clamp(3px, 0.6vw, 8px)",
        gridTemplateColumns: `repeat(${level.boardSize}, minmax(0, 1fr))`,
        width: "min(calc(100vw - 32px), calc(100dvh - 340px))",
        aspectRatio: "1",
        margin: "20px auto 0"
      }}
    >
      {level.grid.flat().map((tile) => {
        const viewState = tiles[tile.y][tile.x];
        const isCat = catSet.has(`${tile.x}:${tile.y}`);

        return (
          <Tile
            key={`${tile.x}-${tile.y}`}
            tile={tile}
            state={viewState}
            isCat={isCat}
            onClick={() => handleTileClick(tile)}
          />
        );
      })}
    </div>
  );
}
