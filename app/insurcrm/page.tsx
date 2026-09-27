import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  Ban,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ClipboardCheck,
  Gift,
  HeartOff,
  Landmark,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  Mic,
  MoonStar,
  PenLine,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Trash2,
  UserRound,
  UserRoundCheck
} from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { pageMeta, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd, faqPageLd, ORGANIZATION_ID } from '@/lib/jsonld';
import { site } from '@/lib/data/site';
import { cn } from '@/lib/utils';
import {
  LOGO,
  LOGO_MARK,
  OG_IMAGE_PATH,
  PAGE_PATH,
  PHASE_LABEL,
  PRODUCT_NAME,
  PRODUCT_SUBTITLE,
  PRODUCT_TAGLINE,
  SOLO_PRICE,
  assistantAbilities,
  assistantPrinciples,
  complianceItems,
  daySteps,
  differentiators,
  facts,
  faqs,
  heroPoints,
  onboardingSteps,
  personas,
  plans
} from './_data/content';
import { MotionRoot } from './_components/MotionRoot';
import { SectionNav } from './_components/SectionNav';
import { HeroChat } from './_components/HeroChat';
import { CountUp } from './_components/CountUp';
import { FeatureTabs } from './_components/FeatureTabs';
import { GreetingDemo } from './_components/GreetingDemo';
import { PhoneCarousel } from './_components/PhoneCarousel';
import { Faq } from './_components/Faq';
import { ComingSoonCta } from './_components/ComingSoonCta';
import { MoreFeatures } from './_components/MoreFeatures';
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
 * 位置沿用 hero / section_nav / differentiators / plan_solo / plan_team / final_cta，名單會帶 src=insurcrm。
 */

const NAV = [
  { id: 'workflow', label: '一天的節奏' },
  { id: 'features', label: '核心功能' },
  { id: 'assistant', label: 'AI 助理' },
  { id: 'greeting', label: '祝福示範' },
  { id: 'more-features', label: '更多功能' },
  { id: 'plans', label: '方案' },
  { id: 'compliance', label: '合規與資料' },
  { id: 'faq', label: '常見問題' }
];

const DAY_ICONS = { sunrise: Sunrise, gift: Gift, mic: Mic, calendar: CalendarDays };
const ASSIST_ICONS = { sunrise: Sunrise, pen: PenLine, mic: Mic, chat: MessagesSquare };
const DIFF_ICONS = { line: MessageCircle, user: UserRoundCheck, moon: MoonStar, shield: ShieldCheck };
const PERSONA_ICONS = { shield: ShieldCheck, landmark: Landmark, briefcase: BriefcaseBusiness, building: Building2 };
const COMPLIANCE_ICONS = { 'heart-off': HeartOff, lock: LockKeyhole, check: ClipboardCheck, trash: Trash2, ai: Bot, ban: Ban };

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

function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
  className
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)} data-reveal>
      <span className={dark ? 'eyebrow-on-dark' : 'eyebrow'}>{eyebrow}</span>
      <h2 className={cn('heading-1 mt-4 text-balance whitespace-pre-line', dark && 'text-white')}>{title}</h2>
      {lead ? <p className={cn('body-lg mt-5 text-balance', dark && 'text-brand-100')}>{lead}</p> : null}
    </div>
  );
}

