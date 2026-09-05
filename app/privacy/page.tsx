import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  path: '/privacy',
  title: '隱私權說明',
  description:
    '宇果國際行銷在官網表單蒐集哪些個人資料、用在什麼地方、保存多久，以及你可以怎麼查閱、更正或要求刪除。'
});

/** 一個段落一件事，標題就是使用者真正想問的問題 */
const sections: { q: string; a: React.ReactNode }[] = [
  {
    q: '我們會蒐集什麼',
    a: (
      <>
        <p>只有你主動填在官網表單裡的東西：</p>
        <ul className="mt-4 space-y-2">
          <li>· 稱呼</li>
          <li>· 聯絡方式（電話或 Email，擇一）</li>
          <li>· 產業與分店數量（選填）</li>
          <li>· 你描述的問題（選填）</li>
        </ul>
        <p className="mt-4">
          另外會一併記下你送出表單時所在的頁面、前一頁的來源，以及網址上的活動追蹤參數。
          這些是用來判斷「哪些內容真的幫到人」，不含任何可以辨識你身分的資訊。
        </p>
      </>
    )
  },
  {
    q: '會用在哪裡',
    a: (
      <>
        <p>
          回覆你這次的詢問，以及後續服務聯繫。如果我們之後合作，這筆資料會併入你的客戶紀錄。
        </p>
        <p className="mt-4">
          我們<strong className="font-semibold text-ink-900">不會</strong>把你的聯絡方式賣給、
          交換給或提供給其他公司，也不會拿去投放廣告名單。
        </p>
      </>
    )
  },
  {
    q: '存在哪裡、存多久',
    a: (
      <>
        <p>
          存在我們自己的會員系統資料庫裡，只有宇果內部負責聯繫的人員能看到。
        </p>
        <p className="mt-4">
          保存到你要求刪除為止；若最後一次聯繫後滿三年仍未有進一步往來，我們會主動刪除。
        </p>
      </>
    )
  },
  {
    q: '你可以要求什麼',
    a: (
      <>
        <p>依個人資料保護法，你隨時可以要求我們：</p>
        <ul className="mt-4 space-y-2">
          <li>· 告訴你我們手上有你哪些資料</li>
          <li>· 提供一份複本給你</li>
          <li>· 更正錯誤的內容</li>
          <li>· 停止使用，或直接刪除</li>
        </ul>
        <p className="mt-4">
          用下面任何一個方式告訴我們就可以，不需要填制式申請書。我們會在收到後七個工作天內處理完並回覆你。
        </p>
      </>
    )
  },
  {
    q: '不填會怎樣',
    a: (
      <p>
        填表單是自願的。不填不影響你瀏覽網站的任何內容，你也可以直接用 LINE、Email
        或電話找我們，一樣會有人回覆。
      </p>
    )
  },
  {
    q: '網站上的第三方服務',
    a: (
      <p>
        本站使用 Google 的網站分析服務，記錄的是不具名的瀏覽行為（看了哪幾頁、從哪裡進來），
        用來改善網站內容。它不會拿到你在表單裡填的姓名或聯絡方式。你可以在瀏覽器中封鎖這類追蹤，
        不影響網站正常使用。
      </p>
    )
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="隱私權說明"
        subtitle="這一頁講清楚我們在官網表單蒐集什麼、用在哪裡、存多久，以及你可以要求我們做什麼。沒有法律八股，看得懂比較重要。"
      />

      <section className="section">
        <div className="container-ug grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.q} className="card p-7 md:p-8">
                <h2 className="heading-3">{s.q}</h2>
                <div className="body-base mt-4 space-y-1">{s.a}</div>
              </div>
            ))}
            <p className="body-sm">
              本說明如有調整，會直接更新在這一頁。最後更新：2026-09-06。
            </p>
          </div>

          <aside className="space-y-6">
            <div className="card-glow p-7 bg-gradient-brand-soft">
              <h2 className="text-lg font-bold text-ink-900">個資聯絡窗口</h2>
              {/* 個資法的告知義務要求蒐集者身分明確 —— 用登記全名與統編，不用簡稱 */}
              <p className="mt-3 text-sm text-ink-700">
                資料蒐集者：{site.legalName}（統一編號 {site.taxId}）
              </p>
              <p className="mt-2 text-sm text-ink-700">
                統一由以下窗口受理，不另設專線。
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-3 text-sm font-medium text-ink-800 hover:text-brand-800 transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-700 shrink-0" />
                  <span className="break-all">{site.contact.email}</span>
                </a>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-3 text-sm font-medium text-ink-800 hover:text-brand-800 transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-700 shrink-0" />
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 text-sm font-medium text-ink-800 hover:text-brand-800 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-brand-700 shrink-0" />
                  LINE {site.contact.lineId}
                </a>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink-600">
                {site.contact.address}
              </p>
            </div>

            <div className="card p-7">
              <h2 className="text-lg font-bold text-ink-900">想先聊聊再留資料？</h2>
              <p className="mt-3 text-sm text-ink-600">
                可以。加 LINE 直接問，什麼都不用填。
              </p>
              <Link href="/contact" className="btn-outline mt-5 w-full">
                看聯絡方式
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
