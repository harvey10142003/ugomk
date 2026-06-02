import Link from 'next/link';
import { site, navItems, externalSites } from '@/lib/data/site';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="container-ug grid gap-12 py-16 md:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white font-extrabold text-xl shadow-brand">
              U
            </span>
            <div>
              <div className="text-lg font-extrabold text-white">{site.shortName}</div>
              <div className="text-xs tracking-widest-2 uppercase text-ink-300">{site.name}</div>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-ink-300 max-w-md">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.contact.lineUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              加 LINE@ 諮詢
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-400 hover:text-brand-300 transition-colors"
            >
              <Mail className="h-4 w-4" />
              {site.contact.email}
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-widest-2 uppercase text-brand-400 font-semibold mb-5">
            網站導覽
          </div>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-300 hover:text-brand-300 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-widest-2 uppercase text-brand-400 font-semibold mb-5">
            旗下站點
          </div>
          <ul className="space-y-3">
            {externalSites.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="block text-sm text-ink-300 hover:text-brand-300 transition-colors"
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-xs text-ink-400">{s.description}</div>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-start gap-2 text-xs text-ink-400">
            <MapPin className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
            <span>{site.contact.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-ug flex flex-col md:flex-row items-center justify-between py-6 gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {site.name} Yu Guo International Marketing. All rights reserved.
          </p>
          <p className="text-[10px] tracking-widest-2 uppercase text-ink-500">
            LINE × AI · Crafted in Kaohsiung
          </p>
        </div>
      </div>
    </footer>
  );
}
