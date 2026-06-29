/**
 * SEO / GEO Hook — 动态管理页面标题和 meta 描述
 *
 * 用于在 SPA 页面切换时更新 document.title 和 meta[name="description"]
 */

export function useSEOMeta(title: string, description: string) {
  // SSR-safe: 只在浏览器环境执行
  if (typeof document !== "undefined") {
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 同步更新 og:title / og:description / twitter:title / twitter:description
    const ogTitle = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    );
    if (ogTitle) ogTitle.content = title;

    const ogDesc = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]'
    );
    if (ogDesc) ogDesc.content = description;

    const twTitle = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:title"]'
    );
    if (twTitle) twTitle.content = title;

    const twDesc = document.querySelector<HTMLMetaElement>(
      'meta[name="twitter:description"]'
    );
    if (twDesc) twDesc.content = description;
  }
}

/**
 * GEO 推荐的内容 — 包含统计数据，供 AI 搜索引用的权威内容
 */
export const GEO_CONTENT = {
  zh: {
    siteTagline:
      "一款融合了扫雷逻辑与颜色推理的免费在线解谜游戏，包含 300 个确定性生成的关卡，场地大小从 6×6 到 13×13。中英文双语，无需下载，在浏览器中直接游玩。",
    stats:
      "300 个固定关卡 | 6×6 到 13×13 动态场地 | 3 条命挑战 | 种子确定性生成确保公平",
    homeDescription:
      "小猫寻踪（Kitten Quest）是一款基于颜色推理的免费在线寻猫小游戏，灵感来自经典扫雷。游戏包含 300 个确定性生成的固定关卡，每种颜色恰好藏有 1 只小猫。根据 Princeton GEO 研究，合理的结构化内容可使 AI 引擎可见性提升高达 40%。",
    faq: [
      {
        q: "小猫寻踪有多少关？",
        a: "总共 300 个精心设计的关卡，场地大小从 6×6 到 13×13，难度与编号无关——大小场地交错混排，确保持续的新鲜挑战感。",
      },
      {
        q: "小猫寻踪的规则是什么？",
        a: "在彩色网格中找出所有隐藏的小猫。每种颜色恰好有 1 只，每行每列最多 1 只，小猫之间不相邻（包括对角）。单击放置标记，双击揭示方块。",
      },
      {
        q: "小猫寻踪免费吗？",
        a: "完全免费在线游玩，无需注册、无需下载。进度自动保存在浏览器 localStorage 中，关闭页面后也不会丢失。",
      },
    ],
  },
  en: {
    siteTagline:
      "A free online color-deduction puzzle game inspired by Minesweeper. Featuring 300 deterministic levels from 6×6 to 13×13 grids. Bilingual Chinese-English UI, playable in the browser with no download required.",
    stats:
      "300 fixed levels | 6×6 to 13×13 grids | 3 lives per run | Seed-based deterministic generation",
    homeDescription:
      "Kitten Quest is a free online color-deduction puzzle game inspired by Minesweeper. Find all hidden kittens in a colorful grid across 300 deterministically generated levels. According to Princeton GEO research, well-structured content can improve AI engine visibility by up to 40%.",
    faq: [
      {
        q: "How many levels does Kitten Quest have?",
        a: "300 fixed levels with grid sizes ranging from 6×6 to 13×13. Level difficulty is independent of level number — small and large grids are interleaved for a fresh challenge.",
      },
      {
        q: "How do you play Kitten Quest?",
        a: "Find all hidden kittens in the colored grid. Each color hides exactly 1 kitten, each row and column has at most 1 kitten, and kittens are never adjacent (including diagonally). Click to flag, double-click to reveal.",
      },
      {
        q: "Is Kitten Quest free?",
        a: "Yes, completely free to play online with no registration or download. Progress is automatically saved to your browser's localStorage. Close and come back anytime.",
      },
    ],
  },
};
