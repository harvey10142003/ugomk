import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  CircleCheck,
  Coins,
  Crown,
  Database,
  Gift,
  QrCode,
  Share2,
  ShieldCheck,
  Store,
  Ticket,
  Wallet
} from 'lucide-react';
import { CtaBlock } from '@/components/CtaBlock';
import { JsonLd } from '@/components/JsonLd';
import { ModuleDemo } from '@/components/ModuleDemo';
import { solutionDemos } from '@/lib/data/solution-demos';
import { site } from '@/lib/data/site';
import { breadcrumbLd, serviceLd } from '@/lib/jsonld';
import { pageMeta } from '@/lib/seo';
import { ctaHref } from '@/lib/utm';

/**
 * ## 這一頁為什麼存在
 *
 * 「LINE 會員集點系統 / LINE 集點卡」這組查詢的前段全是競品的部落格文章，
 * 沒有任何一個產品頁 —— Google 想給使用者一頁把這件事講清楚的產品說明，市場上沒有人做。
 * 站內原本也接不住：集點屬於 activity_management + member_management + settings 三個
 * 核心模組，而核心模組沒有 `site` 標記，所以 `/solutions/[slug]` 生不出它的頁面。
 *
 * ## 內容出處（每一項都必須對得上實作，不是行銷側自己編的）
 *
 *  - 每 N 元累積 1 點：`apps/api/src/lib/tenant.ts:393`（預設 amount_per_point=100）、
 *    設定頁 `apps/admin/src/app/dashboard/settings/point-params/panel.tsx:170-184`，
 *    六個結帳路徑各自套用（pos-restaurant.ts:7374 / pos-retail.ts:1249 /
 *    beauty-booking.ts:3071 / ecommerce.ts:2872 / records.ts:289）
 *  - 點數兌換票券：`vouchers.points_cost`（voucher.ts:29-31）、會員端點數商城 liff.ts:1672-1721、
 *    扣點兌換 voucher.ts:1100-1186
 *  - 票券發放四個來源：手動 voucher.ts:609 / 自動劇本 ma-engine.ts:370-443 /
 *    抽獎 lottery.ts / 推薦獎勵 referral.ts:863,1035
 *  - 票券核銷四種：POS 掃 QR voucher.ts:731-745、後台 voucher.ts:898、
 *    核銷碼 voucher-redemption-code.ts:26-448、會員自助 liff.ts:1393-1399
 *  - 票券轉贈：transfer.ts:28-155（輸入電話）、transfer.ts:497+（連結禮物、24 小時未領退回），
 *    逐張票券可決定開不開放（預設關閉）
 *  - 儲值金：後台加值 beauty-booking.ts:6868、扣款推 LINE 給會員確認
 *    beauty-booking.ts:6961 + 8622-8715（30 分鐘逾時）；整合範圍＝美業預約與零售 POS
 *    （pos-retail.ts:994-1308）。餐飲 POS grep `balance` 0 筆，所以文案不寫「所有 POS」
 *  - 會員等級：grant-growth-value.ts:184-341，消費 / 點數 / 成長值三項門檻全達標即時升等，
 *    程式明文 monotonic 只升不降
 *  - 同一份會員資料：members 表（tenant.ts:243-266）持有 points / total_spent /
 *    growth_value / level_id，points_log、member_vouchers、beauty_member_balances
 *    全部以 member_id 指回同一張表；點數規則總店統一、儲值金以會員為單位不分店
 *
 * ## 刻意沒有寫的（有 UI 但後端從未讀取，寫了就是官網替系統承諾做不到的事）
 *
 *  - 點數到期：`point_expiry_days` 存得進 settings，但 apps/api 全域 grep 0 筆，
 *    沒有任何加點路徑讀它，也沒有掃過期點數的排程
 *  - 集點倍數活動：`multiplier_enabled` / `multiplier_value` 同樣 apps/api grep 0 筆
 *  - 等級降級與「評估週期」：`level_params` apps/api grep 0 筆，升級引擎不讀它
 *  - 儲值方案（儲多送多）、儲值金轉讓、票券線上退款、暫停兌換開關：說明書自承沒有
 *  - 發票開立時點：儲值與核銷的稅務處理尚未定案，這一頁一個字都不對發票做承諾
 */
