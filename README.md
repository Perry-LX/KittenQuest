# 🐱 小猫寻踪 (Kitten Quest)

一个基于颜色推理的寻猫小游戏，灵感来自扫雷。在彩色网格中找出所有隐藏的小猫！

## 游戏规则

- 每关有一张 N×N 的彩色网格，每种颜色恰好藏有 **1 只小猫**
- 同色格子保持 8 邻域连通，构成一个颜色区域
- 每行、每列最多只有 1 只小猫
- 小猫之间不相邻（包括对角）
- 目标：找出所有小猫

## 操作方式

| 操作 | 效果 |
|------|------|
| **单击** 方块 | 放置/移除 🚩 旗帜标记 |
| **快速双击** 同一方块 | 揭示该方块，确认是否为小猫 |
| **揭示正确** | 显示 🐱，计入已找到 |
| **揭示错误** | 显示 ×，扣除一条命（共 3 条命） |

## 游戏特性

- **300 个固定关卡**，场地从 6×6 到 13×13
- **难度混排**：关卡难度不随编号递增，大小场地交错分布
- **中英文切换**：主页右上角一键切换，游戏规则弹窗跟随语言
- **游戏说明弹窗**：关卡内右上角 `?` 按钮，查看完整规则
- **关卡选择弹窗**：流式网格布局，已通关关卡可跳转，未通关置灰
- **进度持久化**：自动保存通关进度和当前关卡状态
- **像素风图标**：生命值心形、小猫标记均使用 SVG 像素图标

## 技术栈

- **框架**: React 19 + TypeScript
- **状态管理**: Zustand
- **构建工具**: Vite 5
- **图标**: pixelarticons（像素风格 SVG）
- **生成算法**: 基于种子(seed)的确定性关卡生成，确保同一关卡永远生成相同的布局

## 存储 key 说明

游戏使用 `localStorage` 持久化数据，所有 key 以 `gameshin:` 为前缀：

| Key | 说明 |
|-----|------|
| `gameshin:language` | 语言设置 (`"zh"` / `"en"`) |
| `gameshin_kitten_quest:run` | 当前关卡进度（版本 2） |
| `gameshin_kitten_quest:completed_levels` | 已通关关卡列表 |
| `gameshin_kitten_quest:highest_campaign_level` | 已解锁的最高关卡编号 |

## 项目结构

```
src/
├── App.tsx                  # 页面路由（主页 ↔ 游戏）
├── main.tsx                 # 入口
├── styles.css               # 全局样式
├── pages/
│   ├── HomePage.tsx         # 游戏主页
│   └── GamePage.tsx         # 游戏游玩界面
├── components/
│   ├── GameBoard.tsx        # 游戏棋盘（方块网格）
│   ├── Tile.tsx             # 单个方块组件
│   ├── Hud.tsx              # 顶部信息栏（含游戏规则按钮）
│   ├── HowToPlayModal.tsx   # 游戏规则说明弹窗
│   ├── ResultPanel.tsx      # 通关/失败结果面板
│   └── LevelSelectModal.tsx # 关卡选择弹窗
├── game/
│   ├── campaign.ts          # 关卡数据加载
│   ├── generator.ts         # 关卡生成器
│   ├── validator.ts         # 关卡验证器
│   ├── analysis.ts          # 关卡分析工具
│   ├── check.ts             # 生成器自检
│   └── types.ts             # 类型定义
├── store/
│   ├── gameStore.ts         # 游戏状态（Zustand）
│   └── storage.ts           # localStorage 持久化
├── i18n/
│   ├── translations.ts      # 中英文翻译
│   └── LanguageProvider.tsx  # 语言上下文
└── utils/
    └── random.ts            # 种子随机数生成器
```

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist/` 目录。预览构建产物：

```bash
npm run preview
```

项目资源（图标、背景图）放在 `public/` 目录，构建时自动复制到 `dist/`。

## 图标资源

| 文件 | 用途 |
|------|------|
| `public/favicon.ico` | 网站 favicon |
| `public/favicon.png` | 主页猫图标、方块中小猫图案、规则弹窗内嵌图标 |

## 关卡生成

关卡数据通过确定性算法生成，给定相同的 `seed` + `regionSizes` 永远产生相同的布局：

```bash
npx tsx scripts/generate-valid-levels.ts
```
