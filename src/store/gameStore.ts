import { create } from "zustand";
import { campaign, generateCampaignLevel } from "../game/campaign";
import type { LevelData, MarkState, TileViewState } from "../game/types";
import {
  loadCompletedLevels,
  loadHighestCampaignLevel,
  loadPersistedRun,
  saveCompletedLevels,
  saveHighestCampaignLevel,
  savePersistedRun
} from "./storage";

type GameStatus = "playing" | "won" | "lost";

type GameStore = {
  boardSize: number;
  campaignLevel: number;
  completedLevels: number[];
  highestCampaignLevel: number;
  level: LevelData;
  tiles: TileViewState[][];
  foundCats: number;
  lives: number;
  status: GameStatus;
  startCampaignLevel: (levelNumber: number) => void;
  nextCampaignLevel: () => void;
  cycleMark: (x: number, y: number) => void;
  revealCat: (x: number, y: number) => void;
};

function createInitialTiles(level: LevelData): TileViewState[][] {
  return Array.from({ length: level.boardSize }, () =>
    Array.from({ length: level.boardSize }, () => ({
      mark: "none" as MarkState,
      revealed: false,
      wrongGuess: false
    }))
  );
}

function createGameState(level: LevelData, campaignLevel: number) {
  return {
    boardSize: level.boardSize,
    campaignLevel,
    level,
    tiles: createInitialTiles(level),
    foundCats: 0,
    lives: level.lives,
    status: "playing" as GameStatus
  };
}

function createPersistableState(state: GameStore) {
  return {
    version: 2 as const,
    boardSize: state.boardSize,
    campaignLevel: state.campaignLevel,
    level: state.level,
    tiles: state.tiles,
    foundCats: state.foundCats,
    lives: state.lives,
    status: state.status
  };
}

function persistState(state: GameStore) {
  savePersistedRun(createPersistableState(state));
  saveCompletedLevels(state.completedLevels);
  saveHighestCampaignLevel(state.highestCampaignLevel);
}

function createInitialState() {
  const persistedRun = loadPersistedRun();
  const completedLevels = loadCompletedLevels();
  const highestCampaignLevel = loadHighestCampaignLevel();

  if (
    persistedRun?.version === 2 &&
    persistedRun.level.boardSize >= 6 &&
    persistedRun.level.boardSize <= 13 &&
    persistedRun.level.catCount === persistedRun.level.boardSize
  ) {
    return {
      boardSize: persistedRun.boardSize,
      campaignLevel: persistedRun.campaignLevel,
      completedLevels,
      highestCampaignLevel,
      level: persistedRun.level,
      tiles: persistedRun.tiles,
      foundCats: persistedRun.foundCats,
      lives: persistedRun.lives,
      status: persistedRun.status
    };
  }

  return {
    ...createGameState(generateCampaignLevel(highestCampaignLevel), highestCampaignLevel),
    completedLevels,
    highestCampaignLevel
  };
}

export const useGameStore = create<GameStore>((set) => ({
  ...createInitialState(),
  startCampaignLevel: (levelNumber) => {
    set((state) => {
      const boundedLevel = Math.min(campaign.length, Math.max(1, levelNumber));
      const nextState = {
        ...state,
        ...createGameState(generateCampaignLevel(boundedLevel), boundedLevel),
        highestCampaignLevel: Math.max(state.highestCampaignLevel, boundedLevel)
      };
      persistState(nextState);
      return nextState;
    });
  },
  nextCampaignLevel: () => {
    set((state) => {
      const nextLevel = state.campaignLevel <= 0 ? 1 : Math.min(campaign.length, state.campaignLevel + 1);
      const nextState = {
        ...state,
        ...createGameState(generateCampaignLevel(nextLevel), nextLevel),
        highestCampaignLevel: Math.max(state.highestCampaignLevel, nextLevel)
      };
      persistState(nextState);
      return nextState;
    });
  },
  cycleMark: (x, y) => {
    set((state) => {
      if (state.status !== "playing") {
        return state;
      }

      const current = state.tiles[y][x];
      if (current.revealed) {
        return state;
      }

      const nextMark: MarkState = current.mark === "none" ? "suspect" : "none";

      const tiles = state.tiles.map((row, rowIndex) =>
        row.map((tile, columnIndex) =>
          rowIndex === y && columnIndex === x ? { ...tile, mark: nextMark } : tile
        )
      );
      const nextState = { ...state, tiles };
      persistState(nextState);
      return nextState;
    });
  },
  revealCat: (x, y) => {
    set((state) => {
      if (state.status !== "playing") {
        return state;
      }

      const tileState = state.tiles[y][x];
      if (tileState.revealed) {
        return state;
      }

      const isCat = state.level.cats.some((cat) => cat.x === x && cat.y === y);
      const tiles = state.tiles.map((row, rowIndex) =>
        row.map((tile, columnIndex) => {
          if (rowIndex !== y || columnIndex !== x) {
            return tile;
          }

          return {
            ...tile,
            revealed: true,
            wrongGuess: !isCat,
            mark: "none" as MarkState
          };
        })
      );

      if (isCat) {
        const foundCats = state.foundCats + 1;
        const status: GameStatus = foundCats === state.level.catCount ? "won" : "playing";
        const completedLevels =
          status === "won" && state.campaignLevel > 0
            ? [...new Set([...state.completedLevels, state.campaignLevel])]
            : state.completedLevels;
        const nextState = { ...state, tiles, foundCats, status, completedLevels };
        persistState(nextState);
        return nextState;
      }

      const lives = state.lives - 1;
      const status: GameStatus = lives <= 0 ? "lost" : "playing";
      const nextState = { ...state, tiles, lives, status };
      persistState(nextState);
      return nextState;
    });
  }
}));
