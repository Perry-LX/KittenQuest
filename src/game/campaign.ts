import campaignLevels from "./campaign.generated.json";
import { generateLevelWithCatCount } from "./generator";
import type { LevelData } from "./types";

export type CampaignLevelEntry = {
  id: number;
  seed: string;
  boardSize: number;
  catCount: number;
  regionSizes: number[];
};

export const campaign = campaignLevels as CampaignLevelEntry[];

export function generateCampaignLevel(levelNumber: number): LevelData {
  const entry = campaign[levelNumber - 1];

  if (!entry) {
    throw new Error(`Campaign level ${levelNumber} does not exist`);
  }

  return generateLevelWithCatCount(entry.boardSize, entry.catCount, entry.seed, entry.regionSizes);
}
