import { GameBoard } from "../components/GameBoard";
import { Hud } from "../components/Hud";
import { ResultPanel } from "../components/ResultPanel";
import { useGameStore } from "../store/gameStore";

type GamePageProps = {
  onBack: () => void;
};

export function GamePage({ onBack }: GamePageProps) {
  const campaignLevel = useGameStore((state) => state.campaignLevel);
  const startCampaignLevel = useGameStore((state) => state.startCampaignLevel);

  const restart = () => {
    startCampaignLevel(campaignLevel);
  };

  return (
    <div className="game-page">
      <Hud onBack={onBack} onRestart={restart} />
      <GameBoard />
      <ResultPanel />
    </div>
  );
}
