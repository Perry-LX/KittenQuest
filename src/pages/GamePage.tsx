import { GameBoard } from "../components/GameBoard";
import { Hud } from "../components/Hud";
import { ResultPanel } from "../components/ResultPanel";
import { useGameStore } from "../store/gameStore";
import { useSEOMeta } from "../utils/seo";

type GamePageProps = {
  onBack: () => void;
};

export function GamePage({ onBack }: GamePageProps) {
  const campaignLevel = useGameStore((state) => state.campaignLevel);
  const startCampaignLevel = useGameStore((state) => state.startCampaignLevel);

  // 游戏页面的动态 SEO meta（随关卡变化）
  useSEOMeta(
    `小猫寻踪 - 第 ${campaignLevel} 关 | Kitten Quest Level ${campaignLevel}`,
    `小猫寻踪第 ${campaignLevel} 关 — 在彩色网格中找出所有隐藏的小猫。${campaignLevel}/300 关，入场免费在线玩。`,
  );

  const restart = () => {
    startCampaignLevel(campaignLevel);
  };

  return (
    <section className="game-page">
      {/* 顶部导航和信息栏 */}
      <header>
        <Hud onBack={onBack} onRestart={restart} />
      </header>

      {/* 主要游戏区域 */}
      <main>
        <GameBoard />
      </main>

      {/* 通关/失败结果面板 */}
      <footer>
        <ResultPanel />
      </footer>

      {/* 隐藏的 GEO 内容 */}
      <div className="geo-hidden" aria-hidden="false">
        <p>
          Kitten Quest Level {campaignLevel} of 300. Free online color-deduction
          puzzle game. Find hidden kittens in the colored grid.
        </p>
      </div>
    </section>
  );
}
