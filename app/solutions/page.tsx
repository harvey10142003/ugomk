import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ModuleExplorer } from '@/components/ModuleExplorer';
import { DashboardMock } from '@/components/mocks/DashboardMock';
import { crmModules, platformCapabilities, industryPacks } from '@/lib/data/modules';
import { site } from '@/lib/data/site';
import { productLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: `解決方案｜${site.product}與 ${crmModules.length} 個可插拔模組`,
  description: `${site.product}把會員資料與推薦裂變放在核心，門市營運、行銷自動化與產業專用模組全部掛在同一份會員資料上，依營運需求逐一開通。`,
  alternates: { canonical: '/solutions' }
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={productLd} />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative grid gap-12 items-center lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
          <div>
            <span className="chip-brand">解決方案</span>
            <h1 className="heading-1 mt-6 text-balance">
              一套核心，
              <br />
              <span className="text-gradient-brand">{crmModules.length} 個模組</span>依需求開通
            </h1>
            <p className="body-lg mt-7 max-w-xl">
              <b className="text-brand-800">{site.product}</b>
              把會員資料與推薦裂變放在正中央，門市營運與行銷工具全部掛在同一份會員資料上。不需要為了少數功能買下整套系統。
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
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-100/50 via-mint-100/40 to-transparent blur-3xl" />
            <div className="relative">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 架構圖 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-on-dark">System Architecture</span>
            <h2 className="heading-2 mt-3 text-white text-balance">四層架構，資料只有一份</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              顧客從哪個入口進來都指向同一筆會員資料；模組是掛上去的，不是各自為政的系統。
            </p>
          </div>
          <div className="mt-14">
            <ArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* ─────────── 平台底層能力 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Platform</span>
            <h2 className="heading-2 mt-3 text-balance">模組之下的四個底層能力</h2>
            <p className="body-base mt-4">這四件事不是功能，是每個模組都在用的地基。</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformCapabilities.map((c) => (
              <article key={c.title} className="card-hover p-7">
                <span className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-brand-100 bg-brand-50 text-base font-extrabold text-brand-800">
                  {c.mark}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 模組總覽 ─────────── */}
      <section className="section border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Modules</span>
            <h2 className="heading-2 mt-3 text-balance">目前擁有的 {crmModules.length} 個模組</h2>
            <p className="body-base mt-4">
              全部取自實際上線系統的模組定義，不是規劃中的清單。標示「分店獨立」者可依各分店個別啟用。
            </p>
          </div>
          <ModuleExplorer />
        </div>
      </section>

      {/* ─────────── 產業組合包 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Industry packs</span>
            <h2 className="heading-2 mt-3 text-balance">同產業通常這樣組合</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {industryPacks.map((p) => (
              <article key={p.industry} className="card-hover flex flex-col p-7">
                <span className="chip-brand self-start">{p.industry}</span>
                <h3 className="heading-3 mt-5">{p.title}</h3>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 客製 CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="card-glow bg-gradient-to-br from-brand-50 to-mint-100/40 p-10 text-center md:p-14">
            <span className="eyebrow">客製開發與系統串接</span>
            <h2 className="heading-3 mt-4 text-balance">不在這 {crmModules.length} 個裡面的功能？</h2>
            <p className="body-base mx-auto mt-4 max-w-xl">
              現有系統無法滿足的欄位、流程或第三方服務，可依實際需求評估 API 串接與客製開發。先聊聊你的情況。
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
