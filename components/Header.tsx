'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navItems, site } from '@/lib/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(3,61,77,0.08)]'
          : 'bg-white/70 backdrop-blur-sm'
      )}
    >
      <div className="container-ug flex h-18 md:h-20 items-center justify-between gap-5">
        <Link href="/" className="shrink-0" aria-label={`${site.name} 首頁`}>
          <Image
            src="/ugo-logo.png"
            alt={`${site.shortName} ${site.name}`}
            width={1569}
            height={528}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative text-sm font-semibold transition-colors whitespace-nowrap',
                  active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-600 transition-all duration-300',
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href={site.cta.primary.href} className="btn-brand">
            {site.cta.primary.label}
          </Link>
        </div>

        <button
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
          className="lg:hidden p-2 text-ink-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <nav className="container-ug flex flex-col py-6 gap-1">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'py-3 text-base font-semibold border-l-2 pl-4 transition-colors',
                    active
                      ? 'border-brand-600 text-ink-900'
                      : 'border-transparent text-ink-500 hover:border-brand-300 hover:text-ink-900'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href={site.cta.primary.href} className="btn-brand mt-4 w-full">
              {site.cta.primary.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
