import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { GamePage } from "./pages/GamePage";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useSEOMeta } from "./utils/seo";

export default function App() {
  const [page, setPage] = useState<"home" | "game">("home");

  // 全局 SEO meta（初始加载时对搜索引擎可见）
  useSEOMeta(
    "小猫寻踪 (Kitten Quest) — 颜色推理寻猫小游戏 | 免费在线玩",
    "小猫寻踪是一款基于颜色推理的免费在线寻猫小游戏，灵感来自扫雷。在彩色网格中找出所有隐藏的小猫！300个固定关卡，中英文双语，PC 和手机均可免费游玩，无需下载。",
  );

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
