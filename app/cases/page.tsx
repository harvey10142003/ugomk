import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { cases } from '@/lib/data/cases';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: '客戶案例',
  description: '宇果 CRM 在社群課程（小聚所）、美業多分店（菲韻美甲）、餐酒館（御十三）等不同產業的落地案例。'
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="不同產業都跑得起來"
        subtitle="同一套 CRM 框架配上對應產業包，落地就上線。下面是三個正式營運中的客戶。"
      />

      <section className="section">
        <div className="container-ug space-y-8">
          {cases.map((c, idx) => (
            <article
              key={c.id}
              className="card p-8 md:p-12 grid gap-10 md:grid-cols-[1fr_2fr] items-start"
            >
              <div>
                <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-600">
                  Case 0{idx + 1}
                </div>
                <h2 className="mt-3 heading-3">{c.name}</h2>
                <div className="mt-2 text-sm text-ink-500">{c.industry}</div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {c.modules.map((mod) => (
                    <span key={mod} className="chip-brand">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="body-base">{c.summary}</p>
                <div className="mt-6 card-glow p-5 bg-brand-50 border-brand-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-600 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold tracking-widest-2 uppercase text-brand-700">
                        Outcome
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-800">{c.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="card-glow p-10 md:p-14 text-center bg-gradient-brand-soft">
            <h2 className="heading-3">你的案例可能是下一個</h2>
            <p className="body-base mt-4 max-w-xl mx-auto">
              不論是 0→1 上線 LINE@、或是把現有後台搬過來，我們可以先聊聊怎麼導入。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                預約導入諮詢
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/features" className="btn-outline">
                看模組能力
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
