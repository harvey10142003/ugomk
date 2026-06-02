import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, Phone, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/data/site';

export const metadata: Metadata = {
  title: '聯絡我們 / 預約 Demo',
  description: '預約 30 分鐘 Ugomk LINE CRM SaaS Demo，或直接加 LINE@ 諮詢。高雄在地團隊，台灣全境支援。'
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="先聊聊你卡在哪"
        subtitle="預約 30 分鐘 Demo、或直接加 LINE@ 問都行 — 不用先決定要不要買。"
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
                  <div className="text-base font-bold text-ink-900">加 LINE@ 即時問</div>
                  <div className="text-sm text-ink-600">最快回覆。看得到 demo 影片跟功能截圖。</div>
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
                  <div className="text-base font-bold text-ink-900">Email 詳述需求</div>
                  <div className="text-sm text-ink-600 break-all">{site.contact.email}</div>
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
                  <div className="text-base font-bold text-ink-900">電話聊</div>
                  <div className="text-sm text-ink-600">{site.contact.phone}</div>
                </div>
                <span className="text-xs font-semibold text-ink-500">＞</span>
              </a>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-600">
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
              <h3 className="text-lg font-bold text-ink-900">Demo 聊什麼？</h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-800">
                <li>· 你現在 LINE@ 經營的痛點</li>
                <li>· 是否需要多分店 / POS / 產業包</li>
                <li>· 預算與導入時程</li>
                <li>· 既有資料怎麼搬過來</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
