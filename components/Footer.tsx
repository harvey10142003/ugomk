import Link from 'next/link';
import Image from 'next/image';
import { site, navItems, externalSites } from '@/lib/data/site';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

/*
 * 全站頁尾（2026-09-28 改版，設計方向見 docs/design/site-direction.md）。
 * 底色 #062C38 取自 logo 最深處；次要文字 #B9D3DC（對底色 9.4:1）。
 * 連結清單、公司全名與統編、隱私權說明與改版前完全相同 —— 只換外觀。
 */
export function Footer() {
  return (
    <footer className="bg-[#062C38] text-[#B9D3DC]">
      {/* 頂端一條 logo 漸層線：全站「一條線」的收尾 */}
      <div aria-hidden className="h-[2px] bg-gradient-to-r from-[#8CC8DA] via-[#04566B] to-[#062C38]" />
      <div className="container-ug grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
        <div>
          <Link href="/" className="mb-6 inline-block" aria-label={`${site.name} 首頁`}>
            {/* 深底用反白版；深青 logo 在深色底上對比不足 */}
            <Image
              src="/ugo-logo-white.png"
              alt={`${site.shortName} ${site.name}`}
              width={1569}
              height={528}
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-md text-sm leading-[1.9] text-[#B9D3DC]">{site.footerAbout}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {/* 全站唯一的綠 — 這顆按鈕的動作本身就是「去 LINE」 */}
            <a
              href={site.contact.lineUrl}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-line-700 px-5 text-sm font-bold text-white transition-colors hover:bg-line-800"
            >
              <MessageCircle className="h-4 w-4" />
              加入 LINE 諮詢
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#8CC8DA]/30 px-5 text-sm text-[#D9E8EE] transition-colors hover:border-[#8CC8DA] hover:text-white"
            >
              <Mail className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-[#B9D3DC]">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#8CC8DA]" />
            <span>{site.contact.address}</span>
          </div>
        </div>

        <div>
          <div className="mb-5 text-sm font-bold text-white">網站導覽</div>
          {/*
            子項一定要展開列出來：header 的下拉是 client 端 state，收合時
            子連結不在初始 HTML 裡，爬蟲看不到；footer 是 server component，
            這裡列出來才是 /services/* 三頁唯一進得了初始 HTML 的內部連結。
          */}
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[#D9E8EE] transition-colors hover:text-white">
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-2 space-y-2 border-l border-[#8CC8DA]/25 pl-3">
                    {item.children.map((c) => (
                      <li key={`${item.href}-${c.href}-${c.label}`}>
                        <Link
                          href={c.href}
                          className="text-[13px] text-[#B9D3DC] transition-colors hover:text-white"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-5 text-sm font-bold text-white">旗下站點</div>
          <ul className="space-y-4">
            {externalSites.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="block text-sm text-[#D9E8EE] transition-colors hover:text-white"
                >
                  <div className="font-bold">{s.label}</div>
                  <div className="text-[13px] text-[#B9D3DC]">{s.description}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#8CC8DA]/15">
        <div className="container-ug flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          {/*
            公司全名與統編跟版權列同級、同一欄堆疊 —— 台灣 B2B 採購會查統編確認
            對方是登記公司而不是個人接案，沒有這一行等於少了一份信任背書。
          */}
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs text-[#B9D3DC]">
              {site.legalName}｜統一編號 {site.taxId}
            </p>
            <p className="text-xs text-[#B9D3DC]">
              © {new Date().getFullYear()} {site.name} Yu Guo International Marketing. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* 表單有蒐集個資，隱私權說明必須全站可達 —— footer 是唯一每頁都在的位置 */}
            <Link href="/privacy" className="text-xs text-[#B9D3DC] transition-colors hover:text-white">
              隱私權說明
            </Link>
            <span className="text-xs text-[#B9D3DC]">{site.product}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
