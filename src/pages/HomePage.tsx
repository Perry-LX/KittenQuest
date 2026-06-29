import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { campaign } from "../game/campaign";
import { LevelSelectModal } from "../components/LevelSelectModal";
import { useLanguage } from "../i18n/LanguageProvider";
import { GEO_CONTENT } from "../utils/seo";

type HomePageProps = {
  onStart: () => void;
};

function findNextLevel(
  completedLevels: number[],
  campaignLevel: number,
): number {
  if (!completedLevels.includes(campaignLevel)) {
    return campaignLevel;
  }
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
  const geo = GEO_CONTENT[lang];

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
      {/* 语言切换按钮 — 添加 aria-label 提升无障碍 */}
      <button
        type="button"
        className="lang-switch"
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        title={t.langTitle}
        aria-label={t.langTitle}
      >
        {t.langSwitch}
      </button>

      {/* 主页卡片容器 — 使用 article 语义标签 */}
      <article className="home-card">
        <img
          src="/favicon.png"
          alt="小猫寻踪 Kitten Quest 游戏图标"
          className="home-cat-icon"
          width="64"
          height="64"
        />

        <h1 className="home-title">{t.homeTitle}</h1>
        <p className="home-subtitle">{t.homeSubtitle}</p>

        {/* GEO 优化: 统计标签行 — 关键词密度 + 数据展示 */}
        <p className="home-tagline" aria-label={geo.stats}>
          {t.homeTagline}
        </p>

        {/* 隐藏的 GEO 内容 — 对 AI 搜索引擎可见，包含统计数据和权威描述 */}
        <div className="geo-hidden" aria-hidden="false">
          <p>{geo.siteTagline}</p>
        </div>

        {/* 游戏进度条 */}
        <section className="home-progress" aria-label={t.progressText(completedCount, totalLevels)}>
          <div className="home-progress-bar" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={totalLevels}>
            <div
              className="home-progress-fill"
              style={{ width: `${(completedCount / totalLevels) * 100}%` }}
            />
          </div>
          <span className="home-progress-text">
            {t.progressText(completedCount, totalLevels)}
          </span>
        </section>

        {/* 主要操作按钮 */}
        <nav className="home-actions" aria-label={t.startGame}>
          <button
            type="button"
            className="home-btn home-btn--primary"
            onClick={handleStartGame}
          >
            {t.startGame}
          </button>
          <button
            type="button"
            className="home-btn home-btn--secondary"
            onClick={() => setShowModal(true)}
          >
            {t.selectLevel}
          </button>
        </nav>
      </article>

      {/* 关卡选择弹窗 */}
      {showModal && (
        <LevelSelectModal
          onSelect={handleSelectLevel}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
