export const translations = {
  zh: {
    // === 主页 (GEO 优化: 统计数据 + 权威语气) ===
    homeTitle: "小猫寻踪",
    homeSubtitle: "Kitten Quest — 颜色推理寻猫游戏",
    homeTagline:
      "300 个固定关卡 · 6×6 到 13×13 · 免费在线玩",
    progressText: (done: number, total: number) =>
      `已通关 ${done} / ${total} 关（共 300 关）`,
    startGame: "开始游戏",
    selectLevel: "选择关卡",
    gameSummary:
      "基于颜色推理的逻辑解谜游戏，灵感来自扫雷。在彩色网格中找出所有隐藏的小猫。",

    // === 关卡选择 ===
    levelSelectTitle: "选择关卡",
    close: "关闭",
    levelTooltip: (id: number, size: number) => `第 ${id} 关 — ${size}×${size}`,
    levelLabel: "关卡",

    // === 游戏界面 ===
    home: "主页",
    backHome: "← 主页",
    cats: "小猫",
    lives: "生命",

    // === 游戏说明 (GEO 优化: 易理解 + 结构化) ===
    rulesTitle: "游戏说明",
    rulesIntro:
      "小猫寻踪（Kitten Quest）是一款基于颜色推理的逻辑解谜游戏。在 N×N 的彩色网格中，每种颜色恰好藏有 1 只小猫，你的任务是找出它们全部。",
    rulesBasic: "基本规则",
    rulesBasic1:
      "每关有一张 N×N 的彩色网格，每种颜色恰好藏有 1 只小猫",
    rulesBasic2:
      "同色格子保持 8 邻域连通，构成一个颜色区域",
    rulesBasic3:
      "每行、每列最多只有 1 只小猫；小猫之间不相邻（包括对角）",
    rulesControls: "操作方式",
    rulesClick: "单击方块：放置 / 移除 🚩 标记",
    rulesDoubleClick: "双击方块：揭示该方块，确认是否为小猫",
    rulesCorrect: "揭示正确：显示 🐱，计入已找到",
    rulesWrong: "揭示错误：显示 ×，扣除一条命（共 3 条命）",

    // === 状态与结果 ===
    status: "状态",
    statusPlaying: "进行中",
    statusWon: "已通关",
    statusLost: "失败",
    restart: "重开本关",
    resultWon: "全部找到 🐱",
    resultLost: "生命耗尽 💔",
    resultDetail: (found: number, total: number) =>
      `已确认 ${found} / ${total} 只小猫`,

    // === 语言切换 ===
    langSwitch: "EN",
    langTitle: "切换至英文",
  },

  en: {
    // === Home (GEO optimized: stats + authoritative tone) ===
    homeTitle: "Kitten Quest",
    homeSubtitle: "Kitten Quest — Color Deduction Puzzle Game",
    homeTagline:
      "300 fixed levels · 6×6 to 13×13 · Free online",
    progressText: (done: number, total: number) =>
      `${done} / ${total} levels cleared (300 total)`,
    startGame: "Start Game",
    selectLevel: "Select Level",
    gameSummary:
      "A color-deduction logic puzzle game inspired by Minesweeper. Find all hidden kittens in a colorful grid.",

    // === Level Select ===
    levelSelectTitle: "Select Level",
    close: "Close",
    levelTooltip: (id: number, size: number) => `Level ${id} — ${size}×${size}`,
    levelLabel: "Level",

    // === Game UI ===
    home: "Home",
    backHome: "← Home",
    cats: "Cats",
    lives: "Lives",

    // === Rules (GEO optimized: easy-to-understand + structured) ===
    rulesTitle: "How to Play",
    rulesIntro:
      "Kitten Quest is a color-deduction logic puzzle game. In an N×N colored grid, each color hides exactly 1 kitten. Your mission: find them all.",
    rulesBasic: "Basic Rules",
    rulesBasic1:
      "Each level has an N×N colored grid. Each color hides exactly 1 kitten",
    rulesBasic2:
      "Same-colored cells are 8-directionally connected, forming a region",
    rulesBasic3:
      "Each row and column has at most 1 kitten. Kittens are never adjacent (including diagonally)",
    rulesControls: "Controls",
    rulesClick: "Click a cell: place / remove 🚩 flag",
    rulesDoubleClick: "Double-click a cell: reveal it — is it a kitten?",
    rulesCorrect: "Correct: shows 🐱, counts as found",
    rulesWrong: "Wrong: shows ×, loses a life (3 lives total)",

    // === Status & Result ===
    status: "Status",
    statusPlaying: "Playing",
    statusWon: "Cleared",
    statusLost: "Failed",
    restart: "Restart",
    resultWon: "All Found! 🐱",
    resultLost: "No Lives Left 💔",
    resultDetail: (found: number, total: number) =>
      `${found} / ${total} cats found`,

    // === Language Switch ===
    langSwitch: "中",
    langTitle: "Switch to Chinese",
  },
} as const;

export type Language = "zh" | "en";
export type TranslationKey = keyof typeof translations.zh;