export const metadata: Metadata = pageMeta({
  path: '/solutions/loyalty',
  title: 'LINE 會員集點與票券系統',
  description:
    'LINE 會員集點與票券系統：消費自動累積點數、點數兌換票券、票券掃碼核銷與轉贈、儲值金與會員等級。點數、票券、儲值金與消費紀錄掛在同一位會員身上，不用再跟第三方集點平台對帳。',
  keywords: [
    'LINE 會員集點系統',
    'LINE 集點卡',
    'LINE 電子集點',
    '會員點數系統',
    'LINE 票券核銷',
    '會員儲值金系統'
  ]
});

/** 與第三方集點 App 的差別 —— 左邊是常見情況，右邊是同一件事在這套系統裡怎麼跑 */
const comparison = [
  {
    theirs: '點數在集點平台，消費紀錄在 POS，兩邊要人工對',
    ours: '點數、票券、儲值金與消費紀錄同一位會員底下，不需要對帳'
  },
  {
    theirs: '集點名單是平台的，只拿得到彙總數字',
    ours: '會員資料是你的，看得到每一位的等級、標籤與消費歷程'
  },
  {
    theirs: '顧客要再裝一個 App、再註冊一次',
    ours: '在原本的 LINE 裡查點數、領票券、看餘額'
  },
  {
    theirs: '集點歸集點，行銷是另一套工具',
    ours: '點數與票券本身就是自動化劇本的動作，達標直接發'
  }
];

const pillars = [
  {
    icon: Coins,
    title: '點數',
    lead: '消費自動累積，比例自己定',
    points: [
      '設定每消費多少元累積 1 點，結帳時自動計算',
      '餐飲、零售、美業、電商與手動登記的消費都算同一本帳',
      '點數可用來兌換票券，也可以當作升等門檻的其中一項'
    ]
  },
  {
    icon: Ticket,
    title: '票券',
    lead: '發得出去，也核銷得掉',
    points: [
      '四種發放來源：後台手動發、自動化劇本發、抽獎發、推薦獎勵發',
      '四種核銷方式：POS 掃 QR、後台核銷、核銷碼、會員自助核銷',
      '核銷碼可綁定分店，連續輸錯會鎖住，避免被試出來'
    ]
  },
  {
    icon: Wallet,
    title: '儲值金',
    lead: '要扣款，先讓會員在 LINE 上按同意',
    points: [
      '後台為會員加值，餘額以會員為單位，不分店各記一本',
      '店家發起扣款時推一張確認卡到顧客 LINE，顧客按了才真的扣',
      '目前在美業預約與零售 POS 的結帳流程中可以直接扣抵'
    ]
  },
  {
    icon: Crown,
    title: '會員等級',
    lead: '達標就升，不用人工調',
    points: [
      '升等門檻可同時看累積消費、點數與成長值三項',
      '三項都達標的當下立刻升等，不必等月結或年結',
      '升等會觸發自動化劇本，可以順手發一張升等禮'
    ]
  }
];

const useCases = [
  {
    industry: '餐飲',
    title: '把紙本集點章換成 LINE',
    detail: '結帳報電話就集點，集滿換折抵券。券在店裡掃 QR 核銷，不用再收一疊蓋章卡片。'
  },
  {
    industry: '零售',
    title: '會員價、點數與儲值一起結',
    detail: '零售 POS 結帳時帶出會員，點數自動累積，也可以直接用儲值金餘額付掉這一單。'
  },
  {
    industry: '美業',
    title: '儲值扣款要顧客自己同意',
    detail: '課程或療程從儲值金扣，扣之前推一張確認卡給客人，按了才扣，帳目雙方都清楚。'
  },
  {
    industry: '課程與活動',
    title: '參加一次就進會員名單',
    detail: '報名、簽到、集點與活動票券走同一份會員資料，活動結束後名單還在，還能繼續經營。'
  }
];

const relatedModules = [
  {
    href: '/solutions/marketing-automation',
    title: '行銷自動化',
    desc: '點數達標、票券快到期、生日當月，自動發訊息與發券，不用人工挑名單。'
  },
  {
    href: '/solutions/referral',
    title: '推薦裂變 MGM',
    desc: '老客戶帶新客戶，推薦成功發點數或票券給雙方，獎勵直接走這一套點數與票券。'
  },
  {
    href: '/solutions/pos_retail',
    title: '零售 POS',
    desc: '結帳畫面直接帶出會員、累積點數、扣抵儲值金，不用另外開一個系統補登。'
  },
  {
    href: '/solutions/beauty_booking',
    title: '美業預約',
    desc: '預約、施作與儲值扣款在同一條流程裡，會員的餘額與紀錄不會散在兩個地方。'
  },
  {
    href: '/solutions/invoice_reward',
    title: '發票登錄',
    desc: '登錄發票換點數或票券，把在別家通路買你商品的消費者收進自己的會員名單。'
  },
  {
    href: '/solutions/game_community',
    title: '社群與遊戲化',
    desc: '每日打卡、任務與排行榜的獎勵，同樣發成點數與票券，不用另外開一套代幣。'
  }
];

