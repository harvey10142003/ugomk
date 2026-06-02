import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { moduleGroups } from '@/lib/data/modules';
import { site } from '@/lib/data/site';
import { productLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: '產品模組',
  description:
    'Ugomk LINE CRM SaaS 完整模組清單：多分店、會員、POS、行銷自動化、產業包（美業 / 餐酒館 / 補習班 / 宮廟）等 9 大模組群組。'
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={productLd} />
      <PageHero
        eyebrow="Product Modules"
        title={'9 大模組群組，照生意搭'}
        subtitle="每個模組都附 admin 後台、LIFF 端、POS 整合；只開你需要的，未來想加再開。"
      />

      <section className="section">
        <div className="container-ug">
          {/* Module grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {moduleGroups.map((m) => (
              <article key={m.id} className="card-hover p-7 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mist-200 text-ink-800">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] tracking-widest-2 uppercase font-semibold text-ink-400">
                    {m.caption}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 flex-1">
                  {m.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-ink-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-500 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 card-glow p-10 md:p-14 text-center bg-gradient-to-br from-brand-50 to-mint-100/40">
            <span className="eyebrow justify-center">
              <Sparkles className="h-3 w-3 inline mr-1" />
              Custom Build
            </span>
            <h2 className="heading-3 mt-4 text-balance">
              不在清單裡的功能？
            </h2>
            <p className="body-base mt-4 max-w-xl mx-auto">
              產業專用、客製欄位、串第三方 API — Pro 方案皆可議價開發。先聊聊你的需求。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                預約客製諮詢
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-outline">
                看方案
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
