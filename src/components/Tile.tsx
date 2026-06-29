import { type ReactNode } from "react";
import type { TileData, TileViewState } from "../game/types";

type TileProps = {
  tile: TileData;
  state: TileViewState;
  isCat: boolean;
  onClick: () => void;
};

const palette = [
  "#ff8a80",
  "#ffd180",
  "#ffff8d",
  "#b9f6ca",
  "#80d8ff",
  "#82b1ff",
  "#ea80fc"
];

export function Tile({ tile, state, isCat, onClick }: TileProps) {
  const color = palette[tile.colorId % palette.length];

  let content: ReactNode = "";
  if (state.revealed && isCat) {
    content = <img src="/favicon.png" alt="" className="tile__cat" />;
  } else if (state.revealed && state.wrongGuess) {
    content = "×";
  } else if (state.mark === "suspect") {
    content = "⚑";
  } else if (state.mark === "blocked") {
    content = "•";
  }

  return (
    <button
      type="button"
      className={`tile ${state.revealed ? "tile--revealed" : ""} ${state.wrongGuess ? "tile--wrong" : ""}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      aria-label={`tile-${tile.x}-${tile.y}`}
    >
      <span>{content}</span>
    </button>
  );
}
