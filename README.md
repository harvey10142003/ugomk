# ugomk

宇果國際行銷（Yu Guo International Marketing）官網 — `https://ugomk.com`

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS（淺色科技風 × LINE 綠主色 #06C755）
- Zeabur 部署、Cloudflare DNS（灰雲 DNS only）

## Layout

```
app/
├── page.tsx          首頁
├── features/         產品模組
├── pricing/          訂閱方案
├── cases/            客戶案例
├── contact/          聯絡 / 預約 Demo
├── sitemap.ts        SEO
├── robots.ts         SEO
├── manifest.ts       PWA manifest
├── layout.tsx        Root layout（含 Header / Footer / JSON-LD）
└── globals.css       設計 token + tailwind base
components/
├── Header.tsx
├── Footer.tsx
├── JsonLd.tsx
└── PageHero.tsx
lib/
├── utils.ts          cn() 工具
├── jsonld.ts         Organization / WebSite / Product schema
└── data/
    ├── site.ts       站點 metadata + nav
    ├── modules.ts    CRM 模組清單
    ├── pricing.ts    方案資料
    └── cases.ts      客戶案例
```

## Dev

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build 驗證（push 前）

依 `reference_local_build_verify.md` 記憶條目：

```bash
node node_modules/next/dist/bin/next build
```

## Deploy

1. 推 GitHub（建議新 repo `ugomk`）
2. Zeabur 連 repo → 自動 build（`zeabur.json` 已設）
3. Cloudflare DNS：`ugomk.com` 跟 `www.ugomk.com` 都改用 **CNAME → Zeabur generated domain**，記得**灰雲 DNS only**（依 `reference_dns_zeabur_cloudflare.md`）
4. Zeabur 後台 → 服務 → Domains → 加入 `ugomk.com` + `www.ugomk.com` 自訂域
5. SSL 等 Zeabur 自動簽完（5-10 分鐘）

## DNS 切換注意

目前 ugomk.com 接在 Manus Space（外部 AI 蓋站工具）已脫鉤回 403。
切換前先在 Cloudflare 確認沒有殘留的 A record 指到 Manus Space IP；
www 那筆過去設定造成 Cloudflare Error 1000，要整筆刪掉重設。

## Tokens

設計 token 都集中在 `tailwind.config.ts` + `app/globals.css`：

- 主色：`brand-500 #06C755`（LINE 綠）
- 點綴：`mint-400 #34E89E`
- 深字 / 邊框：`ink-*`
- 淺底：`mist-*`

修主色就改 `tailwind.config.ts` 的 `brand` palette，全站自動跟。
