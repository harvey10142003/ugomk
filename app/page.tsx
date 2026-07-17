import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  XCircle,
  Users,
  Clock3,
  ShoppingBag,
  Store,
  Compass,
  Blocks,
  Workflow,
  Cable,
  Ticket,
  Share2,
  CalendarCheck,
  CreditCard,
  ClipboardList
} from 'lucide-react';
import { site } from '@/lib/data/site';
import { plans, billingNote } from '@/lib/data/pricing';
import { cases } from '@/lib/data/cases';
import { DashboardMock } from '@/components/mocks/DashboardMock';
import { ChatFlowMock } from '@/components/mocks/ChatFlowMock';
import { POSMock } from '@/components/mocks/POSMock';
import { LogoBar } from '@/components/LogoBar';
import { StatsBar } from '@/components/StatsBar';
import { Testimonial } from '@/components/Testimonial';

export default function HomePage() {
  return (
    <>
      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />

        <div className="container-ug relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center">
            <div>
              <span className="chip-brand">
                <Sparkles className="h-3 w-3" />
                LINE 官方帳號 × CRM × 行銷自動化
              </span>
              <h1 className="heading-display mt-6 text-balance">
                讓 LINE 不只是發訊息，
                <br />
                而是<span className="text-gradient-brand">把客戶留下來</span>
              </h1>
              <p className="body-lg mt-7 max-w-xl">
                整合會員資料、標籤、點數、票券、預約、推播與門市營運，讓顧客從加入好友、互動、消費到再次回購，都能在同一套流程中完成。
              </p>
              <p className="body-base mt-4 max-w-xl">
                不需要一開始買下所有功能。從目前最需要的模組開始，未來再跟著營運規模增加。
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={site.cta.primary.href} className="btn-brand">
                  {site.cta.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={site.cta.secondary.href} className="btn-outline">
                  {site.cta.secondary.label}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-500">
                <span className="font-semibold text-ink-700">適用產業</span>
                {['餐飲', '美業', '零售', '教育課程', '活動展會', '多分店品牌'].map((t) => (
                  <div key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-100/40 via-mint-100/30 to-transparent blur-3xl rounded-full" />
              <div className="relative">
                <DashboardMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Logo Bar ─────────── */}
      <section className="border-y border-ink-100 bg-white">
        <div className="container-ug py-10">
          <LogoBar />
        </div>
      </section>

      {/* ─────────── Stats ─────────── */}
      <section className="section-tight bg-mist-100">
        <div className="container-ug">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow">By the numbers</span>
            <h2 className="heading-3 mt-3 text-balance">
              不是簡報上的構想，是<span className="text-gradient-brand">每天都在營運的系統</span>
            </h2>
          </div>
          <StatsBar
            stats={[
              { value: '6+', label: '正式營運品牌', hint: '美業 / 餐酒館 / 社群 / 商會' },
              { value: '15+', label: '功能模組', hint: '依需求啟用' },
              { value: '3', label: '產業流程包', hint: '美業 / 餐飲 / 課程' },
              { value: '100%', label: '雲端自動部署', hint: '免自備主機' }
            ]}
          />
        </div>
      </section>

      {/* ─────────── 問題區塊 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-start">
            <div>
              <span className="eyebrow">The Problem</span>
              <h2 className="heading-2 mt-4 text-balance">
                LINE 好友不少，卻沒有真正變成會員？
              </h2>
              <p className="body-lg mt-5">
                很多企業已經經營 LINE 官方帳號，卻仍然遇到這些問題：
              </p>
              <p className="mt-8 text-base leading-relaxed text-ink-800 font-medium border-l-2 border-brand-500 pl-5">
                真正需要解決的，不只是「怎麼發訊息」，而是如何把每一次互動留下來，成為下一次成交的基礎。
              </p>
            </div>
            <ul className="space-y-3">
              {[
                '好友加入之後，不知道他是誰、對什麼有興趣。',
                '每次推播都發給所有人，訊息費增加，效果卻不一定提升。',
                '會員、預約、點數、票券與消費資料分散在不同系統。',
                '活動結束後沒有後續追蹤，辛苦取得的名單慢慢失去聯繫。',
                '分店與員工各自管理資料，總部很難掌握實際營運狀況。'
              ].map((t) => (
                <li key={t} className="card p-5 flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-ink-300 mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed text-ink-700">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── 解決方案區塊 ─────────── */}
      <section className="section bg-mist-100 border-y border-ink-100">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">The Solution</span>
            <h2 className="heading-2 mt-4 text-balance">
              把會員經營與日常營運，接進 LINE 裡
            </h2>
            <p className="body-lg mt-5">
              顧客不需要另外下載 App，透過原本熟悉的 LINE，就能完成會員登入、預約、領券、集點、查詢與消費互動。企業則能在後台掌握會員資料與行為，安排更適合的行銷流程。
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: '認識你的會員',
                body: '整合會員資料、標籤、等級、來源與互動紀錄，不再只看到一串沒有分類的好友名單。'
              },
              {
                icon: Clock3,
                title: '在適合的時間主動聯繫',
                body: '依照加入時間、會員標籤、消費狀況、生日或活動日期，自動發送提醒、票券與回購訊息。'
              },
              {
                icon: ShoppingBag,
                title: '讓互動直接走向消費',
                body: '將預約、點數、票券、儲值與商品服務整合進 LINE，縮短顧客從看到訊息到採取行動的距離。'
              },
              {
                icon: Store,
                title: '從單店管理到多店營運',
                body: '總部、店長、店員與收銀人員依照權限使用系統，各分店資料清楚分流，會員權益也能依需求跨店使用。'
              }
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="card-hover p-6">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist-200 text-ink-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-ink-400">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 宇果優勢區塊 ─────────── */}
      <section className="section bg-ink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="container-ug relative">
          <div className="max-w-3xl">
            <span className="eyebrow-on-dark">Why Ugomk</span>
            <h2 className="heading-2 mt-4 text-white text-balance">
              我們不只提供系統，也協助你把流程規劃好
            </h2>
            <p className="body-lg mt-6 text-ink-300">
              很多系統功能很多，真正導入後卻不知道該怎麼用。宇果從企業實際的顧客流程出發，先釐清「客戶從哪裡來、加入後看什麼、如何互動、怎麼成交、何時再次聯繫」，再決定需要導入哪些功能。
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Compass,
                title: '顧問式導入',
                body: '不是交付一個空白後台，而是根據你的產業、客群與營運方式，規劃實際可執行的會員流程。'
              },
              {
                icon: Blocks,
                title: '模組化建置',
                body: '只啟用目前需要的功能，降低導入成本與教育負擔。未來增加分店或新服務時，再彈性擴充。'
              },
              {
                icon: Workflow,
                title: '產業流程整合',
                body: '餐飲點餐、美業預約、課程報名、會員票券、POS 收銀與活動系統，都能依照產業情境組合。'
              },
              {
                icon: Cable,
                title: '客製化串接',
                body: '現有系統無法滿足的欄位、流程或第三方服務，可依實際需求評估 API 串接與客製開發。'
              }
            ].map((it) => (
              <div
                key={it.title}
                className="rounded-2xl border border-ink-700 bg-ink-800/50 p-6 hover:border-brand-500/50 transition-colors"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink-700 text-brand-400">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm text-ink-300 leading-relaxed">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 行銷自動化區塊 ─────────── */}
      <section className="section bg-mist-100 border-b border-ink-100 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none opacity-50" />
        <div className="container-ug relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <span className="eyebrow">Marketing Automation</span>
              <h2 className="heading-2 mt-4 text-balance">
                設定一次，<br />該做的會員跟進自動完成
              </h2>
              <p className="body-lg mt-6">
                行銷自動化不是一直傳訊息，而是在適合的時間，對適合的會員說適合的話。例如：
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '新會員加入後，自動發送歡迎訊息與入會好禮。',
                  '完成問卷後，依照答案自動分類會員標籤。',
                  '預約日前一天，自動發送提醒，降低臨時取消與未到店。',
                  '消費一段時間後，自動發送回購券或關懷訊息。',
                  '會員生日、升等或點數即將到期時，自動通知。',
                  '不同會員等級，顯示不同的圖文選單與專屬入口。'
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="body-base mt-6">
                讓團隊少做重複工作，也避免重要的顧客跟進被遺漏。
              </p>
              <Link href="/features" className="btn-ghost mt-6 -ml-2">
                了解行銷自動化
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative pl-4 md:pl-8 lg:pl-0">
              <ChatFlowMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 主要功能區塊 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">Features</span>
            <h2 className="heading-2 mt-4 text-balance">
              從會員經營到門市營運，一套系統彈性組合
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: '會員 CRM',
                body: '管理會員基本資料、標籤、群組、等級、互動紀錄與消費狀況。'
              },
              {
                icon: Ticket,
                title: '點數與票券',
                body: '設定集點、兌換、優惠券、禮品券、轉贈與會員專屬活動。'
              },
              {
                icon: Share2,
                title: '推薦與分享',
                body: '透過推薦碼與分享連結記錄推薦來源，規劃會員邀請與口碑成長活動。'
              },
              {
                icon: CalendarCheck,
                title: '預約與報名',
                body: '整合服務預約、設計師班表、課程報名、活動簽到與提醒通知。'
              },
              {
                icon: CreditCard,
                title: 'POS 與門市管理',
                body: '依照餐飲、美業與零售需求整合結帳、會員、儲值、庫存與服務紀錄。'
              },
              {
                icon: Store,
                title: '多分店管理',
                body: '設定總部、店長、店員與收銀人員權限，讓各店資料分流、總部集中掌握。'
              },
              {
                icon: ClipboardList,
                title: '問卷與會員標籤',
                body: '顧客填寫資料後，自動依答案貼上標籤，作為後續分眾溝通依據。'
              },
              {
                icon: Sparkles,
                title: '抽獎與互動活動',
                body: '支援轉盤、刮刮樂、拉霸、活動報名與票券兌換，讓活動名單回到會員系統中。'
              }
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-hover p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist-200 text-ink-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/features" className="btn-outline">
              查看完整功能
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── POS 區塊 ─────────── */}
      <section className="section bg-mist-100 border-y border-ink-100">
        <div className="container-ug">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="lg:order-2">
              <span className="eyebrow">Point of Sale</span>
              <h2 className="heading-2 mt-4 text-balance">
                預約、會員與結帳，<br />不必各用一套系統
              </h2>
              <p className="body-lg mt-6">
                現場人員在平板完成預約確認、服務選擇、會員折扣、點數與儲值金扣款。每一筆交易都能回到會員資料中，成為後續分眾與回購行銷的依據。
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '美業預約、指定服務人員與加價項目。',
                  '餐飲點餐、廚房出單與會員優惠。',
                  '零售結帳、會員折扣與點數累積。',
                  '多分店會員共用與營運資料管理。'
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/features" className="btn-ghost mt-8 -ml-2">
                了解 POS 與產業模組
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:order-1">
              <POSMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Testimonial ─────────── */}
      <section className="section">
        <div className="container-ug max-w-4xl">
          <Testimonial
            quote="從美甲預約、POS 結帳、會員儲值金、推播提醒到分店分權，全部一套系統搞定。換系統不用換人換流程，最關鍵的是隔夜營運的業務日切換時間 — 別家做不到。"
            author="陳店長"
            role="菲韻美甲 · 多分店"
            avatarInitial="陳"
          />
        </div>
      </section>

      {/* ─────────── 客戶案例區塊 ─────────── */}
      <section className="section bg-mist-100 border-y border-ink-100">
        <div className="container-ug">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">Case Studies</span>
              <h2 className="heading-2 mt-4 text-balance">不同產業，需要不同的會員流程</h2>
              <p className="body-base mt-4">
                我們不套用同一個範本，而是依照每個產業的實際工作方式調整。
              </p>
            </div>
            <Link href="/cases" className="btn-outline">
              查看更多案例
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <article key={c.id} className="card-hover p-7 flex flex-col">
                <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-700">
                  {c.industry}
                </div>
                <h3 className="mt-3 text-xl font-bold text-ink-900">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 flex-1">{c.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.modules.slice(0, 4).map((mod) => (
                    <span key={mod} className="chip-ink">
                      {mod}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 方案區塊 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Pricing</span>
            <h2 className="heading-2 mt-4 text-balance">
              從現在需要的功能開始
            </h2>
            <p className="body-base mt-5">
              不必一次導入所有模組。我們會依照分店數量、會員規模、使用功能與是否需要客製串接，建議合適的方案。
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.id}
                className={p.highlight ? 'card-glow p-8 relative' : 'card-hover p-8 relative'}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-white">
                    <Sparkles className="h-3 w-3 text-brand-400" />
                    最受歡迎
                  </span>
                ) : null}
                <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-ink-400">
                  {p.caption}
                </div>
                <h3 className="mt-2 text-xl font-bold text-ink-900">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-ink-900 tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-sm text-ink-400">{p.priceSuffix}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.cta.href}
                  className={p.highlight ? 'btn-brand mt-8 w-full' : 'btn-outline mt-8 w-full'}
                >
                  {p.cta.label}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-sm leading-relaxed text-ink-500">{billingNote}</p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/pricing" className="btn-ghost">
              看完整方案比較
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── 最終行動區塊 ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-10 md:p-16 text-center">
            <div className="absolute inset-0 dot-grid-fade opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-mint-400/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="eyebrow-on-dark">Start Here</span>
              <h2 className="heading-2 mt-4 text-white text-balance max-w-3xl mx-auto">
                先不用決定買哪個方案，從你現在卡住的地方開始談
              </h2>
              <p className="body-base mt-5 text-ink-300 max-w-2xl mx-auto">
                你可以告訴我們目前的 LINE 好友數、產業、分店數量，以及最希望改善的問題。我們會先協助判斷：
              </p>
              <ul className="mt-6 inline-flex flex-col items-start gap-2 text-left text-sm text-ink-300">
                {[
                  '哪些流程適合放進 LINE。',
                  '現有系統是否能繼續使用。',
                  '需要哪些模組，不需要哪些功能。',
                  '預計的導入方式與費用範圍。'
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="btn-line">
                  預約 30 分鐘需求討論
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-ink-700 rounded-full hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  直接加入 LINE 諮詢
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
