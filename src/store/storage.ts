import type { LevelData, TileViewState } from "../game/types";

const STORAGE_PREFIX = "gameshin_kitten_quest";

export const storageKeys = {
  run: `${STORAGE_PREFIX}:run`,
  completedLevels: `${STORAGE_PREFIX}:completed_levels`,
  highestCampaignLevel: `${STORAGE_PREFIX}:highest_campaign_level`
} as const;

export type PersistedRun = {
  version: 2;
  boardSize: number;
  campaignLevel: number;
  level: LevelData;
  tiles: TileViewState[][];
  foundCats: number;
  lives: number;
  status: "playing" | "won" | "lost";
};

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private-mode failures; the game can still run in memory.
  }
}

export function loadPersistedRun() {
  return readJson<PersistedRun>(storageKeys.run);
}

export function savePersistedRun(run: PersistedRun) {
  writeJson(storageKeys.run, run);
}

export function loadCompletedLevels() {
  return readJson<number[]>(storageKeys.completedLevels) ?? [];
}

export function saveCompletedLevels(levels: number[]) {
  writeJson(storageKeys.completedLevels, [...new Set(levels)].sort((a, b) => a - b));
}

export function loadHighestCampaignLevel() {
  return readJson<number>(storageKeys.highestCampaignLevel) ?? 1;
}

export function saveHighestCampaignLevel(levelNumber: number) {
  writeJson(storageKeys.highestCampaignLevel, levelNumber);
}
