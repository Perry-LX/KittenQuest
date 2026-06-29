import { useState } from "react";
import { campaign } from "../game/campaign";
import { useGameStore } from "../store/gameStore";
import { useLanguage } from "../i18n/LanguageProvider";
import { HowToPlayModal } from "./HowToPlayModal";

type HudProps = {
  onRestart?: () => void;
  onBack: () => void;
};

export function Hud({ onRestart, onBack }: HudProps) {
  const boardSize = useGameStore((state) => state.boardSize);
  const foundCats = useGameStore((state) => state.foundCats);
  const catCount = useGameStore((state) => state.level.catCount);
  const lives = useGameStore((state) => state.lives);
  const campaignLevel = useGameStore((state) => state.campaignLevel);
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [showRules, setShowRules] = useState(false);

  return (
    <>
      <nav className="hud" aria-label={t.home}>
        <div className="hud__bar">
          <button
            type="button"
            className="hud__home-btn"
            onClick={onBack}
            title={t.backHome}
            aria-label={t.backHome}
          >
            ← {t.home}
          </button>

          <div className="hud__bar-info">
            <span className="hud__bar-level" aria-label={`Level ${campaignLevel} of ${campaign.length}`}>
              {t.levelLabel} {campaignLevel}/{campaign.length}
            </span>
            <span className="hud__bar-size" aria-label={`${boardSize} by ${boardSize} grid`}>
              {boardSize}×{boardSize}
            </span>
          </div>

          <div className="hud__bar-lives" role="img" aria-label={`${lives} ${t.lives} ${t.lives}`}>
            {Array.from({ length: lives }, (_, i) => (
              <svg key={`full-${i}`} className="hud__heart hud__heart--full" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z"/>
              </svg>
            ))}
            {Array.from({ length: Math.max(0, 3 - lives) }, (_, i) => (
              <svg key={`empty-${i}`} className="hud__heart hud__heart--empty" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z"/>
              </svg>
            ))}
          </div>

          <button
            type="button"
            className="hud__rules-btn"
            onClick={() => setShowRules(true)}
            title={t.rulesTitle}
            aria-label={t.rulesTitle}
          >
            ?
          </button>

          <button
            type="button"
            className={`hud__bar-toggle ${open ? "hud__bar-toggle--open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? t.close : t.status}
            aria-expanded={open}
          >
            ▼
          </button>
        </div>

        {open && (
          <div className="hud__dropdown" role="region" aria-label={t.status}>
            <div className="hud__dropdown-row">
              <span className="hud__dropdown-label">{t.cats}</span>
              <strong>{foundCats} / {catCount}</strong>
            </div>

            {onRestart && (
              <button className="hud__restart-btn" type="button" onClick={onRestart}>
                {t.restart}
              </button>
            )}
          </div>
        )}
      </nav>

      {showRules && <HowToPlayModal onClose={() => setShowRules(false)} />}
    </>
  );
}
