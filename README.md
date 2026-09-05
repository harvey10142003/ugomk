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

## 環境變數

全部都是選填。沒設的那一項就是「該功能不啟用」，不會讓網站壞掉，
但**詢問表單的通知**沒設等於名單沒有人會知道（見下）。

| 變數 | 用途 | 沒設會怎樣 |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | GTM 容器 ID（`GTM-XXXXXXX`） | GTM 整段不載入，四個事件不會送出 |
| `CRM_API_BASE` | CRM API 位址 | 預設 `https://crm.ugomk.com` |
| `CRM_LEAD_TENANT` | 名單寫進哪個租戶 | 預設 `ugomk`（⚠️ 不是 `yuguo`，兩者是不同租戶） |
| `LEAD_NOTIFY_LINE_TOKEN` | 發通知用的 LINE channel access token | 不走 LINE 通知 |
| `LEAD_NOTIFY_LINE_TO` | 收通知的 LINE UID（逗號分隔可多人） | 不走 LINE 通知 |
| `LEAD_NOTIFY_RESEND_KEY` | Resend API key | 不走 email 通知 |
| `LEAD_NOTIFY_EMAIL_TO` | 收通知的信箱（逗號分隔可多人） | 不走 email 通知 |
| `LEAD_NOTIFY_EMAIL_FROM` | 寄件者 | 預設 `ugomk.com 官網 <noreply@mail.ugomk.com>` |

### 詢問表單的通知

名單會寫進 CRM 的 `site_leads`，但 **CRM 那邊沒有任何機制會通知人**
（`routes/site/leads.ts` 只有查詢與改狀態的端點；`lead_created` 這條 ma_rules trigger
刻意沒有被放進後台的觸發下拉，而且只在電話對到既有會員且姓名吻合時才 fire）。
所以通知是官網這一側自己做的，就靠上面那兩組環境變數。

一組都沒設時，每收到一張名單都會在伺服器 log 印一行
`[lead-notify] 沒有任何通知管道被設定 …`。看到這行就代表名單正在無聲落地。

兩條路都刻意選「CRM production 已經有這個憑證」的，不需要開新帳號：
LINE 的收件 UID 可沿用 CRM API service 上的 `UPTIME_ALERT_LINE_UID`；
Resend 的金鑰與 `mail.ugomk.com` 寄件網域 CRM 已經在用且驗證過。

### ⚠️ 在 Zeabur 加完環境變數之後要「重新部署」，不是「重啟」

`NEXT_PUBLIC_*` 是在 `next build` 當下被字面替換進打包結果的，而且本站頁面都是靜態
預先產生的。只按重啟跑的還是同一份 image，裡面沒有新的值。
判準是 Zeabur 的 Deployments 有沒有新增一筆 —— 沒有新的一筆就代表沒有重建。

（`CRM_*` 與 `LEAD_NOTIFY_*` 是伺服器端執行時讀的，重啟就會生效。）

## 追蹤事件

透過 `dataLayer` 推給 GTM，容器那邊自己決定要轉發到 GA4 還是別的地方。
推送統一走 `lib/gtm.ts` 的 `pushEvent()`，不要各處直接碰 `window.dataLayer`。

| 事件 | 何時送 |
|---|---|
| `generate_lead` | 詢問表單**後端回成功之後**（不是按下按鈕的當下） |
| `click_line` | 點擊任何連到 `line.me` / `lin.ee` 的連結 |
| `click_tel` | 點擊 `tel:` 連結 |
| `click_mailto` | 點擊 `mailto:` 連結 |

後三個由 `components/OutboundClickTracker.tsx` 用**事件委派**統一處理，
新增頁面時不需要（也不應該）逐顆 CTA 去掛追蹤。

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
