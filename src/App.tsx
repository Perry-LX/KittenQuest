import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { GamePage } from "./pages/GamePage";
import { LanguageProvider } from "./i18n/LanguageProvider";

export default function App() {
  const [page, setPage] = useState<"home" | "game">("home");

  return (
    <LanguageProvider>
      {page === "home" ? (
        <HomePage onStart={() => setPage("game")} />
      ) : (
        <GamePage onBack={() => setPage("home")} />
      )}
    </LanguageProvider>
  );
}
