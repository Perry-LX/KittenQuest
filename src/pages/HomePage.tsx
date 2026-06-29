import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { campaign } from "../game/campaign";
import { LevelSelectModal } from "../components/LevelSelectModal";
import { useLanguage } from "../i18n/LanguageProvider";

type HomePageProps = {
  onStart: () => void;
};

function findNextLevel(completedLevels: number[], campaignLevel: number): number {
  // If the current level hasn't been completed, resume it
  if (!completedLevels.includes(campaignLevel)) {
    return campaignLevel;
  }
  // Current level is already done, find the next uncompleted one
  for (let i = campaignLevel + 1; i <= campaign.length; i++) {
    if (!completedLevels.includes(i)) return i;
  }
  return campaign.length;
}

export function HomePage({ onStart }: HomePageProps) {
  const completedLevels = useGameStore((state) => state.completedLevels);
  const campaignLevel = useGameStore((state) => state.campaignLevel);
  const startCampaignLevel = useGameStore((state) => state.startCampaignLevel);
  const [showModal, setShowModal] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const totalLevels = campaign.length;
  const completedCount = completedLevels.length;

  function handleStartGame() {
    const next = findNextLevel(completedLevels, campaignLevel);
    startCampaignLevel(next);
    onStart();
  }

  function handleSelectLevel(id: number) {
    startCampaignLevel(id);
    setShowModal(false);
    onStart();
  }

  return (
    <main className="home-page">
      <button
        type="button"
        className="lang-switch"
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        title={t.langTitle}
      >
        {t.langSwitch}
      </button>

      <div className="home-card">
        <img src="/favicon.png" alt="" className="home-cat-icon" />
        <h1 className="home-title">{t.homeTitle}</h1>
        <p className="home-subtitle">{t.homeSubtitle}</p>

        <div className="home-progress">
          <div className="home-progress-bar">
            <div
              className="home-progress-fill"
              style={{ width: `${(completedCount / totalLevels) * 100}%` }}
            />
          </div>
          <span className="home-progress-text">
            {t.progressText(completedCount, totalLevels)}
          </span>
        </div>

        <div className="home-actions">
          <button type="button" className="home-btn home-btn--primary" onClick={handleStartGame}>
            {t.startGame}
          </button>
          <button type="button" className="home-btn home-btn--secondary" onClick={() => setShowModal(true)}>
            {t.selectLevel}
          </button>
        </div>
      </div>

      {showModal && (
        <LevelSelectModal
          onSelect={handleSelectLevel}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
