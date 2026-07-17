import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, Phone, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: '預約 LINE CRM 導入諮詢',
  description:
    '告訴我們你的產業、分店數量、目前使用的工具，以及最想改善的問題，我們會協助你整理適合的導入方向。高雄在地團隊，台灣全境支援。'
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="預約諮詢"
        title="說說你目前的 LINE 經營問題"
        subtitle="第一次聯繫不需要準備完整規格，也不需要先選方案。告訴我們你的產業、分店數量、目前使用的工具，以及最想改善的問題，我們會協助你整理適合的導入方向。"
      />

      <section className="section">
        <div className="container-ug grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="card p-8 md:p-10">
            <h2 className="heading-3">三種方式找到我們</h2>
            <p className="body-base mt-4">挑你最順手的：</p>

            <div className="mt-8 space-y-4">
              <a
                href={site.contact.lineUrl}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-5 hover:bg-brand-100 transition-colors"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="text-base font-bold text-ink-900">加入 LINE 詢問</div>
                  <div className="text-sm text-ink-600">加入 LINE 與顧問討論，回覆最快，也能直接看功能畫面。</div>
                </div>
                <span className="text-xs font-semibold text-brand-700">＞</span>
              </a>

              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 hover:border-brand-300 transition-colors"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist-300 text-ink-800">
                  <Mail className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="text-base font-bold text-ink-900">寄送需求說明</div>
                  <div className="text-sm text-ink-600 break-all">寄送需求至 {site.contact.email}</div>
                </div>
                <span className="text-xs font-semibold text-ink-500">＞</span>
              </a>

              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 hover:border-brand-300 transition-colors"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist-300 text-ink-800">
                  <Phone className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="text-base font-bold text-ink-900">電話聯繫</div>
                  <div className="text-sm text-ink-600">{site.contact.phone} · 預約 30 分鐘線上討論</div>
                </div>
                <span className="text-xs font-semibold text-ink-500">＞</span>
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-700">
                Office
              </div>
              <h3 className="mt-2 text-lg font-bold text-ink-900">宇果國際行銷</h3>
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
              <h3 className="text-lg font-bold text-ink-900">第一次討論會確認這些事情</h3>
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
