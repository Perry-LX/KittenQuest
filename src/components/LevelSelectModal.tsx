import { useGameStore } from "../store/gameStore";
import { campaign } from "../game/campaign";
import { useLanguage } from "../i18n/LanguageProvider";

type LevelSelectModalProps = {
  onSelect: (levelId: number) => void;
  onClose: () => void;
};

export function LevelSelectModal({ onSelect, onClose }: LevelSelectModalProps) {
  const completedLevels = useGameStore((state) => state.completedLevels);
  const { t } = useLanguage();

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{t.levelSelectTitle}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label={t.close}>
            ✕
          </button>
        </div>

        <div className="modal-grid">
          {campaign.map((entry) => {
            const completed = completedLevels.includes(entry.id);
            return (
              <button
                key={entry.id}
                type="button"
                className={`level-cell ${completed ? "level-cell--completed" : "level-cell--locked"}`}
                disabled={!completed}
                onClick={() => completed && onSelect(entry.id)}
                title={t.levelTooltip(entry.id, entry.boardSize)}
              >
                <span className="level-cell__id">{entry.id}</span>
                <span className="level-cell__size">{entry.boardSize}×{entry.boardSize}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
