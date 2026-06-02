import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Zap,
  Layers,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { site } from '@/lib/data/site';
import { moduleGroups } from '@/lib/data/modules';
import { plans } from '@/lib/data/pricing';
import { cases, clientLogos } from '@/lib/data/cases';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg mask-fade-b pointer-events-none" />
        <div className="container-ug relative">
          <div className="max-w-3xl">
            <span className="eyebrow">LINE × AI × CRM</span>
            <h1 className="heading-display mt-6">
              把 LINE@ 變成
              <br />
              <span className="text-gradient-brand">會自己長大</span>
              <span className="whitespace-nowrap">的 CRM</span>
            </h1>
            <p className="body-lg mt-7 text-balance max-w-2xl">
              {site.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={site.cta.secondary.href} className="btn-outline">
                {site.cta.secondary.label}
              </Link>
              <a
                href={site.contact.lineUrl}
                className="btn-ghost"
                target="_blank"
                rel="noopener"
              >
                <MessageCircle className="h-4 w-4" />
                加 LINE@ 即時問
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
              {[
                '多租戶 SaaS',
                '可插拔模組',
                'LIFF 一鍵發布',
                '4 角色權限隔離',
                '行銷自動化引擎'
              ].map((t) => (
                <div key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 客戶 logo 牆 */}
          <div className="mt-20">
            <div className="text-xs tracking-widest-2 uppercase text-ink-400 font-semibold mb-5">
              已在這些品牌的日常運轉
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {clientLogos.map((c) => (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-3 rounded-full border border-ink-100 bg-white/80 backdrop-blur px-4 py-2 shadow-soft"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-white text-xs font-bold">
                    {c.initial}
                  </span>
                  <span className="text-sm font-medium text-ink-700">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 為什麼選宇果 CRM */}
      <section className="section bg-white border-y border-ink-100">
        <div className="container-ug">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Ugomk</span>
            <h2 className="heading-2 mt-4">不是「再裝一套系統」</h2>
            <p className="body-lg mt-5">
              而是把 Shark 親身操作 100+ 企業工具與 LINE@ 行銷漏斗的經驗，化成可以複用的產品 —
              店家拿到的是 know-how，不是空白後台。
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
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模組能力 */}
      <section className="section">
        <div className="container-ug">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">Modules</span>
              <h2 className="heading-2 mt-4">9 大模組群組，挑你的生意需要的</h2>
              <p className="body-base mt-4">
                從會員、POS、行銷自動化到產業包，每個模組都附 admin 後台、LIFF 端、POS 整合。
              </p>
            </div>
            <Link href="/features" className="btn-outline">
              看完整模組規格
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moduleGroups.slice(0, 6).map((m) => (
              <article key={m.id} className="card-hover p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist-300 text-ink-800">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] tracking-widest-2 uppercase font-semibold text-ink-400">
                    {m.caption}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.description}</p>
                <ul className="mt-5 space-y-2">
                  {m.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-ink-600">
                      <span className="mt-1 inline-block h-1 w-1 rounded-full bg-brand-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 客戶案例 */}
      <section className="section bg-mist-200 border-y border-ink-100">
        <div className="container-ug">
          <div className="max-w-xl">
            <span className="eyebrow">Case Studies</span>
            <h2 className="heading-2 mt-4">在不同產業跑得起來</h2>
            <p className="body-base mt-4">
              社群課程、美業多分店、餐酒館 — 同一套 CRM 框架配上對應產業包，落地就上線。
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <article key={c.id} className="card p-7 flex flex-col">
                <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-600">
                  {c.industry}
                </div>
                <h3 className="mt-3 text-xl font-bold text-ink-900">{c.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 flex-1">{c.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.modules.map((mod) => (
                    <span key={mod} className="chip-ink">
                      {mod}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/cases" className="btn-outline">
              看更多案例
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 方案 */}
      <section className="section">
        <div className="container-ug">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow justify-center">Pricing</span>
            <h2 className="heading-2 mt-4">三個方案，跟著店家階段走</h2>
            <p className="body-base mt-4">
              先從入門起步，行銷自動化跟產業包都可以晚點再開。
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.id}
                className={p.highlight ? 'card-glow p-8 relative' : 'card p-8 relative'}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white shadow-brand">
                    <Sparkles className="h-3 w-3" />
                    最受歡迎
                  </span>
                ) : null}
                <div className="text-xs tracking-widest-2 uppercase font-semibold text-ink-400">
                  {p.caption}
                </div>
                <h3 className="mt-2 text-xl font-bold text-ink-900">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-ink-900">{p.price}</span>
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
        </div>
      </section>

      {/* CTA 結尾 */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="card-glow p-10 md:p-16 text-center bg-gradient-brand-soft">
            <span className="eyebrow justify-center">Talk to Shark</span>
            <h2 className="heading-2 mt-4 text-balance">
              想聊聊你的 LINE@ 怎麼變 CRM？
            </h2>
            <p className="body-base mt-4 max-w-xl mx-auto">
              留下需求或直接加 LINE 諮詢，30 分鐘聊清楚你現在卡哪 — 不用先決定要不要買。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn-brand">
                預約 30 分鐘 Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={site.contact.lineUrl}
                target="_blank"
                rel="noopener"
                className="btn-outline"
              >
                <MessageCircle className="h-4 w-4" />
                直接加 LINE@
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
