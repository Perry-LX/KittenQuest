import { useGameStore } from "../store/gameStore";
import { useLanguage } from "../i18n/LanguageProvider";

export function ResultPanel() {
  const status = useGameStore((state) => state.status);
  const catCount = useGameStore((state) => state.level.catCount);
  const foundCats = useGameStore((state) => state.foundCats);
  const { t } = useLanguage();

  if (status === "playing") {
    return null;
  }

  return (
    <section className={`result-panel ${status === "won" ? "result-panel--win" : "result-panel--lose"}`}>
      <h2>{status === "won" ? t.resultWon : t.resultLost}</h2>
      <p>{t.resultDetail(foundCats, catCount)}</p>
    </section>
  );
}
