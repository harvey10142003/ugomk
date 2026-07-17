import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { cases } from '@/lib/data/cases';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'LINE CRM 客戶案例｜餐飲、美業、課程與會員經營',
  description:
    '看看不同企業如何把 LINE 用進實際營運：小聚所（課程與體驗活動）、菲韻美甲（美業與多分店管理）、御十三餐酒館（帶客與業績管理）。'
};

const quotes: Record<string, { text: string; author: string; role: string }> = {
  gso: {
    text: '一開始只是想把報名表單放進 LINE 裡，後來連簽到、提醒、回訪都自動跑了。線下社群最怕「人來了沒留下資料」，這個系統幫我把每個來過的人都記下來。',
    author: '小聚所 主理人',
    role: '課程與體驗活動'
  },
  finnail: {
    text: '從美甲預約、POS 結帳、會員儲值金、推播提醒到分店分權，全部一套系統搞定。換系統不用換人換流程，最關鍵的是隔夜營運的業務日切換時間 — 別家做不到。',
    author: '陳店長',
    role: '菲韻美甲 · 多分店'
  },
  yu13: {
    text: '帶客業績以前都用 Excel 算，常常算錯。現在客人加好友的時候掃專屬 QR Code，績效自動算到對的人頭上，結帳時抽成直接算出來，同事自己就會盯著看板確認。',
    author: '御十三 經理',
    role: '餐酒館 · 帶客與業績管理'
  }
};

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="成功案例"
        title="看看不同企業，如何把 LINE 用進實際營運"
        subtitle="每個產業遇到的問題不同。我們從原本的工作流程出發，整合適合的會員、預約、活動、POS 與自動化功能，讓系統配合企業，而不是要求企業全部重新適應。"
      />

      <section className="section">
        <div className="container-ug space-y-10 max-w-5xl">
          {cases.map((c, idx) => {
            const q = quotes[c.id];
            return (
              <article
                key={c.id}
                className="card p-8 md:p-12"
              >
                <div className="grid gap-10 md:grid-cols-[1fr_2fr] items-start">
                  <div>
                    <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-700">
                      Case 0{idx + 1}
                    </div>
                    <h2 className="mt-3 heading-3">{c.name}</h2>
                    <div className="mt-2 text-sm text-ink-500">{c.industry}</div>
                    <div className="mt-6">
                      <div className="text-[11px] font-semibold tracking-widest-2 uppercase text-ink-500">
                        導入的功能
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.modules.map((mod) => (
                          <span key={mod} className="chip-brand">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest-2 uppercase text-ink-500">
                        客戶原本的問題
                      </div>
                      <p className="mt-2 body-base">{c.problem}</p>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold tracking-widest-2 uppercase text-ink-500">
                        實際使用流程
                      </div>
                      <p className="mt-2 body-base">{c.flow}</p>
                    </div>

                    <div className="card-glow p-5 bg-brand-50 border-brand-200">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-brand-700 mt-1 shrink-0" />
                        <div>
                          <div className="text-[11px] font-semibold tracking-widest-2 uppercase text-brand-800">
                            導入後的改變
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink-800">{c.outcome}</p>
                        </div>
                      </div>
                    </div>

                    {q ? (
                      <figure className="border-l-2 border-brand-500 pl-5">
                        <div className="text-[11px] font-semibold tracking-widest-2 uppercase text-ink-500">
                          客戶真實回饋
                        </div>
                        <Quote className="h-5 w-5 text-brand-500 mt-3" />
                        <blockquote className="mt-3 text-base leading-relaxed text-ink-800 italic">
                          “{q.text}”
                        </blockquote>
                        <figcaption className="mt-4 flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white font-bold text-sm">
                            {q.author[0]}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-ink-900">{q.author}</div>
                            <div className="text-xs text-ink-500">{q.role}</div>
                          </div>
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}

          <div className="card-glow p-10 md:p-16 text-center bg-gradient-to-br from-brand-50 to-mint-100/40">
            <h2 className="heading-3">你的產業沒有現成範本，也可以先談</h2>
            <p className="body-base mt-4 max-w-xl mx-auto">
              我們可以先了解目前的工作流程，再判斷適合使用既有模組、調整設定，或進行客製整合。
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={site.cta.primary.href} className="btn-brand">
                {site.cta.primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/features" className="btn-outline">
                {site.cta.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
