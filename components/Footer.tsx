import Link from 'next/link';
import Image from 'next/image';
import { site, navItems, externalSites } from '@/lib/data/site';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-200">
      <div className="container-ug grid gap-12 py-16 md:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block mb-6" aria-label={`${site.name} 首頁`}>
            {/* 深底用反白版；深青 logo 在 brand-950 上對比不足 */}
            <Image
              src="/ugo-logo-white.png"
              alt={`${site.shortName} ${site.name}`}
              width={1569}
              height={528}
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed text-brand-200 max-w-md">{site.footerAbout}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {/* 全站唯一的綠 — 這顆按鈕的動作本身就是「去 LINE」 */}
            <a
              href={site.contact.lineUrl}
              className="inline-flex items-center gap-2 rounded-full bg-line-700 px-4 py-2 text-sm font-semibold text-white hover:bg-line-800 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              加入 LINE 諮詢
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-700 px-4 py-2 text-sm font-medium text-brand-100 hover:border-brand-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-widest-2 uppercase text-brand-300 font-semibold mb-5">
            網站導覽
          </div>
          {/*
            子項一定要展開列出來：header 的下拉是 client 端 state，收合時
            子連結不在初始 HTML 裡，爬蟲看不到；footer 是 server component，
            這裡列出來才是 /services/* 三頁唯一進得了初始 HTML 的內部連結。
          */}
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-brand-200 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-2 space-y-2 border-l border-brand-800 pl-3">
                    {item.children.map((c) => (
                      <li key={`${item.href}-${c.href}-${c.label}`}>
                        <Link
                          href={c.href}
                          className="text-xs text-brand-300 hover:text-white transition-colors"
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
          <div className="text-xs tracking-widest-2 uppercase text-brand-300 font-semibold mb-5">
            旗下站點
          </div>
          <ul className="space-y-3">
            {externalSites.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="block text-sm text-brand-200 hover:text-white transition-colors"
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-xs text-brand-300">{s.description}</div>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-start gap-2 text-xs text-brand-300">
            <MapPin className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
            <span>{site.contact.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-ug flex flex-col md:flex-row items-center justify-between py-6 gap-3">
          <p className="text-xs text-brand-300">
            © {new Date().getFullYear()} {site.name} Yu Guo International Marketing. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* 表單有蒐集個資，隱私權說明必須全站可達 —— footer 是唯一每頁都在的位置 */}
            <Link
              href="/privacy"
              className="text-xs text-brand-300 hover:text-white transition-colors"
            >
              隱私權說明
            </Link>
            <span className="text-[10px] tracking-widest-2 uppercase text-brand-300">
              {site.product}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
