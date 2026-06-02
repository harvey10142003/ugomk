import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, Minus } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { plans, billingNote } from '@/lib/data/pricing';

export const metadata: Metadata = {
  title: '訂閱方案',
  description:
    'Ugomk LINE CRM SaaS 三檔方案：入門 Starter / 成長 Growth / 專業 Pro，從單店試水到多店連鎖都有對應規格。'
};

type Row = {
  feature: string;
  starter: boolean | string;
  growth: boolean | string;
  pro: boolean | string;
};

const comparisonRows: Array<{ section: string; rows: Row[] }> = [
  {
    section: '基礎',
    rows: [
      { feature: '分店數量', starter: '1 店', growth: '最多 3 店', pro: '無限' },
      { feature: '會員 / 等級 / 標籤', starter: true, growth: true, pro: true },
      { feature: '點數系統', starter: true, growth: true, pro: true },
      { feature: '線上說明手冊', starter: true, growth: true, pro: true }
    ]
  },
  {
    section: '行銷自動化',
    rows: [
      { feature: '群發推播', starter: true, growth: true, pro: true },
      { feature: '行銷任務引擎（自動觸發）', starter: false, growth: true, pro: true },
      { feature: '動態圖文選單', starter: false, growth: true, pro: true },
      { feature: 'MGM 推薦碼 / 分享連結', starter: false, growth: true, pro: true },
      { feature: '抽獎範本 × 4', starter: false, growth: true, pro: true },
      { feature: '問卷表單 + 標籤自動綁', starter: false, growth: true, pro: true }
    ]
  },
  {
    section: 'POS 與產業包',
    rows: [
      { feature: 'POS 零售 / 餐飲 / 美業', starter: false, growth: false, pro: true },
      { feature: '預約 / 派案模組', starter: false, growth: false, pro: true },
      { feature: '補習班 / 宮廟模組', starter: false, growth: false, pro: true },
      { feature: '儲值金（會員確認制扣款）', starter: false, growth: false, pro: true },
      { feature: '點數商城', starter: false, growth: true, pro: true }
    ]
  },
  {
    section: '支援',
    rows: [
      { feature: '客製模組開發', starter: false, growth: false, pro: '議價' },
      { feature: '優先支援與 SLA', starter: false, growth: false, pro: true },
      { feature: 'LINE OA Webhook 串接', starter: true, growth: true, pro: true },
      { feature: '基礎 onboarding', starter: true, growth: true, pro: true }
    ]
  }
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="h-5 w-5 text-brand-500" />;
  if (value === false) return <Minus className="h-4 w-4 text-ink-300" />;
  return <span className="text-xs font-semibold text-ink-800">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="三個方案，跟著店家階段走"
        subtitle="先從入門起步，行銷自動化跟產業包都可以晚點再開。"
      />

      <section className="section-tight">
        <div className="container-ug">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <article
                key={p.id}
                className={p.highlight ? 'card-glow p-8 relative' : 'card-hover p-8 relative'}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-white">
                    <Sparkles className="h-3 w-3 text-brand-400" />
                    最受歡迎
                  </span>
                ) : null}
                <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-ink-400">
                  {p.caption}
                </div>
                <h3 className="mt-2 text-xl font-bold text-ink-900">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-ink-900 tracking-tight">
                    {p.price}
                  </span>
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
        </div>
      </section>

      {/* Comparison table */}
      <section className="section bg-mist-100 border-y border-ink-100">
        <div className="container-ug max-w-5xl">
          <div className="text-center mb-12">
            <span className="eyebrow">Compare</span>
            <h2 className="heading-3 mt-3">完整方案比較</h2>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-ink-100">
                    <th className="text-left p-5 text-xs font-semibold tracking-widest-2 uppercase text-ink-500 w-1/2">
                      功能
                    </th>
                    <th className="p-5 text-sm font-bold text-ink-900 w-1/6">Starter</th>
                    <th className="p-5 text-sm font-bold text-ink-900 w-1/6 bg-brand-50/50">
                      Growth
                    </th>
                    <th className="p-5 text-sm font-bold text-ink-900 w-1/6">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((sec) => (
                    <Fragment key={sec.section}>
                      <tr className="bg-mist-100">
                        <td
                          colSpan={4}
                          className="px-5 py-3 text-[11px] tracking-widest-2 uppercase font-semibold text-ink-500"
                        >
                          {sec.section}
                        </td>
                      </tr>
                      {sec.rows.map((r) => (
                        <tr
                          key={`${sec.section}-${r.feature}`}
                          className="border-t border-ink-100"
                        >
                          <td className="p-4 text-sm text-ink-700">{r.feature}</td>
                          <td className="p-4 text-center">
                            <div className="inline-flex">
                              <Cell value={r.starter} />
                            </div>
                          </td>
                          <td className="p-4 text-center bg-brand-50/30">
                            <div className="inline-flex">
                              <Cell value={r.growth} />
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="inline-flex">
                              <Cell value={r.pro} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-ug max-w-3xl">
          <div className="text-center mb-12">
            <span className="eyebrow">FAQ</span>
            <h2 className="heading-3 mt-3">常見問題</h2>
          </div>
          <div className="space-y-3">
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
              },
              {
                q: '資料安全與備份？',
                a: '每日自動 DB 備份保留 14 天；Cloudflare R2 圖片儲存；4 角色 scope 防止跨權限存取。'
              }
            ].map((it) => (
              <details
                key={it.q}
                className="card-hover p-6 group"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-base font-bold text-ink-900">{it.q}</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink-200 text-ink-500 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
