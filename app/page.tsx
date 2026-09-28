import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { site } from '@/lib/data/site';
import { plans, billingNote } from '@/lib/data/pricing';
import { cases as caseStudies, clientLogos } from '@/lib/data/cases';
import { crmModules } from '@/lib/data/modules';
import {
  automation,
  cases as casesCopy,
  consult,
  features,
  finalCta,
  hero,
  journey,
  pos,
  pricing as pricingCopy,
  problem
} from '@/lib/data/home';
import { HomeMotion } from '@/components/home/HomeMotion';
import {
  BuyMock,
  EngageMock,
  HeroStage,
  JoinMock,
  PosScene,
  ReturnMock,
  RuleMock
} from '@/components/home/Mocks';
import { pageMeta } from '@/lib/seo';
import { ctaHref } from '@/lib/site-source';
import './home.css';

// 首頁自己宣告 canonical，不靠繼承 —— 見 lib/seo.ts 開頭的說明
const HOME_TITLE = `${site.name}｜${site.tagline}`;

export const metadata: Metadata = {
  ...pageMeta({
    path: '/',
    title: HOME_TITLE,
    ogTitle: HOME_TITLE,
    description: site.description
  }),
  // 首頁不套 title.template（那是給子頁接站名用的），標題直接給完整值
  title: { absolute: HOME_TITLE }
};

/*
 * 2026-09-28 改版（設計方向：docs/design/site-direction.md「一條線」）。
 * 文案沿用 docs/copy-rewrite-2026-07.md（Shark 親撰），集中在 lib/data/home.ts。
 *
 * 追蹤不可動：ctaHref 的 pos 值（hero / plan_{id} / final_cta）與 LINE 按鈕文字（GTM link_text）
 * 與改版前相同。
 */

/**
 * 中文標題在逗號後才換行：每個分句一個 inline-block（同 /insurcrm）。
 * `latinBreak`：英文字後的空白也當成可斷處（首屏「讓 LINE 不只是發訊息，」在窄欄時斷在 LINE 之後，
 * 不會斷在「發／訊息」中間）。
 */
