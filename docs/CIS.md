# Ugomk CIS（企業識別系統）

## 1. 品牌定位

- **公司**：宇果國際行銷（Yu Guo International Marketing）
- **產品**：LINE CRM SaaS（多租戶、可插拔模組）
- **主訴求**：把 LINE@ 變成會自己長大的 CRM
- **語氣**：技術紮實、像同行說人話、不浮誇

## 2. 色彩系統

| Token | 色碼 | 用途 |
|-------|------|------|
| `brand-500` | `#06C755` | 主色 / 強調 / 主按鈕。對齊 LINE 官方綠 |
| `brand-600` | `#04A847` | hover / 進階對比 |
| `mint-400` | `#34E89E` | 漸層輔色、hero 點綴 |
| `ink-900` | `#0B0F19` | 主文字 / heading |
| `ink-500` | `#4B5563` | 內文 / body |
| `ink-100` | `#E5E9F0` | 邊框、分隔線 |
| `mist-200` | `#F7F9FC` | 全站背景 |
| `mist-100` | `#FAFBFD` | 卡片底（hero 段落） |

## 3. 字體系統

- 中文：Noto Sans TC（400 / 500 / 700 / 900）
- 英文：Inter（400-800）
- 顯示級：`heading-display` / `heading-1` / `heading-2`，clamp() 自適應

## 4. 圓角規範

- 按鈕：`rounded-full`（pill）
- 卡片：`rounded-2xl`（16px）
- 表單元件：`rounded-xl`（12px）
- 小徽章：`chip` 預設 `rounded-full`

## 5. Section 節律

- 主 section：`section`（py-20 md:py-28）
- 緊湊 section：`section-tight`（py-14 md:py-20）
- 容器：`container-ug`（max-w 1240, 左右 padding 6 / 10 / 12）

## 6. 互動規範

- 主按鈕：`btn-brand`（LINE 綠 + shadow-brand + hover 微浮起）
- 次按鈕：`btn-outline`（白底 + ink 邊框 + hover 變綠邊）
- Link：底線 underline 由 `Header.tsx` 處理（hover 滑入）
- 卡片：`card-hover` 包含 hover 邊框轉綠 + shadow-card

## 7. 視覺強調手法

- **Hero**：`hero-bg`（mist 底 + 三點 radial mint/brand 光暈） + `grid-bg` 細網格 mask
- **漸層**：`bg-gradient-brand`（135deg 綠→薄荷）/ `bg-gradient-brand-soft`（淡綠卡片）
- **文字漸層**：`.text-gradient-brand`

## 8. Layout 規範

- Header 高度 80px（h-20），fixed + backdrop-blur，scroll > 16 加陰影
- Footer 深色（ink-900）反白，與 Hero 淺色對比形成節律
- 內頁皆從 `PageHero` 起頭（hero-bg + eyebrow + h1 + subtitle）

## 9. 內容口吻範例

| 場合 | 寫法 |
|------|------|
| Hero | 「把 LINE@ 變成會自己長大的 CRM」 |
| 模組標題 | 「9 大模組群組，挑你的生意需要的」 |
| CTA | 「先聊聊你卡在哪」「30 分鐘聊清楚」 |
| 不要 | 「智能化」「賦能」「打造」這類空洞詞 |

## 10. 不要做

- 不放 stock photo 假人像
- 不寫超過 3 階層的選單
- 不放與 LINE 綠衝突的紅色 / 紫色 CTA
- 不在淺色背景用 `bg-*/60` 半透明（會看不到）
