import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Store, LayoutGrid, Users, Tablet, BarChart3 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { ModuleGroups } from '@/components/ModuleGroups';
import { ModuleArchitectureMock } from '@/components/mocks/ModuleArchitectureMock';
import { ToolSprawlCompare } from '@/components/mocks/ToolSprawlCompare';
import { ChatFlowMock } from '@/components/mocks/ChatFlowMock';
import { DashboardMock } from '@/components/mocks/DashboardMock';
import { POSMock } from '@/components/mocks/POSMock';
import { howItWorks, audienceViews, industryPacks, siteModuleCount } from '@/lib/data/modules';
import { site } from '@/lib/data/site';
import { productLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: '多模組架構｜一套系統滿足企業所有需求',
  description:
    '需要收銀就開收銀，需要預約就開預約。UGO AI CRM 讓門市營運與顧客互動模組共用同一份會員資料，每間分店各自開通需要的功能，不必為了一個功能買下整套系統。',
  alternates: { canonical: '/solutions' }
};

/** 大圖旁的浮動說明 — 沿用 hero 對話圖那套語彙 */
function Note({
  icon: Icon,
  title,
  text,
  className
}: {
  icon: typeof Users;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`absolute hidden lg:block ${className ?? ''}`}>
      <div className="glass max-w-[190px] px-3 py-2">
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <div>
            <div className="text-[10px] font-bold text-ink-900">{title}</div>
            <div className="mt-0.5 text-[9px] leading-relaxed text-ink-500">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={productLd} />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <span className="chip-brand">
              <LayoutGrid className="h-3 w-3" />
              多模組架構
            </span>
            <h1 className="heading-1 mt-6 text-balance">
              一套系統，
              <br />
              滿足企業<span className="text-gradient-brand">所有需求</span>
            </h1>
            <p className="body-lg mt-7 max-w-xl">
              需要收銀就開收銀，需要預約就開預約。不用為了一個功能買下整套系統，也不用讓五六套工具，各自記著同一位客人。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-outline">
                查看費用方案
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-500">
              {['開了才付費', '分店各自開', '資料只有一份'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-brand-100/50 via-mint-100/40 to-transparent blur-3xl" />
            <div className="relative">
              <ChatFlowMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 為什麼要一套 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why one system</span>
            <h2 className="heading-2 mt-3 text-balance">問題不是工具不夠，是工具彼此不認識</h2>
            <p className="body-base mt-4">
              大部分店家不缺系統，缺的是讓這些系統講同一種話。
            </p>
          </div>
          <div className="mt-14">
            <ToolSprawlCompare />
          </div>
        </div>
      </section>

      {/* ─────────── 多模組架構 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-on-dark">Architecture</span>
            <h2 className="heading-2 mt-3 text-white text-balance">多模組架構長什麼樣</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              中間是所有模組共用的那份會員資料，外面是可以隨時加、隨時停的模組。
              亮起來的是這間店開的，灰色的是之後想要再加就好。
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <ModuleArchitectureMock />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {howItWorks.map((h) => (
              <article key={h.title} className="rounded-2xl border border-brand-200/20 bg-white/[0.04] p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-base font-extrabold text-brand-900">
                  {h.mark}
                </span>
                <h3 className="mt-4 text-base font-bold text-white">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">{h.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 誰在用、看到什麼 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Who uses what</span>
            <h2 className="heading-2 mt-3 text-balance">同一套系統，三種人看到三種畫面</h2>
            <p className="body-base mt-4">
              顧客不會看到後台，店員不會看到不該看的報表。每個角色只看到自己需要的部分。
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {audienceViews.map((a, i) => (
              <article key={a.key} className="card-hover p-7">
                <span className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-800">
                  {i === 0 ? (
                    <Users className="h-5 w-5" />
                  ) : i === 1 ? (
                    <Tablet className="h-5 w-5" />
                  ) : (
                    <BarChart3 className="h-5 w-5" />
                  )}
                </span>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-widest-2 text-brand-600">
                  {a.label}
                </div>
                <h3 className="mt-1 text-lg font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.description}</p>
              </article>
            ))}
          </div>

          {/* 店員：現場畫面 */}
          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow">店員的畫面</span>
              <h3 className="heading-3 mt-3 text-balance">結帳的時候，會員資料就在旁邊</h3>
              <p className="body-base mt-5">
                不用先在 POS 結完帳、再打開另一個系統幫客人集點。點餐、折扣、扣點、開發票在同一個畫面走完，
                新來的工讀生看一次就會用。
              </p>
              <ul className="mt-6 space-y-2.5">
                {['認人不認單號：掃 QR 或報電話就帶出會員', '沒開通的模組不會出現，畫面不會被塞滿', '每間分店的帳各自結，總部一起看'].map(
                  (t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-ink-500">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {t}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="relative">
              <POSMock />
              <Note
                icon={Users}
                title="結帳時直接帶出會員"
                text="掃 QR 或報電話，點數與等級同時算"
                className="-right-5 -top-4"
              />
              <Note
                icon={Store}
                title="每間店開自己的模組"
                text="沒開通的功能不會出現在畫面上"
                className="-left-5 top-40"
              />
            </div>
          </div>

          {/* 老闆：後台畫面 */}
          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:order-first">
              <DashboardMock />
              <Note
                icon={BarChart3}
                title="全部分店同一頁"
                text="營業額、會員成長、推播成效一起看"
                className="-left-5 top-6"
              />
              <Note
                icon={LayoutGrid}
                title="模組隨時開關"
                text="新增分店時勾選要開的模組即可"
                className="-right-5 bottom-8"
              />
            </div>
            <div>
              <span className="eyebrow">老闆的畫面</span>
              <h3 className="heading-3 mt-3 text-balance">不用等店長回報才知道發生什麼事</h3>
              <p className="body-base mt-5">
                今天幾個新會員、哪一間店業績掉了、上週推播帶回多少人，打開後台就看得到。
                要開新分店時，勾選要開的模組，當天就能營業。
              </p>
              <ul className="mt-6 space-y-2.5">
                {['分店、店長、店員、收銀四種權限分開', '報表按分店拆開，也能合併看', '資料可以匯出，不會被鎖在系統裡'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-ink-500">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 模組清單 ─────────── */}
      <section className="section border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Modules</span>
            <h2 className="heading-2 mt-3 text-balance">可以開通的 {siteModuleCount} 個模組</h2>
            <p className="body-base mt-4">
              會員、點數、標籤、推播這些是每個品牌都有的基本功能，不用另外開通。
              下面這些是依照行業與營運方式選配的部分。
            </p>
          </div>
          <div className="mt-14">
            <ModuleGroups />
          </div>
        </div>
      </section>

      {/* ─────────── 產業組合包 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Industry packs</span>
            <h2 className="heading-2 mt-3 text-balance">不知道要開哪些？同行通常這樣配</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {industryPacks.map((p) => (
              <article key={p.industry} className="card-hover flex flex-col overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.industry}場景`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/10 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-brand-800">
                    {p.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                <h3 className="heading-3">{p.title}</h3>
                <ul className="mt-5 flex-1 space-y-2">
                  {p.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-ink-500">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                      {m}
                    </li>
                  ))}
                </ul>
                <Link href="/cases" className="btn-outline mt-6 self-start px-4 py-2 text-[0.82rem]">
                  看實際案例
                </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="card-glow bg-gradient-to-br from-brand-50 to-mint-100/40 p-10 text-center md:p-14">
            <span className="eyebrow">客製開發與系統串接</span>
            <h2 className="heading-3 mt-4 text-balance">想要的功能不在上面？</h2>
            <p className="body-base mx-auto mt-4 max-w-xl">
              現有模組滿足不了的欄位、流程或第三方服務，可以依實際需求評估串接與客製開發。先聊聊你的情況。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-outline">
                查看費用方案
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
