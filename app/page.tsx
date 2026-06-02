import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Zap,
  Layers,
  ShieldCheck,
  TrendingUp,
  Store,
  Bot,
  CreditCard,
  Wallet
} from 'lucide-react';
import { site } from '@/lib/data/site';
import { plans } from '@/lib/data/pricing';
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
                LINE × AI × CRM SaaS
              </span>
              <h1 className="heading-display mt-6 text-balance">
                把 LINE@ 變成
                <br />
                <span className="text-gradient-brand">會長大</span>
                <span className="whitespace-nowrap">的 CRM</span>
              </h1>
              <p className="body-lg mt-7 max-w-xl">
                可插拔模組、多分店架構、行銷自動化、POS 收銀、產業包 — 一套後台跟著你的生意一起成長，從 1 間店用到連鎖。
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

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
                {['多租戶 SaaS', '可插拔模組', 'LIFF 一鍵發布', '行銷自動化引擎'].map((t) => (
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
              不是 demo 站，是<span className="text-gradient-brand">每天都在跑的系統</span>
            </h2>
          </div>
          <StatsBar
            stats={[
              { value: '6+', label: '正式運行租戶', hint: '美業 / 餐酒館 / 社群 / 商會' },
              { value: '15+', label: '可插拔模組', hint: '隨需開關' },
              { value: '3', label: '產業包', hint: '美業 / 餐飲 / 補習班' },
              { value: '100%', label: '雲端自動部署', hint: 'Zeabur + Cloudflare' }
            ]}
          />
        </div>
      </section>

      {/* ─────────── 為什麼選 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Ugomk</span>
            <h2 className="heading-2 mt-4 text-balance">
              不是「再裝一套系統」
            </h2>
            <p className="body-lg mt-5">
              而是把 Shark 親身操作 100+ 企業工具與 LINE@ 行銷漏斗的經驗，化成可以複用的產品 — 店家拿到的是 know-how，不是空白後台。
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Layers,
                title: '可插拔模組',
                body: '只開生意需要的，避免店員學一堆永遠用不到的功能；隨業務擴張隨時加開新模組。'
              },
              {
                icon: Zap,
                title: '行銷自動化內建',
                body: '不用串外部 Zapier。會員行為、標籤、等級、日期條件觸發 LINE 推播 / 切圖文選單。'
              },
              {
                icon: ShieldCheck,
                title: '多店多角色權限',
                body: '四角色 scope + cross-check 防偷看，總店 / 店長 / 店員 / POS 員工資料各看各的。'
              },
              {
                icon: TrendingUp,
                title: '跟著生意一起長大',
                body: '從 1 店、1 個 LINE@ 用到多店連鎖、POS、儲值金、產業包，後台不用換。'
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
        </div>
      </section>

      {/* ─────────── Feature 1: Marketing Automation ─────────── */}
      <section className="section bg-mist-100 border-y border-ink-100 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none opacity-50" />
        <div className="container-ug relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <span className="eyebrow">Marketing Automation</span>
              <h2 className="heading-2 mt-4 text-balance">
                行銷自動化，<br />不用再寫 Zapier
              </h2>
              <p className="body-lg mt-6">
                會員行為、標籤、等級、日期條件 — 任務引擎自動觸發 LINE 推播、切換圖文選單、發送票券。設定一次，每天自己跑。
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '4 種觸發條件（週期 / 行為 / 標籤 / 等級）',
                  '3 種動作（推播 / 切換圖文選單 / 發券）',
                  'admin run-now 立即測試 + dry-run 預覽',
                  '執行紀錄完整可追溯'
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/features" className="btn-ghost mt-8 -ml-2">
                看完整自動化規格
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative pl-4 md:pl-8 lg:pl-0">
              <ChatFlowMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Feature 2: POS ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="lg:order-2">
              <span className="eyebrow">Point of Sale</span>
              <h2 className="heading-2 mt-4 text-balance">
                一套 POS 框架，<br />適配零售、餐飲、美業
              </h2>
              <p className="body-lg mt-6">
                動態 sidebar 註冊表決定店員平板看到什麼。儲值金確認制扣款、指定設計師加價、KDS 廚房螢幕、桌邊點餐 — 都內建。
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  '零售 POS（pos_retail）+ 餐飲 POS + KDS',
                  '美業 POS + 預約整合 + 設計師加價',
                  '儲值金二次確認扣款（會員 LINE Flex 確認）',
                  'POS 員工帳號自動隔離後台'
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
              <Link href="/features" className="btn-ghost mt-8 -ml-2">
                看 POS 模組規格
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:order-1">
              <POSMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Feature 3: Multi-store + bento ─────────── */}
      <section className="section bg-ink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="container-ug relative">
          <div className="max-w-3xl">
            <span className="eyebrow-on-dark">Foundation</span>
            <h2 className="heading-2 mt-4 text-white text-balance">
              從 1 間店，到 N 間連鎖 — 後台不換
            </h2>
            <p className="body-lg mt-6 text-ink-300">
              多分店架構從第一天就內建。會員 / 票券 / 點數跨店共用，銷售 / 庫存 / 預約自動分流。四角色權限隔離，跨店資料防偷看。
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: Store, title: '多分店架構', body: '每店模組可選開、資料分流', span: 'lg:col-span-2' },
              { icon: ShieldCheck, title: '4 角色 Scope', body: '總店 / 店長 / 店員 / POS' },
              { icon: TrendingUp, title: 'MGM 推薦碼', body: '推薦碼 + 分享連結 + 雙端戰績' },
              { icon: Wallet, title: '儲值金 + 點數', body: '會員 LINE 確認制扣款' },
              { icon: Bot, title: '動態圖文選單', body: '依會員條件即時切換' },
              { icon: CreditCard, title: '點數商城', body: 'voucher 自動上架' }
            ].map((it) => (
              <div
                key={it.title}
                className={`rounded-2xl border border-ink-700 bg-ink-800/50 p-5 hover:border-brand-500/50 transition-colors ${it.span ?? ''}`}
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink-700 text-brand-400">
                  <it.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{it.title}</h3>
                <p className="mt-1.5 text-xs text-ink-400 leading-relaxed">{it.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
            >
              看 9 大模組規格
              <ArrowRight className="h-4 w-4" />
            </Link>
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

      {/* ─────────── Cases ─────────── */}
      <section className="section bg-mist-100 border-y border-ink-100">
        <div className="container-ug">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">Case Studies</span>
              <h2 className="heading-2 mt-4 text-balance">在不同產業，跑出對的姿勢</h2>
            </div>
            <Link href="/cases" className="btn-outline">
              看更多案例
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <article key={c.id} className="card-hover p-7 flex flex-col">
                <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-600">
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

      {/* ─────────── Pricing ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Pricing</span>
            <h2 className="heading-2 mt-4 text-balance">
              三個方案，跟著店家階段走
            </h2>
            <p className="body-base mt-5">
              先從入門起步，行銷自動化跟產業包都可以晚點再開。
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

          <div className="mt-10 text-center">
            <Link href="/pricing" className="btn-ghost">
              看完整方案比較
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-10 md:p-16 text-center">
            <div className="absolute inset-0 dot-grid-fade opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-mint-400/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="eyebrow-on-dark">Talk to Shark</span>
              <h2 className="heading-2 mt-4 text-white text-balance max-w-2xl mx-auto">
                想聊聊你的 LINE@ 怎麼變 CRM？
              </h2>
              <p className="body-base mt-5 text-ink-300 max-w-xl mx-auto">
                留下需求或直接加 LINE 諮詢，30 分鐘聊清楚你現在卡哪 — 不用先決定要不要買。
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="btn-line">
                  預約 30 分鐘 Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-ink-700 rounded-full hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  直接加 LINE@
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
