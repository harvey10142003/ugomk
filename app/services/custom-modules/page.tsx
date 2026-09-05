import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Blocks, CheckCircle2 } from 'lucide-react';
import { ModuleGroups } from '@/components/ModuleGroups';
import { ModuleArchitectureMock } from '@/components/mocks/ModuleArchitectureMock';
import { siteModuleCount } from '@/lib/data/modules';
import { site } from '@/lib/data/site';
import { RelatedServices } from '@/components/RelatedServices';
import { CtaBlock } from '@/components/CtaBlock';
import { JsonLd } from '@/components/JsonLd';
import { serviceLd, breadcrumbLd } from '@/lib/jsonld';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  path: '/services/custom-modules',
  title: `LINE@ 客製化模組｜${siteModuleCount} 個現成模組，不夠再依流程開發`,
  description:
    '門市營運與顧客互動模組可依需求逐一開通，共用同一份會員資料。現有模組滿足不了的欄位、流程或第三方串接，可依實際營運方式評估客製開發。'
});

const CUSTOM_PROCESS = [
  { step: '01', title: '流程訪談', detail: '先看你現在怎麼做：誰操作、什麼時候做、資料現在記在哪裡。' },
  { step: '02', title: '判斷做法', detail: '能用現成模組解決就不客製；真的缺才開發，這樣維護成本最低。' },
  { step: '03', title: '規格確認', detail: '把要做的欄位、流程與畫面寫清楚再動工，避免做完才發現不是要的。' },
  { step: '04', title: '開發上線', detail: '先在測試環境跑過完整流程，確認沒問題再開到正式環境。' }
];

const CUSTOM_CASES = [
  { title: '欄位不夠用', detail: '既有模組少一兩個你營運上必填的欄位，加上去並讓報表算得到。' },
  { title: '流程不一樣', detail: '同樣是預約，你的行業多了一道審核或分派，照你的流程改。' },
  { title: '要接別的系統', detail: '接你現有的 ERP、金流、物流或政府 API，讓資料不用人工搬。' },
  { title: '整個行業沒人做', detail: '像宮廟點燈、市集攤商這類模組，本來也是從單一客戶的需求長出來的。' }
];

export default function CustomModulesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'LINE@ 客製化模組',
            description:
              '現有模組滿足不了的欄位、流程或第三方服務，依實際營運方式評估客製開發與 API 串接，並接進同一份會員資料。',
            path: '/services/custom-modules',
            serviceType: 'LINE CRM 模組客製開發與系統串接'
          }),
          breadcrumbLd([
            { name: '首頁', path: '/' },
            { name: '解決方案', path: '/solutions' },
            { name: 'LINE@ 客製化模組', path: '/services/custom-modules' }
          ])
        ]}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
          <span className="chip-brand">
            <Blocks className="h-3 w-3" />
            LINE@ 客製化模組
          </span>
          <h1 className="heading-1 mt-6 text-balance">
            {siteModuleCount} 個現成模組先用，
            <br />
            <span className="text-gradient-brand">不夠再照你的流程做</span>
          </h1>
          <p className="body-lg mt-7 max-w-3xl">
            大部分需求用現成模組組合就能解決，開通當天就能用。真的缺的那一塊，我們才依你的實際流程開發，不是每個需求都從零寫一套。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={site.cta.primary.href} className="btn-brand">
              討論你的需求
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/solutions" className="btn-outline">
              看多模組架構
            </Link>
          </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-brand-100/50 via-mint-100/40 to-transparent blur-3xl" />
            <Image
              src="/hero-visual.jpg"
              alt="模組像積木一樣掛在同一份會員資料上的示意"
              width={1600}
              height={900}
              priority
              className="relative rounded-2xl shadow-card"
            />
          </div>
        </div>
      </section>

      {/* ─────────── 架構圖 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-on-dark">Architecture</span>
            <h2 className="heading-2 mt-3 text-white text-balance">客製的東西，掛在同一份會員資料上</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-200">
              客製模組不是另外一套系統。它跟現成模組共用同一份會員、點數與標籤，所以客製出來的功能一樣算得進報表、觸發得了自動化。
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl">
            <ModuleArchitectureMock />
          </div>
        </div>
      </section>

      {/* ─────────── 現成模組 ─────────── */}
      <section className="section border-b border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Ready to use</span>
            <h2 className="heading-2 mt-3 text-balance">先看看這 {siteModuleCount} 個夠不夠用</h2>
            <p className="body-base mt-4">
              點進任何一個模組可以看到它實際能做什麼，還有操作起來長什麼樣。
            </p>
          </div>
          <div className="mt-14">
            <ModuleGroups />
          </div>
        </div>
      </section>

      {/* ─────────── 什麼情況需要客製 ─────────── */}
      <section className="section">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">When to customize</span>
            <h2 className="heading-2 mt-3 text-balance">什麼情況才需要客製</h2>
            <p className="body-base mt-4">
              我們不會因為你問了就報一套客製。能用現成的就用現成的，對你比較省，對我們也比較好維護。
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_CASES.map((c) => (
              <article key={c.title} className="card-hover p-7">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 客製流程 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="heading-3 mt-3 text-balance">客製是怎麼進行的</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CUSTOM_PROCESS.map((p) => (
              <article key={p.step} className="rounded-2xl border border-ink-100 bg-mist-200 p-7">
                <div className="font-mono text-sm font-bold text-brand-600">{p.step}</div>
                <h3 className="mt-3 text-base font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices current="/services/custom-modules" />

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <CtaBlock
            title="先講你的流程，再談要不要客製"
            description="把現在的做法講一遍，我們判斷用現成模組能解決多少、真正缺的是哪一塊。"
            secondary={{ label: '查看費用方案', href: '/pricing' }}
          />
        </div>
      </section>
    </>
  );
}
