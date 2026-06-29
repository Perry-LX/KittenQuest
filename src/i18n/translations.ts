export const translations = {
  zh: {
    homeTitle: "小猫寻踪",
    homeSubtitle: "Kitten Quest",
    progressText: (done: number, total: number) => `${done} / ${total} 关已通关`,
    startGame: "开始游戏",
    selectLevel: "选择关卡",
    levelSelectTitle: "选择关卡",
    close: "关闭",
    levelTooltip: (id: number, size: number) => `第 ${id} 关 — ${size}×${size}`,
    levelLabel: "关卡",
    home: "主页",
    backHome: "← 主页",
    cats: "小猫",
    lives: "生命",
    rulesTitle: "游戏说明",
    rulesText:
      "在彩色网格中找出所有隐藏的小猫。\n\n" +
      "• 每关有一张 N×N 的彩色网格，每种颜色恰好藏有 1 只小猫\n" +
      "• 同色格子保持 8 邻域连通，构成一个颜色区域\n" +
      "• 每行、每列最多只有 1 只小猫\n" +
      "• 小猫之间不相邻（包括对角）\n\n" +
      "操作方式：\n" +
      "• 单击方块：放置 / 移除 🚩 标记\n" +
      "• 双击方块：揭示该方块，确认是否为小猫\n" +
      "• 揭示正确：显示 🐱，计入已找到\n" +
      "• 揭示错误：显示 ×，扣除一条命（共 3 条命）",
    status: "状态",
    statusPlaying: "进行中",
    statusWon: "已通关",
    statusLost: "失败",
    restart: "重开本关",
    resultWon: "全部找到",
    resultLost: "生命耗尽",
    resultDetail: (found: number, total: number) => `已确认 ${found} / ${total} 只小猫`,
    langSwitch: "EN",
    langTitle: "切换至英文",
  },
  en: {
    homeTitle: "Kitten Quest",
    homeSubtitle: "猫咪寻踪",
    progressText: (done: number, total: number) => `${done} / ${total} levels cleared`,
    startGame: "Start Game",
    selectLevel: "Select Level",
    levelSelectTitle: "Select Level",
    close: "Close",
    levelTooltip: (id: number, size: number) => `Level ${id} — ${size}×${size}`,
    levelLabel: "Level",
    home: "Home",
    backHome: "← Home",
    cats: "Cats",
    lives: "Lives",
    rulesTitle: "How to Play",
    rulesText:
      "Find all hidden kittens in the colored grid.\n\n" +
      "• Each level has an N×N colored grid. Each color hides exactly 1 kitten\n" +
      "• Same-colored cells are 8-directionally connected, forming a region\n" +
      "• Each row and column has at most 1 kitten\n" +
      "• Kittens are not adjacent (including diagonally)\n\n" +
      "Controls:\n" +
      "• Click a cell: place / remove 🚩 flag\n" +
      "• Double-click a cell: reveal it — is it a kitten?\n" +
      "• Correct: shows 🐱, counts as found\n" +
      "• Wrong: shows ×, loses a life (3 lives total)",
    status: "Status",
    statusPlaying: "Playing",
    statusWon: "Cleared",
    statusLost: "Failed",
    restart: "Restart",
    resultWon: "All Found!",
    resultLost: "No Lives Left",
    resultDetail: (found: number, total: number) => `${found} / ${total} cats found`,
    langSwitch: "中",
    langTitle: "Switch to Chinese",
  },
} as const;

export type Language = "zh" | "en";
export type TranslationKey = keyof typeof translations.zh;
