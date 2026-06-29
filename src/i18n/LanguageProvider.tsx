import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language } from "./translations";
import { translations } from "./translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.zh;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLang(): Language {
  if (typeof window === "undefined") return "zh";
  const stored = window.localStorage.getItem("gameshin:language");
  if (stored === "en" || stored === "zh") return stored;
  return "zh";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  function setLang(next: Language) {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("gameshin:language", next);
    }
  }

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