function Phrase({ text, latinBreak }: { text: string; latinBreak?: boolean }) {
  const parts = text.split(latinBreak ? /(?<=[，、：；]|[A-Za-z] )/ : /(?<=[，、：；])/);
  return (
    <>
      {parts.map((p, i) => (
        // 結尾的空白要放在 inline-block 外面，放裡面會被吃掉（「LINE不只是」黏在一起）
        <Fragment key={i}>
          <span className="inline-block">{p.trimEnd()}</span>
          {p.endsWith(' ') ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

/** 手寫註記旁的小箭頭（裝飾） */
function NoteArrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="28"
      height="18"
      viewBox="0 0 34 22"
      fill="none"
      aria-hidden
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M2 4c8 1 17 5 25 14m0 0-1-7m1 7-7-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STOP_MOCKS = { join: JoinMock, engage: EngageMock, buy: BuyMock, return: ReturnMock } as const;

/**
 * 首屏下方的數字列 —— 四項都已確認：
 *   - 「正式營運品牌 100+」「節省系統成本 50%」「行銷成本節省 60%」：Shark 2026-09-28 親自提供，
 *     標籤照原文，不改成客戶／租戶／企業，也不補比較基準或說明（沒有出處的說明等於替數字編故事）。
 *     「正式營運品牌」與記憶裡「CRM 系統正式營運租戶」是不同口徑，兩者不可混用或互相換算。
 *     原本這一列是「8／38／3／100%」，其中 8、3、100% 依 Shark 指示換掉。
 *   - 功能模組數：讀 lib/data/modules.ts，與系統模組清單同源。
 * 兩個「節省」是效益宣稱，所以帶註記（footnote），頁面上有一行小註說明（措辭待 Shark 確認）。
 */
const STATS: { value: string; label: string; footnote?: boolean }[] = [
  { value: '100+', label: '正式營運品牌' },
  { value: `${crmModules.length}`, label: '功能模組' },
  { value: '50%', label: '節省系統成本', footnote: true },
  { value: '60%', label: '行銷成本節省', footnote: true }
];
const STATS_FOOTNOTE = '＊節省比例由宇果提供，實際效益依產業與使用方式而異。';

/*
 * 下面兩組內容（品牌名、店長引言）來源無法在 repo 內證實，
 * 已列入 2026-09-28 健檢報告交給 Shark 確認；確認前內容原樣保留，只換外觀。
 */
const TESTIMONIAL = {
  quote:
    '從美甲預約、POS 結帳、會員儲值金、推播提醒到分店分權，全部一套系統搞定。換系統不用換人換流程，最關鍵的是隔夜營運的業務日切換時間 — 別家做不到。',
  author: '陳店長',
  role: '菲韻美甲 · 多分店'
};

export default function HomePage() {
  return (
    <HomeMotion className="ug-home">
      {/* ─────────── 首屏 ─────────── */}
      <section className="ug-hero">
        <div className="ug-wrap ug-hero-grid">
          <div>
            <p className="ug-kicker">{hero.kicker}</p>
            <h1 className="ug-h1 mt-6">
              <Phrase text={hero.title} latinBreak />
            </h1>
            <p className="ug-lead mt-7">{hero.lead}</p>
            <p className="ug-body mt-4" style={{ maxWidth: '34em' }}>
              {hero.sub}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={ctaHref(site.cta.primary.href, 'home', 'hero')} className="ug-btn ug-btn-primary">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={site.cta.secondary.href} className="ug-btn ug-btn-ghost">
                {site.cta.secondary.label}
              </Link>
              <a href={site.contact.lineUrl} className="ug-btn ug-btn-line" target="_blank" rel="noopener">
                <MessageCircle className="h-4 w-4" />
                加入 LINE 好友
              </a>
            </div>
            <div className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-sm font-bold" style={{ color: 'var(--ug-ink-2)' }}>
                適用產業
              </span>
              <ul className="ug-industries">
                {hero.industries.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <HeroStage />
        </div>
        <div className="ug-wrap">
          <dl className="ug-trust">
            {STATS.map((st) => (
              <div key={st.label}>
                <dt>{st.label}</dt>
                <dd className="ug-num">
                  {st.value}
                  {st.footnote ? <sup aria-hidden>＊</sup> : null}
                </dd>
              </div>
            ))}
          </dl>
          <p className="ug-trust-note">{STATS_FOOTNOTE}</p>
        </div>
      </section>

      {/* ─────────── 問題 ─────────── */}
      <section className="ug-section ug-sheet-bg">
        <div className="ug-wrap ug-split">
          <div data-reveal>
            <h2 className="ug-h2">
              <Phrase text={problem.title} />
            </h2>
            <p className="ug-body mt-5">{problem.intro}</p>
          </div>
          <div data-reveal style={{ '--d': '0.08s' } as React.CSSProperties}>
            <ul className="ug-rows">
              {problem.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="ug-quote mt-10">{problem.conclusion}</p>
          </div>
        </div>
      </section>

      {/* ─────────── 一條線的顧客旅程（解決方案） ─────────── */}
      <section className="ug-section">
        <div className="ug-wrap">
          <div data-reveal style={{ maxWidth: 760 }}>
            <h2 className="ug-h2">
              <Phrase text={journey.title} />
            </h2>
            <p className="ug-lead mt-5">{journey.lead}</p>
          </div>

          <ol className="ug-journey">
            {journey.stops.map((s, i) => {
              const Mock = STOP_MOCKS[s.id as keyof typeof STOP_MOCKS];
              return (
                <li key={s.id} className="ug-stop" data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="ug-stop-dot" aria-hidden />
                  <span className="ug-stop-step">
                    <span className="ug-num">{i + 1}</span>・{s.step}
                  </span>
                  <h3 className="ug-h3 mt-2">{s.title}</h3>
                  <p className="ug-body mt-2" style={{ fontSize: '0.98rem' }}>
                    {s.body}
                  </p>
                  <Mock />
                </li>
              );
            })}
          </ol>

          <div className="ug-multistore" data-reveal>
            <h3 className="ug-h3">{journey.multiStore.title}</h3>
            <p className="ug-body">{journey.multiStore.body}</p>
          </div>
        </div>
      </section>

      {/* ─────────── 行銷自動化 ─────────── */}
      <section className="ug-section ug-sheet-bg">
        <div className="ug-wrap ug-duo">
          <div data-reveal>
            <h2 className="ug-h2">
              <Phrase text={automation.title} />
            </h2>
            <p className="ug-body mt-5">{automation.lead}</p>
            <ul className="ug-checks mt-5">
              {automation.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="ug-body mt-5">{automation.outro}</p>
            <Link href="/solutions/marketing-automation" className="ug-link mt-7">
              了解行銷自動化
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
            <p className="ug-note ug-hand mb-3" style={{ marginLeft: '55%' }}>
              {automation.note}
              <NoteArrow />
            </p>
            <RuleMock />
          </div>
        </div>
      </section>

      {/* ─────────── POS ─────────── */}
      <section className="ug-section">
        <div className="ug-wrap ug-duo ug-duo-flip">
          <div data-reveal>
            <h2 className="ug-h2">
              <Phrase text={pos.title} />
            </h2>
            <p className="ug-body mt-5">{pos.lead}</p>
            <ul className="ug-checks mt-5">
              {pos.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Link href="/solutions/pos_restaurant" className="ug-link mt-7">
              了解 POS 與產業模組
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
            <PosScene />
            <p className="ug-note ug-hand mt-3">
              <NoteArrow flip />
              {pos.note}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 功能索引 ─────────── */}
      <section className="ug-section ug-sheet-bg">
        <div className="ug-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <h2 className="ug-h2" style={{ maxWidth: 640 }}>
              <Phrase text={features.title} />
            </h2>
            <p className="ug-small">
              目前共 <span className="ug-num font-bold">{crmModules.length}</span> 個模組，依需求逐一啟用
            </p>
          </div>
          <div className="ug-index" data-reveal>
            {features.items.map((f) => (
              <Link key={f.title} href={f.href}>
                <span className="ug-index-title">{f.title}</span>
                <ArrowRight className="ug-index-arrow h-4 w-4" aria-hidden />
                <span className="ug-index-body">{f.body}</span>
              </Link>
            ))}
          </div>
          <div className="mt-10" data-reveal>
            <Link href="/solutions" className="ug-btn ug-btn-ghost">
              查看完整功能
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── 顧問式導入（深色） ─────────── */}
      <section className="ug-section ug-night">
        <div className="ug-wrap">
          <div data-reveal style={{ maxWidth: 780 }}>
            <h2 className="ug-h2">
              <Phrase text={consult.title} />
            </h2>
            <p className="ug-lead mt-5">{consult.lead}</p>
          </div>
          <ol className="ug-knots" data-reveal>
            {consult.questions.map((q) => (
              <li key={q} className="ug-knot">
                {q}
              </li>
            ))}
          </ol>
          <p className="ug-hand mt-6" style={{ fontSize: '1.2rem' }} data-reveal>
            {consult.hand}
          </p>
          <div className="ug-cols">
            {consult.items.map((it, i) => (
              <div key={it.title} data-reveal style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}>
                <h3 className="ug-h3" style={{ fontSize: '1.2rem' }}>
                  {it.title}
                </h3>
                <p className="ug-body mt-2" style={{ fontSize: '0.98rem' }}>
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <ul className="ug-facts" data-reveal>
            {consult.background.map((f) => (
              <li key={f.label}>
                <b>{f.label}</b>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────── 案例 ─────────── */}
      <section className="ug-section ug-sheet-bg">
        <div className="ug-wrap">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div style={{ maxWidth: 640 }}>
              <h2 className="ug-h2">
                <Phrase text={casesCopy.title} />
              </h2>
              <p className="ug-body mt-4">{casesCopy.lead}</p>
            </div>
            <Link href="/cases" className="ug-btn ug-btn-ghost">
              查看更多案例
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="ug-cases">
            {caseStudies.map((c) => (
              <article key={c.id} className="ug-case" data-reveal>
                <div>
                  <h3 className="ug-case-name">{c.name}</h3>
                  <p className="ug-case-industry">{c.industry}</p>
                </div>
                <p className="ug-body" style={{ fontSize: '0.98rem' }}>
                  {c.summary}
                </p>
                <div className="ug-chips">
                  {c.modules.slice(0, 4).map((m) => (
                    <span key={m} className="ug-tag">
                      {m}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* 待 Shark 確認真偽的兩組內容（見上方 TESTIMONIAL 前的註解）：原樣保留 */}
          <div className="ug-proof" data-reveal>
            <div>
              <p className="ug-small">正在用 UGO AI CRM 營運的品牌：{clientLogos.map((c) => c.name).join('、')}</p>
            </div>
            <figure className="ug-testimonial">
              <blockquote className="ug-body" style={{ color: 'var(--ug-ink)' }}>
                「{TESTIMONIAL.quote}」
              </blockquote>
              <figcaption className="ug-small mt-3">
                {TESTIMONIAL.author}・{TESTIMONIAL.role}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─────────── 方案 ─────────── */}
      <section className="ug-section">
        <div className="ug-wrap">
          <div data-reveal style={{ maxWidth: 720 }}>
            <h2 className="ug-h2">
              <Phrase text={pricingCopy.title} />
            </h2>
            <p className="ug-body mt-4">{pricingCopy.lead}</p>
          </div>

          <div className="ug-plans">
            {plans.map((p, i) => (
              <article
                key={p.id}
                className="ug-plan"
                data-highlight={p.highlight ? '' : undefined}
                data-reveal
                style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}
              >
                {p.highlight ? <span className="ug-plan-badge">最受歡迎</span> : null}
                <p className="ug-small">{p.caption}</p>
                <h3 className="mt-1 text-lg font-bold" style={{ color: 'var(--ug-ink)' }}>
                  {p.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="ug-price">{p.price}</span>
                  <span className="ug-small">{p.priceSuffix}</span>
                </p>
                <p className="ug-body mt-3" style={{ fontSize: '0.95rem' }}>
                  {p.description}
                </p>
                {/* flex-1 吃掉高度差，三顆按鈕落在同一條水平線上 */}
                <ul className="ug-checks mt-4 flex-1" style={{ fontSize: '0.95rem' }}>
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href={ctaHref(p.cta.href, 'home', `plan_${p.id}`)}
                  className={`ug-btn mt-7 w-full ${p.highlight ? 'ug-btn-primary' : 'ug-btn-ghost'}`}
                >
                  {p.cta.label}
                </Link>
              </article>
            ))}
          </div>

          <p className="ug-small mt-8" style={{ maxWidth: '48em' }}>
            {billingNote}
          </p>
          <Link href="/pricing" className="ug-link mt-4">
            看完整方案比較
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─────────── 最後的行動 ─────────── */}
      <section className="ug-section ug-sheet-bg">
        <div className="ug-wrap ug-final" data-reveal>
          <h2 className="ug-h2">
            <Phrase text={finalCta.title} />
          </h2>
          <p className="ug-body mt-5">{finalCta.lead}</p>
          <ul className="ug-checks ug-final-list">
            {finalCta.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={ctaHref('/contact', 'home', 'final_cta')} className="ug-btn ug-btn-primary">
              預約 30 分鐘需求討論
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="ug-btn ug-btn-line">
              <MessageCircle className="h-4 w-4" />
              直接加入 LINE 諮詢
            </a>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}