export default function InsurCrmPage() {
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

      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="top" className="hero-bg relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        {/* 月相軌道：農曆與時間的識別圖形（裝飾） */}
        <div className="pointer-events-none absolute right-[-180px] top-10 hidden h-[760px] w-[760px] lg:block" aria-hidden>
          <div className="icrm-orbit icrm-orbit-spin inset-0">
            <span className="icrm-orbit-dot bg-[#E9A23B]" />
          </div>
          <div className="icrm-orbit icrm-orbit-spin-rev inset-[90px]">
            <span className="icrm-orbit-dot bg-[#1AC6C8]" />
          </div>
          <div className="icrm-orbit inset-[180px] border-solid border-brand-100" />
        </div>
        <div className="dot-grid-fade pointer-events-none absolute inset-0" aria-hidden />

        <div className="container-ug relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-brand-800 backdrop-blur" data-reveal>
              <span className="relative inline-flex h-2 w-2">
                <span className="icrm-pulse-ring absolute inset-0 rounded-full bg-[#1AC6C8]" aria-hidden />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1E97A6]" />
              </span>
              即將推出．功能分階段上線
            </span>
            {/* Logo 已含產品名與副標；透明背景 PNG，放在淺色 hero 上 */}
            <div className="mt-7" data-reveal style={{ '--d': '60ms' } as React.CSSProperties}>
              <Image
                src={LOGO.src}
                width={LOGO.width}
                height={LOGO.height}
                alt={`${PRODUCT_NAME} ${PRODUCT_SUBTITLE}`}
                priority
                sizes="(min-width: 640px) 240px, 200px"
                className="h-auto w-[200px] sm:w-[240px]"
              />
            </div>
            {/* 品牌標語就是主標：它同時回答「這是什麼、對我有什麼好處」，舊的暫定主標退到說明文字裡 */}
            <h1 className="heading-display mt-6" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              {PRODUCT_TAGLINE.split('，')[0]}，
              <br />
              <span className="icrm-text-logo">{PRODUCT_TAGLINE.split('，')[1]}</span>
            </h1>
            <p className="body-lg mt-6 max-w-xl" data-reveal style={{ '--d': '200ms' } as React.CSSProperties}>
              每一位客戶的關係，都在 LINE 裡替你記得。家庭與保單整理、生日與農曆節日祝福一鍵確認、每天早上的早報，再加上一位在
              LINE 裡聽你說話的 AI 業務助理。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal style={{ '--d': '280ms' } as React.CSSProperties}>
              <ComingSoonCta size="lg" />
              <a href="#features" className="btn-outline px-7 py-3.5 text-base">
                看完整功能
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2" data-reveal style={{ '--d': '360ms' } as React.CSSProperties}>
              {heroPoints.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600">
                  <Check className="h-4 w-4 text-brand-600" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative" data-reveal="zoom" style={{ '--d': '160ms' } as React.CSSProperties}>
            <HeroChat />
            {/* 浮動資訊卡（裝飾） */}
            <div
              className="icrm-float absolute -left-2 top-16 hidden w-52 rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-card backdrop-blur sm:block lg:-left-12"
              aria-hidden
            >
              <div className="flex items-center gap-2 text-xs font-bold text-ink-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FBEFD9] text-[#B7791F]">
                  <MoonStar className="h-4 w-4" />
                </span>
                農曆八月十五
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-600">中秋節祝福 12 則已擬好，等你確認</p>
            </div>
            <div
              className="icrm-float-late absolute -right-2 bottom-24 hidden w-48 rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-card backdrop-blur sm:block lg:-right-6"
              aria-hidden
            >
              <div className="flex items-center gap-2 text-xs font-bold text-ink-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                不蒐集健康資料
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-600">筆記出現醫療字詞會提醒刪除</p>
            </div>
          </div>
        </div>
      </section>

      <SectionNav
        links={NAV}
        mark={{ ...LOGO_MARK, alt: PRODUCT_NAME }}
      />

      {/* ── 一天的節奏 ───────────────────────────────────── */}
      <section id="workflow" className="section-tight scroll-mt-36">
        <div className="container-ug">
          <SectionHead
            eyebrow="業務的一天"
            title={'記性再好，也記不住\n幾百位客戶的生日與週年'}
            lead="把「該聯絡誰、該說什麼」交給系統整理，你把時間留給見面與對話。"
          />
          <div className="relative mt-14" data-reveal>
            {/* 進度線（桌機） */}
            <div className="absolute left-0 right-0 top-[22px] hidden h-0.5 bg-brand-100 md:block" aria-hidden>
              <div className="icrm-progress h-full bg-gradient-to-r from-brand-700 via-[#1AC6C8] to-[#E9A23B]" />
            </div>
            <ol className="grid gap-6 md:grid-cols-4">
              {daySteps.map((s, k) => {
                const Icon = DAY_ICONS[s.icon];
                return (
                  <li key={s.time} className="relative" data-reveal style={{ '--d': `${k * 120}ms` } as React.CSSProperties}>
                    <div className="flex items-center gap-3 md:block">
                      <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border-4 border-mist-100 bg-brand-800 text-white shadow-brand">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-mono text-sm font-bold text-brand-700 md:mt-4 md:block">{s.time}</span>
                    </div>
                    <div className="card-hover mt-4 p-5">
                      <h3 className="text-base font-bold text-ink-900">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 產品事實數字 */}
          <dl className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {facts.map((f, k) => (
              <div
                key={f.label}
                className="rounded-3xl border border-brand-100 bg-gradient-to-b from-white to-brand-50/60 p-5 sm:p-6"
                data-reveal
                style={{ '--d': `${k * 90}ms` } as React.CSSProperties}
              >
                <dt className="text-sm font-semibold text-ink-600">{f.label}</dt>
                <dd className="mt-2 font-display text-3xl font-extrabold text-brand-900 sm:text-4xl">
                  <CountUp value={f.value} prefix={f.prefix} suffix={f.suffix} />
                </dd>
                <dd className="mt-2 text-xs leading-relaxed text-ink-500">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 核心功能（分頁） ─────────────────────────────── */}
      <section id="features" className="section-tight scroll-mt-36 bg-white">
        <div className="container-ug">
          <SectionHead
            eyebrow="核心功能"
            title="從家庭、保單到每一次關懷"
            lead="首波推出的五大核心功能。點選分頁看每一項能幫你做什麼。"
          />
          <div className="mt-12" data-reveal>
            <FeatureTabs />
          </div>
        </div>
      </section>

      {/* ── AI 助理（深色帶） ─────────────────────────────── */}
      <section id="assistant" className="scroll-mt-36 py-16 md:py-24">
        <div className="container-ug">
          <div className="icrm-dark relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-brand-100 sm:px-10 md:px-14 md:py-20">
            <div className="icrm-grid-dark pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative">
              <div className="flex flex-col items-center text-center" data-reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#1AC6C8]/40 bg-[#1AC6C8]/10 px-3.5 py-1.5 text-xs font-semibold text-[#9FE3EA]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  AI 業務助理．{PHASE_LABEL[2]}推出
                </span>
                <h2 className="heading-1 mt-5 max-w-3xl text-white">
                  在 LINE 裡說一句話，
                  <br />
                  助理幫你記好、排好、擬好
                </h2>
                <p className="body-lg mt-5 max-w-2xl text-balance text-brand-100">
                  只有你看得到的業務助理。它能查客戶、記筆記、建待辦、寫草稿，但不會替你對客戶發出任何一則訊息。
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {assistantAbilities.map((a, k) => {
                  const Icon = ASSIST_ICONS[a.icon];
                  return (
                    <div
                      key={a.title}
                      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1AC6C8]/50 hover:bg-white/[0.07]"
                      data-reveal
                      style={{ '--d': `${k * 100}ms` } as React.CSSProperties}
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1AC6C8] to-[#0B7DB4] text-white transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 text-lg font-bold text-white">{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-100/90">{a.body}</p>
                    </div>
                  );
                })}
              </div>

              {/* 草稿 → 確認 → 留痕 */}
              <div className="mt-12 rounded-3xl border border-white/10 bg-brand-950/40 p-6 md:p-8" data-reveal>
                <div className="text-center text-sm font-semibold text-[#9FE3EA]">AI 的使用原則</div>
                <ol className="mt-6 grid gap-6 md:grid-cols-3">
                  {assistantPrinciples.map((p, k) => (
                    <li key={p.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#1AC6C8]/60 font-mono text-sm font-bold text-white">
                        {k + 1}
                      </span>
                      {k < assistantPrinciples.length - 1 ? (
                        <span className="absolute left-[calc(50%+32px)] right-[calc(-50%+32px)] top-5 hidden h-px bg-gradient-to-r from-[#1AC6C8]/60 to-transparent md:block" aria-hidden />
                      ) : null}
                      <div>
                        <div className="font-bold text-white">{p.title}</div>
                        <p className="mt-1 text-sm text-brand-100/85">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 祝福一鍵確認互動示範 ─────────────────────────── */}
      <section id="greeting" className="section-tight scroll-mt-36">
        <div className="container-ug grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal="left">
            <span className="eyebrow">動手試試看</span>
            <h2 className="heading-1 mt-4">
              早上一分鐘，
              <br />
              把今天的祝福送出去
            </h2>
            <p className="body-lg mt-5">
              系統依生日、農曆節日與保單週年，每天先把祝福擬好。你勾選、改幾個字、按確認，訊息就在設定的時間以你的名義送達。
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-ink-700">
              {[
                '沒有確認的祝福不會發出，隔天早報會提醒',
                '農曆節日與農曆生日每年自動換算成國曆日期',
                '也可以設定「自動發送」，但只限範本原文'
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-400">右側為互動示範，不會送出任何訊息。人物與內容皆為虛構。</p>
          </div>
          <div data-reveal="right">
            <GreetingDemo />
          </div>
        </div>
      </section>

      {/* ── 手機畫面輪播 ─────────────────────────────────── */}
      <section className="section-tight overflow-hidden bg-gradient-to-b from-white to-mist-200" aria-labelledby="icrm-screens-title">
        <div className="container-ug">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="eyebrow">在手機上的樣子</span>
            <h2 id="icrm-screens-title" className="heading-1 mt-4 text-balance">
              你用的、客戶看的，都在 LINE 裡
            </h2>
          </div>
          <div className="mt-14" data-reveal>
            <PhoneCarousel />
          </div>
        </div>
      </section>

      {/* ── 更多功能（功能介紹；不標示推出階段） ───────────────── */}
      <section id="more-features" className="section-tight scroll-mt-36">
        <div className="container-ug">
          <SectionHead
            eyebrow="更多功能"
            title="更多讓你事半功倍的功能"
            lead="從送件追蹤、客戶關懷到團隊管理，把業務日常的細節照顧好。每一項都遵守同一個原則：AI 只給建議，由你確認，全程留痕。"
          />
          <MoreFeatures />
        </div>
      </section>

      {/* ── 差異化 ───────────────────────────────────────── */}
      <section className="section-tight bg-white" aria-labelledby="icrm-diff-title">
        <div className="container-ug grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start" data-reveal="left">
            <span className="eyebrow">為什麼是 LINE</span>
            <h2 id="icrm-diff-title" className="heading-1 mt-4 text-balance">
              客戶本來就在 LINE 上，
              <br />
              關係就該在那裡經營
            </h2>
            <p className="body-lg mt-5">
              我們從台灣業務的日常出發：客戶不想多裝一個 App，長輩過農曆生日，而每一則訊息都代表你本人。
            </p>
            <ComingSoonCta className="mt-8" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((d, k) => {
              const Icon = DIFF_ICONS[d.icon];
              const isLine = d.icon === 'line';
              return (
                <div
                  key={d.title}
                  className="card-hover relative overflow-hidden p-7"
                  data-reveal
                  style={{ '--d': `${k * 100}ms` } as React.CSSProperties}
                >
                  <span
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
                      isLine ? 'bg-line-50 text-line-700' : d.icon === 'moon' ? 'bg-[#FBEFD9] text-[#B7791F]' : 'bg-brand-50 text-brand-700'
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{d.body}</p>
                  <span className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-brand-50" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 適用對象 + 方案 ─────────────────────────────── */}
      <section id="plans" className="section-tight scroll-mt-36">
        <div className="container-ug">
          <SectionHead
            eyebrow="適用對象與方案"
            title="一個人經營，或整個團隊一起用"
            lead="個人版與團隊版是同一套系統的兩種方案，彼此獨立、資料不互通。"
          />

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p, k) => {
              const Icon = PERSONA_ICONS[p.icon];
              return (
                <li
                  key={p.title}
                  className="flex gap-3 rounded-2xl border border-ink-100 bg-white/70 p-4"
                  data-reveal
                  style={{ '--d': `${k * 80}ms` } as React.CSSProperties}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden />
                  <div>
                    <div className="text-sm font-bold text-ink-900">{p.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-600">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {plans.map((p, k) => (
              <div
                key={p.id}
                className={cn(
                  'icrm-plan flex flex-col rounded-[2rem] border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card sm:p-9',
                  p.highlight ? 'border-brand-300 shadow-brand' : 'border-ink-100'
                )}
                data-reveal
                style={{ '--d': `${k * 120}ms` } as React.CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-extrabold text-ink-900">{p.name}</h3>
                  {p.highlight ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1 text-xs font-semibold text-white">
                      <UserRound className="h-3.5 w-3.5" aria-hidden />
                      自助開通
                    </span>
                  ) : (
                    <span className="chip-ink">協助導入</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-ink-600">{p.audience}</p>
                <div className="mt-6 flex items-end gap-1.5">
                  {p.price ? (
                    <>
                      <span className="pb-1.5 text-sm font-semibold text-ink-500">NT$</span>
                      <span className="font-display text-5xl font-extrabold tabular-nums text-brand-900">
                        {p.price.toLocaleString('en-US')}
                      </span>
                      <span className="pb-1.5 text-sm font-semibold text-ink-500">／月</span>
                    </>
                  ) : (
                    <span className="font-display text-4xl font-extrabold text-brand-900">洽詢報價</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-ink-500">{p.priceNote}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <ComingSoonCta label={p.cta} className="mt-8 w-full" />
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-ink-500" data-reveal>
            搶先預約即將開放。LINE 官方帳號的訊息費用依你的官方帳號方案由 LINE 計收，不含在月費內。
          </p>
        </div>
      </section>

      {/* ── 三步開通 ─────────────────────────────────────── */}
      <section className="section-tight bg-white" aria-labelledby="icrm-steps-title">
        <div className="container-ug">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="eyebrow">怎麼開始</span>
            <h2 id="icrm-steps-title" className="heading-1 mt-4">
              三個步驟，開始經營
            </h2>
          </div>
          <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
            {onboardingSteps.map((s, k) => (
              <li
                key={s.title}
                className="relative rounded-3xl border border-brand-100 bg-gradient-to-b from-brand-50/70 to-white p-7"
                data-reveal
                style={{ '--d': `${k * 140}ms` } as React.CSSProperties}
              >
                <span className="font-display text-6xl font-extrabold leading-none text-brand-100" aria-hidden>
                  0{k + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink-900">
                  <span className="sr-only">步驟 {k + 1}：</span>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                {k < onboardingSteps.length - 1 ? (
                  <ArrowRight
                    className="absolute -right-5 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white p-1 text-brand-600 shadow-soft md:block"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 合規與資料保護 ───────────────────────────────── */}
      <section id="compliance" className="section-tight scroll-mt-36">
        <div className="container-ug">
          <SectionHead
            eyebrow="合規與資料保護"
            title="把該守的界線，做進系統裡"
            lead="我們依個人資料保護法與保險業招攬相關規範的精神設計這套系統。以下為產品設計原則，實際合規仍以你所屬公司或機構的規定為準。"
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {complianceItems.map((c, k) => {
              const Icon = COMPLIANCE_ICONS[c.icon];
              return (
                <li
                  key={c.title}
                  className="rounded-3xl border border-ink-100 bg-white p-6"
                  data-reveal
                  style={{ '--d': `${(k % 3) * 90}ms` } as React.CSSProperties}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-bold text-ink-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="section-tight scroll-mt-36 bg-white">
        <div className="container-ug grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal="left">
            <span className="eyebrow">常見問題</span>
            <h2 className="heading-1 mt-4">還想知道的事</h2>
            <p className="body-lg mt-5">找不到答案？直接在 LINE 問我們，會由真人回覆。</p>
            <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="btn-line mt-8">
              <MessageCircle className="h-4 w-4" aria-hidden />
              LINE 詢問 {site.contact.lineId}
            </a>
          </div>
          <div data-reveal="right">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* ── 結尾 CTA ─────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-ug">
          <div className="icrm-dark relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-10 md:py-20" data-reveal="zoom">
            <div className="icrm-grid-dark pointer-events-none absolute inset-0" aria-hidden />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2" aria-hidden>
              <div className="icrm-orbit icrm-orbit-spin inset-0 border-[#1AC6C8]/30">
                <span className="icrm-orbit-dot bg-[#E9A23B]" />
              </div>
            </div>
            <div className="relative">
              {/* 深色底只放盾牌圖示（完整 logo 的深色字在深底上看不清楚） */}
              <Image
                src={LOGO_MARK.src}
                width={LOGO_MARK.width}
                height={LOGO_MARK.height}
                alt=""
                aria-hidden
                sizes="72px"
                className="mx-auto h-16 w-16 object-contain drop-shadow-[0_10px_30px_rgba(26,198,200,0.35)] md:h-[72px] md:w-[72px]"
              />
              <h2 className="heading-1 mx-auto mt-6 max-w-3xl text-white">
                {PRODUCT_TAGLINE.split('，')[0]}，
                <br />
                {PRODUCT_TAGLINE.split('，')[1]}
              </h2>
              <p className="body-lg mx-auto mt-5 max-w-2xl text-balance text-brand-100">
                {PRODUCT_NAME}，{PRODUCT_SUBTITLE}。搶先預約即將開放，想先了解可以直接用 LINE 問我們。
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ComingSoonCta tone="dark" size="lg" />
                <a href={site.contact.lineUrl} target="_blank" rel="noopener" className="btn-line px-7 py-3.5 text-base">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  用 LINE 詢問
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
