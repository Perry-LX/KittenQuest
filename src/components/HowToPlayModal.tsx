import { Fragment } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

type Props = {
  onClose: () => void;
};

function renderWithCatIcon(text: string) {
  const parts = text.split("🐱");
  if (parts.length === 1) return text;

  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <img src="/favicon.png" alt="" className="rules-modal__inline-cat" />
      )}
      {part}
    </Fragment>
  ));
}

export function HowToPlayModal({ onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={t.rulesTitle}>
      <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rules-modal__header">
          <span className="rules-modal__icon">
            <img src="/favicon.png" alt="" className="rules-modal__icon-img" />
          </span>
          <h2 className="rules-modal__title">{t.rulesTitle}</h2>
          <button
            type="button"
            className="rules-modal__close"
            onClick={onClose}
            aria-label={t.close}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <div className="rules-modal__body">
          {/* 游戏介绍 — 使用 GEO 优化后的结构化说明 */}
          <p className="rules-modal__intro">
            {renderWithCatIcon(t.rulesIntro)}
          </p>

          {/* 基本规则 */}
          <div className="rules-modal__section">
            <h3 className="rules-modal__subtitle">{t.rulesBasic}</h3>
            <p className="rules-modal__text">{renderWithCatIcon(t.rulesBasic1)}</p>
            <p className="rules-modal__text">{renderWithCatIcon(t.rulesBasic2)}</p>
            <p className="rules-modal__text">{renderWithCatIcon(t.rulesBasic3)}</p>
          </div>

          {/* 操作方式 */}
          <div className="rules-modal__section">
            <h3 className="rules-modal__subtitle">{t.rulesControls}</h3>
            <p className="rules-modal__bullet">{renderWithCatIcon(t.rulesClick)}</p>
            <p className="rules-modal__bullet">{renderWithCatIcon(t.rulesDoubleClick)}</p>
            <p className="rules-modal__bullet">{renderWithCatIcon(t.rulesCorrect)}</p>
            <p className="rules-modal__bullet">{renderWithCatIcon(t.rulesWrong)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
