import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/data/site';
import { organizationLd } from '@/lib/jsonld';
import { positioning, approach, founder, milestones, sites } from '@/lib/data/about';

export const metadata: Metadata = {
  title: '關於宇果｜把 LINE 當成營運系統在做的團隊',
  description:
    '宇果國際行銷來自高雄，替餐飲、美業、零售與課程品牌把 LINE 官方帳號接上會員、消費與推薦裂變，讓每一次互動都留下可以再利用的資料。',
  alternates: { canonical: '/about' }
};

/** 素材未到位時的明確佔位 — 比放假圖假數字誠實 */
function Pending({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-300/60 bg-white/[0.06] p-6 text-center ${className ?? ''}`}
    >
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="mt-1.5 text-[0.72rem] font-normal text-brand-300">待提供</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationLd} />

      {/* ─────────── Hero ─────────── */}
      <section className="hero-bg relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 dot-grid-fade pointer-events-none" />
        <div className="container-ug relative max-w-4xl">
          <span className="chip-brand">關於宇果</span>
          <h1 className="heading-1 mt-6 text-balance">
            我們把 LINE 當成<span className="text-gradient-brand">營運系統</span>在做，
            <br className="hidden md:block" />
            不是當成廣告管道
          </h1>
          <p className="body-lg mt-7 max-w-3xl">
            宇果國際行銷來自高雄，替餐飲、美業、零售與課程品牌，把 LINE
            官方帳號接上會員、消費與推薦裂變，讓每一次互動都留下可以再利用的資料。
          </p>
        </div>
      </section>

      {/* ─────────── 定位 ─────────── */}
      <section className="section">
        <div className="container-ug grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="eyebrow">{positioning.eyebrow}</span>
            <h2 className="heading-2 mt-3 text-balance">{positioning.title}</h2>
            {positioning.paragraphs.map((p) => (
              <p key={p} className="body-base mt-5">
                {p}
              </p>
            ))}
          </div>
          <div className="card p-8">
            {approach.map((a, i) => (
              <div
                key={a.title}
                className={`flex gap-4 ${i === 0 ? 'pb-5' : i === approach.length - 1 ? 'pt-5' : 'py-5'} ${
                  i < approach.length - 1 ? 'border-b border-ink-100' : ''
                }`}
              >
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-base font-extrabold text-brand-800">
                  {a.mark}
                </span>
                <div>
                  <div className="font-bold text-ink-900">{a.title}</div>
                  <p className="mt-1 text-sm text-ink-400">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 創辦人 ─────────── */}
      <section className="section section-dark">
        <div className="container-ug relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {founder.photo ? (
            <Image
              src={founder.photo}
              alt={founder.name}
              width={800}
              height={1000}
              className="w-full rounded-2xl object-cover"
            />
          ) : (
            <Pending label={founder.photoPending} className="min-h-[420px]" />
          )}
          <div>
            <span className="eyebrow-on-dark">Founder</span>
            <h2 className="heading-2 mt-3 text-white">{founder.name}</h2>
            <div className="mt-4">
              <span className="chip-dark">{founder.role}</span>
            </div>
            {founder.bio ? (
              <p className="mt-7 text-base leading-relaxed text-brand-200">{founder.bio}</p>
            ) : (
              <Pending label={founder.bioPending} className="mt-7 min-h-[130px]" />
            )}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {founder.tags.map((t) => (
                <span key={t} className="chip-dark">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 里程碑 ─────────── */}
      <section className="section">
        <div className="container-ug grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
          {/* 左欄內容短，跟著捲動貼住頂端，避免右側時間軸拉長後左邊出現大片空白 */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Milestones</span>
            <h2 className="heading-2 mt-3 text-balance">一路走過來</h2>
            <p className="body-base mt-5">年份與事件以實際紀錄為準，尚未確認的先留空。</p>
          </div>
          <ol className="relative pl-8">
            <span
              className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 rounded-full bg-gradient-to-b from-brand-300 to-brand-100"
              aria-hidden
            />
            {milestones.map((m) => (
              <li key={m.title} className="relative pb-9 last:pb-0">
                <span
                  className="absolute -left-8 top-1 h-4 w-4 rounded-full border-[3px] border-brand-500 bg-white"
                  aria-hidden
                />
                <div className="font-mono text-sm font-bold tracking-wide text-brand-600">{m.year}</div>
                <div className="mt-1 text-lg font-bold text-ink-900">{m.title}</div>
                {m.description ? <p className="mt-1 text-sm text-ink-400">{m.description}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────── 旗下站點 ─────────── */}
      <section className="section-tight border-y border-ink-100 bg-white">
        <div className="container-ug">
          <span className="eyebrow">Our sites</span>
          <h2 className="heading-3 mt-3">旗下站點</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {sites.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="card-hover group p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-ink-900">{s.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand-600" />
                </div>
                <p className="mt-1 text-sm text-ink-400">{s.description}</p>
                <p className="mt-4 font-mono text-xs text-ink-400">{s.url}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="section-tight">
        <div className="container-ug">
          <div className="card-glow bg-gradient-to-br from-brand-50 to-mint-100/40 p-10 text-center md:p-14">
            <h2 className="heading-3 text-balance">想知道你的營運流程能怎麼接？</h2>
            <p className="body-base mx-auto mt-4 max-w-xl">
              先聊聊現在的流程卡在哪裡，我們再判斷要開哪些模組。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/solutions" className="btn-outline">
                查看解決方案
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
