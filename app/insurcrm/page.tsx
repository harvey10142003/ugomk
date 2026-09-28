import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDown, MessageCircle, MoonStar, ShieldCheck } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { pageMeta, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd, faqPageLd, ORGANIZATION_ID } from '@/lib/jsonld';
import { site } from '@/lib/data/site';
import {
  LOGO,
  LOGO_MARK,
  OG_IMAGE_PATH,
  PAGE_PATH,
  PRODUCT_NAME,
  PRODUCT_SUBTITLE,
  PRODUCT_TAGLINE,
  SOLO_PRICE,
  clientSide,
  compliance,
  dayEntries,
  faqs,
  headings,
  hero,
  planNote,
  photos,
  planRows,
  allFeatures,
  type DayMock
} from './_data/content';
import { MotionRoot } from './_components/MotionRoot';
import { HeroChat } from './_components/HeroChat';
import { GreetingDemo } from './_components/GreetingDemo';
import { AssistantMock, BriefMock, ClientPhoneMock, FamilyMock, IcalMock, InboxMock } from './_components/Mocks';
import { Faq } from './_components/Faq';
import { ComingSoonCta } from './_components/ComingSoonCta';
import './insurcrm.css';

const DESCRIPTION = `${PRODUCT_NAME}，${PRODUCT_SUBTITLE}。${PRODUCT_TAGLINE}為保險業務、銀行理專與通訊處打造的 LINE 官方帳號客戶經營系統：家庭與保單整理、生日與農曆節日祝福一鍵確認、每日早報與 AI 業務助理，客戶不用下載 App。`;

export const metadata: Metadata = {
  ...pageMeta({
    path: PAGE_PATH,
    title: `${PRODUCT_NAME}｜${PRODUCT_SUBTITLE}`,
    description: DESCRIPTION,
    // 分享圖：由 logo 原檔以程式合成（淺色底＋logo＋標語），不是全站共用的 og.jpg
    ogImage: OG_IMAGE_PATH,
    keywords: [PRODUCT_NAME, '保險業務 CRM', '保險 LINE 官方帳號', '保險客戶管理', '保單整理', '農曆生日祝福', '理專 客戶管理', 'AI 業務助理', '通訊處 管理系統']
  }),
  // 產品未上線、預約未開放：先不讓搜尋引擎收錄（也不在 sitemap）。上線時拿掉這一段並把 /insurcrm 加回 app/sitemap.ts
  robots: { index: false, follow: false }
};

/*
 * 搶先預約尚未開放（2026-09-27 Shark）：所有預約按鈕都是不可點的 ComingSoonCta。
 * 開放時換回連結：ctaHref('/contact', sourceFromPath(PAGE_PATH), '<位置>')（lib/site-source.ts），
 * 位置沿用 hero / plan_solo / plan_team / final_cta，名單會帶 src=insurcrm。
 * 本頁也不在全站選單（components/Header.tsx）裡。
 */

/**
 * SoftwareApplication：產品尚未上線，availability 用 PreOrder，價格只宣告個人版（團隊版是洽詢）。
 * 名稱讀 PRODUCT_NAME，改名時自動一致。
 */
const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PRODUCT_NAME,
  alternateName: `${PRODUCT_NAME} ${PRODUCT_SUBTITLE}`,
  image: absoluteUrl(LOGO.src),
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, LINE',
  url: absoluteUrl(PAGE_PATH),
  description: DESCRIPTION,
  inLanguage: 'zh-TW',
  publisher: { '@id': ORGANIZATION_ID },
  offers: {
    '@type': 'Offer',
    name: '個人版',
    price: SOLO_PRICE,
    priceCurrency: 'TWD',
    availability: 'https://schema.org/PreOrder',
    url: absoluteUrl(PAGE_PATH)
  }
};

