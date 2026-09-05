import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, Phone, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  path: '/contact',
  title: '預約 LINE CRM 導入諮詢',
  description:
    '留下產業、分店數量與最想解決的問題，我們會在一個工作天內聯繫，協助你整理適合的導入方向。也可以直接用 LINE、Email 或電話找我們。高雄在地團隊，台灣全境支援。'
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="預約諮詢"
        title="說說你目前的 LINE 經營問題"
        subtitle="第一次聯繫不需要準備完整規格，也不需要先選方案。留下聯絡方式與你最想解決的問題，我們會協助你整理適合的導入方向。"
      />

      <section className="section">
        <div className="container-ug grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* 主體＝表單。三個聯絡管道移到側欄當備援，不再與表單搶主位。 */}
          <LeadForm />

          <aside className="space-y-6">
            <div className="card p-7">
              {/* 與 /solutions、/services/* 的區塊標題同階 */}
              <h2 className="text-lg font-bold text-ink-900">不想填表單也可以</h2>
              <p className="mt-2 text-sm text-ink-600">挑你最順手的方式，一樣有人回覆：</p>

              <div className="mt-6 space-y-3">
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-4 hover:bg-brand-100 transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-900">加入 LINE 詢問</div>
                    <div className="text-xs text-ink-600">
                      {site.contact.lineId} · 回覆最快，也能直接看功能畫面。
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 hover:border-brand-300 transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mist-300 text-ink-800 shrink-0">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-900">寄送需求說明</div>
                    <div className="text-xs text-ink-600 break-all">{site.contact.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 hover:border-brand-300 transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mist-300 text-ink-800 shrink-0">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-900">電話聯繫</div>
                    <div className="text-xs text-ink-600">
                      {site.contact.phoneDisplay} · 預約 30 分鐘線上討論
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="card p-7">
              <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-700">
                Office
              </div>
              <h2 className="mt-2 text-lg font-bold text-ink-900">宇果國際行銷</h2>
              <ul className="mt-5 space-y-3 text-sm text-ink-600">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                  {site.contact.address}
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                  週一 – 週五 10:00 – 18:00
                </li>
              </ul>
            </div>

            <div className="card-glow p-7 bg-gradient-brand-soft">
              <h2 className="text-lg font-bold text-ink-900">第一次討論會確認這些事情</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink-800">
                <li>· 目前 LINE 官方帳號的使用方式</li>
                <li>· 會員、預約、點數或門市流程的問題</li>
                <li>· 需要整合的既有系統</li>
                <li>· 適合的功能與導入順序</li>
                <li>· 預算範圍與預計上線時間</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
