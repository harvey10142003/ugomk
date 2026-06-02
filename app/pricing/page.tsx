import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { plans, billingNote } from '@/lib/data/pricing';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: '訂閱方案',
  description: 'Ugomk LINE CRM SaaS 三檔方案：入門 Starter / 成長 Growth / 專業 Pro，從單店試水到多店連鎖都有對應規格。'
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="三個方案，跟著店家階段走"
        subtitle="先從入門起步，行銷自動化跟產業包都可以晚點再開。"
      />

      <section className="section">
        <div className="container-ug">
          <div className="grid gap-6 md:grid-cols-3">
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
                  {p.features.map((f) => (
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
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <p className="text-sm leading-relaxed text-ink-500">{billingNote}</p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                q: '可以中途升級 / 降級嗎？',
                a: '可以。資料保留、模組差額按比例計算，操作面板裡就能切。'
              },
              {
                q: '需要自己準備伺服器嗎？',
                a: '不用。資料庫、Webhook、LIFF、CDN 我們一條龍打包。客戶只需要拿到 LINE OA Channel。'
              },
              {
                q: '客製開發要怎麼算？',
                a: 'Pro 方案以工時計；多數需求可以對應到既有模組做設定即達成。'
              }
            ].map((it) => (
              <div key={it.q} className="card p-6">
                <h3 className="text-base font-bold text-ink-900">{it.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{it.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