const MOCKS: Record<Exclude<DayMock, 'greeting'>, () => JSX.Element> = {
  brief: BriefMock,
  family: FamilyMock,
  assistant: AssistantMock,
  inbox: InboxMock,
  ical: IcalMock
};

/**
 * 中文標題在逗號後才換行：每一個分句是一個 inline-block，瀏覽器優先在分句之間斷行，
 * 分句本身比欄寬還長時仍會在分句內換行，不會溢出。
 */
function Phrase({ text }: { text: string }) {
  const parts = text.split(/(?<=[，、：；])/);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className="inline-block">
          {p}
        </span>
      ))}
    </>
  );
}

function Photo({ id, sizes, className }: { id: keyof typeof photos; sizes: string; className?: string }) {
  const p = photos[id];
  return <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes={sizes} className={className} />;
}

/** 手帳上的手寫箭頭（裝飾） */
function NoteArrow() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden>
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

export default function InsurCrmPage() {
  const [tagA, tagB] = PRODUCT_TAGLINE.split('，');

  return (
    <MotionRoot className="icrm-page">
      <JsonLd
        data={[
          softwareLd,
          faqPageLd(faqs),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: PRODUCT_NAME, path: PAGE_PATH }
          ])
        ]}
      />

      {/* ── 首屏：標語 + 業務在 LINE 跟助理的對話（2026-09-28 Shark：換回改版前的首屏畫面） ─── */}
      <section className="icrm-hero" aria-labelledby="icrm-h1">
        <div className="icrm-wrap icrm-hero-grid">
          <div>
            <Image
              src={LOGO.src}
              width={LOGO.width}
              height={LOGO.height}
              alt={`${PRODUCT_NAME} ${PRODUCT_SUBTITLE}`}
              priority
              sizes="200px"
              className="h-auto w-[176px] sm:w-[200px]"
            />
            <h1 id="icrm-h1" className="icrm-h1 mt-9">
              <span className="inline-block">{tagA}，</span>
              <br />
              <span className="inline-block">{tagB}</span>
            </h1>
            <p className="icrm-lead mt-7">{hero.lead}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
              <ComingSoonCta />
              <a href="#icrm-day" className="icrm-link">
                看業務的一天
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="icrm-small mt-6">
              {hero.status}．個人版 <span className="icrm-num font-bold text-[color:var(--icrm-ink)]">NT${SOLO_PRICE.toLocaleString('en-US')}</span>／月
            </p>
          </div>
          <div className="icrm-hero-visual">
            <HeroChat />
            {/* 浮動資訊卡（裝飾；內容與下方時間軸一致） */}
            <div className="icrm-float-card icrm-float icrm-float-a" aria-hidden>
              <div className="flex items-center gap-2 text-[13px] font-bold">
                <span className="icrm-float-icon text-[color:var(--icrm-red)]">
                  <MoonStar className="h-4 w-4" />
                </span>
                農曆八月十五
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--icrm-ink-3)]">中秋節祝福 12 則已擬好，等你確認</p>
            </div>
            <div className="icrm-float-card icrm-float-late icrm-float-b" aria-hidden>
              <div className="flex items-center gap-2 text-[13px] font-bold">
                <span className="icrm-float-icon text-[color:var(--icrm-teal)]">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                不收健康資料
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--icrm-ink-3)]">回覆寫到醫療字詞會直接擋下</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 業務的一天 ───────────────────────────────────── */}
      <section id="icrm-day" className="scroll-mt-20" aria-labelledby="icrm-day-title">
        <div className="icrm-wrap">
          <div className="icrm-day-head">
            <h2 id="icrm-day-title" className="icrm-h2">
              <Phrase text={headings.day} />
            </h2>
            <div>
              <p className="icrm-body">{headings.dayLead}</p>
            </div>
          </div>

          <ol>
            {dayEntries.map((d) => {
              const Mock = d.mock === 'greeting' ? null : MOCKS[d.mock];
              return (
                <li key={d.id} className="icrm-entry" aria-labelledby={`icrm-entry-${d.id}`}>
                  <div className="icrm-time">
                    <span className="icrm-time-num">
                      <span className="sr-only">時間 </span>
                      {d.time}
                    </span>
                    <span className="icrm-time-moment">{d.moment}</span>
                  </div>
                  <div data-reveal>
                    <h3 id={`icrm-entry-${d.id}`} className="icrm-h3">
                      <Phrase text={d.title} />
                    </h3>
                    <p className="icrm-body mt-4">{d.body}</p>
                    <ul className="icrm-items">
                      {d.items.map((it) => (
                        <li key={it.text}>
                          {it.text}
                          {it.team ? <span className="icrm-team ml-2 align-middle">團隊版</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
                    <p className="icrm-note icrm-hand">
                      {d.note}
                      <NoteArrow />
                    </p>
                    {d.photo ? (
                      <div className="icrm-stage">
                        <Photo id={d.photo} sizes="(min-width: 1024px) 520px, 100vw" className="icrm-stage-photo" />
                        <div className="icrm-stage-over">{Mock ? <Mock /> : <GreetingDemo />}</div>
                      </div>
                    ) : Mock ? (
                      <Mock />
                    ) : (
                      <GreetingDemo />
                    )}
                    <p className="icrm-mock-caption">{d.photo ? '示意照片與示意畫面．人物皆為虛構' : '示意畫面．人物皆為虛構'}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 客戶那一端 ───────────────────────────────────── */}
      <section className="icrm-client" aria-labelledby="icrm-client-title">
        <div className="icrm-wrap icrm-client-grid">
          <div className="icrm-client-stage" data-reveal>
            <Photo id="family" sizes="(min-width: 1024px) 480px, 100vw" className="icrm-stage-photo" />
            <div className="icrm-client-phone">
              <ClientPhoneMock />
            </div>
            <p className="icrm-mock-caption">示意照片與示意畫面．人物皆為虛構</p>
          </div>
          <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
            <span className="icrm-kicker">客戶看到的</span>
            <h2 id="icrm-client-title" className="icrm-h2 mt-4">
              <Phrase text={headings.client} />
            </h2>
            <p className="icrm-body mt-5">{clientSide.body}</p>
            <ul className="icrm-items max-w-[36em]">
              {clientSide.items.map((it) => (
                <li key={it.text}>{it.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 合規與界線（本頁唯一深色區） ───────────────────── */}
      <section id="compliance" className="icrm-dark scroll-mt-20" aria-labelledby="icrm-comp-title">
        <div className="icrm-wrap">
          <div className="max-w-[40em]" data-reveal>
            <span className="icrm-kicker">合規與資料保護</span>
            <h2 id="icrm-comp-title" className="icrm-h2 mt-4 text-white">
              <Phrase text={headings.compliance} />
            </h2>
            <p className="icrm-dark-muted mt-5 text-[1.05rem] leading-[1.9]">{compliance.lead}</p>
          </div>
          <ul className="icrm-rules">
            {compliance.does.map((r) => (
              <li key={r.title}>
                <h3>
                  {r.title}
                  {'team' in r && r.team ? <span className="icrm-team">團隊版</span> : null}
                </h3>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
          <div className="icrm-donts">
            <h3 className="icrm-serif text-xl text-white">系統刻意不做的事</h3>
            <ul>
              {compliance.donts.map((t) => (
                <li key={t}>
                  <span className="icrm-seal" aria-hidden>
                    不
                  </span>
                  <span>
                    <span className="sr-only">不</span>
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="icrm-dark-muted mt-6 text-sm">{compliance.footnote}</p>
        </div>
      </section>

      {/* ── 全部功能（不分階段；Shark 2026-09-28 決定頁面不顯示推出階段） ─── */}
      <section id="features" className="icrm-roadmap scroll-mt-20" aria-labelledby="icrm-road-title">
        <div className="icrm-wrap">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12" data-reveal>
            <h2 id="icrm-road-title" className="icrm-h2">
              <Phrase text={headings.roadmap} />
            </h2>
            <p className="icrm-body">{headings.roadmapLead}</p>
          </div>
          <ul className="icrm-featlist" data-reveal>
            {allFeatures.map((it) => (
              <li key={it.title}>
                <b>
                  {it.title}
                  {it.team ? <span className="icrm-team ml-1.5 align-middle">團隊版</span> : null}
                </b>
                <span>{it.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 方案 ─────────────────────────────────────────── */}
      <section id="plans" className="icrm-plans scroll-mt-20" aria-labelledby="icrm-plans-title">
        <div className="icrm-wrap">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-16" data-reveal>
            <div>
              <h2 id="icrm-plans-title" className="icrm-h2">
                <Phrase text={headings.plans} />
              </h2>
              <p className="icrm-body mt-5">個人版給業務本人；團隊版給通訊處，主管看全隊、業務各自經營自己的客戶。</p>
            </div>
            <figure>
              <Photo id="team" sizes="(min-width: 1024px) 480px, 100vw" className="icrm-stage-photo" />
              <figcaption className="icrm-mock-caption">示意照片．人物皆為虛構</figcaption>
            </figure>
          </div>
          <div className="icrm-plan-table" data-reveal>
            <div className="icrm-plan-row icrm-plan-head">
              <div aria-hidden />
              <div>
                <div className="text-lg font-bold">個人版</div>
                <div className="icrm-price">
                  <span className="icrm-small font-bold">NT$</span>
                  <b className="icrm-num">{SOLO_PRICE.toLocaleString('en-US')}</b>
                  <span className="icrm-small font-bold">／月</span>
                </div>
                <ComingSoonCta label="個人版" className="mt-5 w-full whitespace-normal sm:w-auto" />
              </div>
              <div>
                <div className="text-lg font-bold">團隊版</div>
                <div className="icrm-price">
                  <b>洽詢報價</b>
                </div>
                <ComingSoonCta label="團隊版" className="mt-5 w-full whitespace-normal sm:w-auto" />
              </div>
            </div>
            {planRows.map((r) => (
              <div key={r.label} className="icrm-plan-row">
                <div>{r.label}</div>
                <div className="icrm-plan-cell">
                  <small>個人版</small>
                  <span>{r.solo}</span>
                </div>
                <div className="icrm-plan-cell">
                  <small>團隊版</small>
                  <span>{r.team}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="icrm-small mt-6 max-w-[46em]">{planNote}</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="icrm-faq scroll-mt-20" aria-labelledby="icrm-faq-title">
        <div className="icrm-wrap icrm-faq-grid">
          <div>
            <h2 id="icrm-faq-title" className="icrm-h2">
              {headings.faq}
            </h2>
            <p className="icrm-body mt-5">找不到答案，直接在 LINE 問我們，由真人回覆。</p>
            <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="icrm-btn-line mt-7">
              <MessageCircle className="h-4 w-4" aria-hidden />
              LINE 詢問 {site.contact.lineId}
            </a>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* ── 結尾 ─────────────────────────────────────────── */}
      <section className="icrm-closing" aria-labelledby="icrm-closing-title">
        <div className="icrm-wrap flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-5">
            <Image src={LOGO_MARK.src} width={LOGO_MARK.width} height={LOGO_MARK.height} alt="" sizes="64px" className="mt-2 h-14 w-14 shrink-0" />
            <div>
              <h2 id="icrm-closing-title" className="icrm-h2">
                {tagA}，
                <br />
                {tagB}
              </h2>
              <p className="icrm-small mt-3">
                {PRODUCT_NAME}．{PRODUCT_SUBTITLE}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ComingSoonCta />
            <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="icrm-link">
              <MessageCircle className="h-4 w-4" aria-hidden />
              先用 LINE 問問看
            </a>
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