export default function LoyaltyPage() {
  const campaign = 'solutions_loyalty';

  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'LINE 會員集點與票券系統',
            description:
              '消費自動累積點數、點數兌換票券、票券掃碼核銷與轉贈、儲值金扣款與會員等級自動升等。點數、票券、儲值金與消費紀錄掛在同一位會員身上。',
            path: '/solutions/loyalty',
            serviceType: 'LINE 會員集點與票券系統導入'
          }),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: '解決方案', path: '/solutions' },
            { name: '會員集點與票券', path: '/solutions/loyalty' }
          ])
        ]}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative max-w-4xl">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            所有解決方案
          </Link>

          <span className="eyebrow mt-8 block">LINE 會員集點系統・票券・儲值金</span>
          <h1 className="heading-1 mt-4 text-balance">
            開一張 LINE 集點卡，
            <br />
            順手把<span className="text-gradient-brand">會員資料一起留下</span>
          </h1>
          <p className="body-lg mt-7 max-w-2xl">
            集點不難，難的是集完之後那份名單在誰手上。點數、票券、儲值金與消費紀錄都掛在同一位會員身上，
            你看得到每一位客人集了多少、換了什麼、多久沒來，而不是只拿到一張平台給的月報表。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={ctaHref(site.cta.primary.href, campaign, 'hero')} className="btn-brand">
              預約需求討論
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-outline">
              查看費用方案
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
            {['顧客不用再裝 App', '名單留在你自己的系統', '跨分店同一份權益'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 解決什麼問題 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The problem</span>
            <h2 className="heading-2 mt-3 text-balance">集點做了三年，還是不知道熟客是誰</h2>
            <p className="body-base mt-4">
              多數店家不是沒有集點，是集點這件事被切在系統外面。
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                title: '點數在別人家，帳要自己對',
                text: '集點平台一本、POS 一本、發票又一本。月底想知道某位客人到底消費多少，得開三個後台自己加。'
              },
              {
                title: '名單拿不回來',
                text: '集點會員是平台的會員。想針對「集滿八點卻三個月沒來」的人做點什麼，你連這批人是誰都撈不出來。'
              },
              {
                title: '顧客嫌麻煩',
                text: '為了集點再下載一個 App、再註冊一次帳號。裝了的人有一半用完一次就刪，剩下的也想不起來密碼。'
              }
            ].map((p) => (
              <article key={p.title} className="card-hover p-7">
                <h3 className="text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </article>
            ))}
          </div>

          {/* 對照 */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-ink-100 bg-white">
            <div className="grid grid-cols-1 gap-px bg-ink-100 md:grid-cols-2">
              {/* 表頭只在桌機出現：手機是上下堆疊，每一格自己帶標籤才讀得懂 */}
              <div className="hidden bg-mist-200 px-6 py-4 md:block md:px-8">
                <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-ink-400">
                  常見的第三方集點
                </div>
              </div>
              <div className="hidden bg-brand-50 px-6 py-4 md:block md:px-8">
                <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
                  在同一套會員系統裡
                </div>
              </div>
              {comparison.map((row) => (
                <ComparisonRow key={row.theirs} theirs={row.theirs} ours={row.ours} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 實際怎麼跑 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Walk through</span>
            <h2 className="heading-2 mt-3 text-balance">{solutionDemos.loyalty.title}</h2>
            <p className="body-base mt-4">{solutionDemos.loyalty.intro}</p>
          </div>
          <div className="mt-12">
            <ModuleDemo demo={solutionDemos.loyalty} />
          </div>
        </div>
      </section>

      {/* ─────────── 四根柱子 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">What it does</span>
            <h2 className="heading-2 mt-3 text-balance">四件事，同一份會員資料</h2>
            <p className="body-base mt-4">
              下面每一項都是系統裡實際存在的功能。設定畫面在後台的「參數設定」與「活動管理」裡，
              不是規劃中的項目。
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="card-hover flex flex-col p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">{p.title}</h3>
                      <p className="text-sm font-semibold text-brand-700">{p.lead}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {p.points.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-500">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* 三個常被問到的細節 */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Share2,
                title: '票券可以送人',
                text: '逐張票券決定開不開放轉贈（預設關閉）。開放後可以輸入對方電話直接送，也可以產一條禮物連結；對方沒在時間內領走會自動退回原本的人。'
              },
              {
                icon: QrCode,
                title: '核銷不只有一種做法',
                text: 'POS 掃顧客的票券 QR、後台直接核銷、發一組核銷碼給合作店家輸入，或讓顧客自己在 LINE 裡按核銷，四種現場都跑得動。'
              },
              {
                icon: Store,
                title: '分店共用同一份權益',
                text: '點數規則由總店統一設定，儲值金以會員為單位記錄，不分店各記一本。客人在 A 店集的點，B 店一樣看得到、用得掉。'
              }
            ].map((n) => {
              const Icon = n.icon;
              return (
                <article key={n.title} className="rounded-2xl border border-ink-100 bg-mist-200 p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{n.text}</p>
                </article>
              );
            })}
          </div>

          {/*
            ⚠️ 這個提醒是刻意放的：儲值金牽涉預收款與稅務處理，官網不對開立時點做任何承諾。
            寫「儲值就開發票」或「核銷才開」都是替客戶的稅務決定背書，那不是官網該做的事。
          */}
          <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
                  導入前會一起確認
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  儲值金屬於預收款，發票與帳務的處理方式各行業做法不同，也可能牽涉你既有的會計流程。
                  這部分我們會在導入前先了解你目前怎麼做，再決定系統怎麼配合，不會直接套一套預設規則上去。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 適合誰 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Who it fits</span>
            <h2 className="heading-2 mt-3 text-balance">哪些店這樣用</h2>
            <p className="body-base mt-4">
              集點適合會回頭的生意。單價高但一年來一次的服務，通常先做票券與推薦比較有感。
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <article key={u.industry} className="card-hover flex flex-col p-6">
                <span className="chip-brand self-start">{u.industry}</span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{u.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{u.detail}</p>
              </article>
            ))}
          </div>

          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
            {[
              '已經在發紙本集點卡的店家',
              '正在付第三方集點平台月費的品牌',
              '有多間分店、想讓會員權益共用',
              '想先從最小的會員制度開始做'
            ].map((w) => (
              <li
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-mist-200 p-4 text-sm font-medium text-ink-700"
              >
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 怎麼搭 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Works with</span>
            <h2 className="heading-2 mt-3 text-balance">點數與票券是別的模組的燃料</h2>
            <p className="body-base mt-4">
              集點本身只是記數字。真正把它變成回購的，是誰在什麼時候把點數與票券送到客人面前。
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedModules.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group flex gap-3.5 rounded-2xl border border-ink-100 bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
              >
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800 transition-colors duration-200 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[0.92rem] font-bold text-ink-900">{m.title}</h3>
                  <p className="mt-1 text-[0.79rem] leading-relaxed text-ink-400">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-ink-500">
            <Database className="h-4 w-4 text-brand-500" />
            想看整套系統還有哪些模組？
            <Link
              href="/solutions"
              className="font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              看多模組架構
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            eyebrow="會員集點與票券"
            title={
              <>
                先聊聊你現在怎麼集點，
                <br className="hidden sm:block" />
                再決定要不要換
              </>
            }
            description="不用先想好點數要怎麼設。把現在的做法、客人多久回來一次、卡在哪裡講一遍，我們幫你算這套換過來划不划算。"
            campaign={campaign}
            secondary={{ label: '看實際案例', href: '/cases' }}
          />
        </div>
      </section>
    </>
  );
}

/** 對照表的一列 —— 手機是上下兩塊，桌機是左右兩欄，資料只寫一次 */
function ComparisonRow({ theirs, ours }: { theirs: string; ours: string }) {
  return (
    <>
      <div className="bg-white px-6 pb-5 pt-5 md:px-8">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest-2 text-ink-400 md:hidden">
          常見的第三方集點
        </div>
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-500">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300" />
          {theirs}
        </p>
      </div>
      <div className="bg-white px-6 pb-5 pt-5 md:px-8">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest-2 text-brand-700 md:hidden">
          在同一套會員系統裡
        </div>
        <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-ink-700">
          <Gift className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
          {ours}
        </p>
      </div>
    </>
  );
}
