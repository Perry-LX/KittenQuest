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

  const [introLine, ...restLines] = t.rulesText.split("\n");

  // Split remaining lines into sections separated by blank lines
  const sections: string[][] = [];
  let current: string[] = [];
  for (const line of restLines) {
    if (line.trim() === "") {
      if (current.length > 0) {
        sections.push(current);
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) sections.push(current);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rules-modal__header">
          <span className="rules-modal__icon">
            <img src="/favicon.png" alt="" className="rules-modal__icon-img" />
          </span>
          <h2 className="rules-modal__title">{t.rulesTitle}</h2>
          <button type="button" className="rules-modal__close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <div className="rules-modal__body">
          <p className="rules-modal__intro">{renderWithCatIcon(introLine)}</p>

          {sections.map((para, i) => (
            <div key={i} className="rules-modal__section">
              {para.map((line, j) => {
                const trimmed = line.trimStart();
                const isHeader = trimmed.endsWith("：") || trimmed.endsWith(":");
                const isBullet = trimmed.startsWith("•");

                if (isHeader) {
                  return (
                    <h3 key={j} className="rules-modal__subtitle">
                      {trimmed}
                    </h3>
                  );
                }
                if (isBullet) {
                  return (
                    <p key={j} className="rules-modal__bullet">
                      {renderWithCatIcon(trimmed)}
                    </p>
                  );
                }
                return (
                  <p key={j} className="rules-modal__text">
                    {renderWithCatIcon(trimmed)}
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
