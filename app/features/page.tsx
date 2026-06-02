import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { moduleGroups } from '@/lib/data/modules';
import { site } from '@/lib/data/site';
import { productLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: '產品模組',
  description: 'Ugomk LINE CRM SaaS 完整模組清單：多分店、會員、POS、行銷自動化、產業包（美業 / 餐酒館 / 補習班 / 宮廟）等 9 大模組群組。'
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={productLd} />
      <PageHero
        eyebrow="Product Modules"
        title="9 大模組群組，照生意搭"
        subtitle="每個模組都附 admin 後台、LIFF 端、POS 整合；只開你需要的，未來想加再開。"
      />

      <section className="section">
        <div className="container-ug">
          <div className="grid gap-6 md:grid-cols-2">
            {moduleGroups.map((m) => (
              <article key={m.id} className="card-hover p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] tracking-widest-2 uppercase font-semibold text-ink-400">
                    {m.caption}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink-900">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{m.description}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-16 card p-10 md:p-14 text-center">
            <h2 className="heading-3">不在清單裡的功能？</h2>
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
