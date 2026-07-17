'use client';

import Link from 'next/link';
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
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(11,15,25,0.06)]'
          : 'bg-white/70 backdrop-blur-sm'
      )}
    >
      <div className="container-ug flex h-18 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white font-extrabold shadow-brand">
            U
          </span>
          <div className="leading-none">
            <div className="text-base font-extrabold text-ink-900 tracking-tight">{site.shortName}</div>
            <div className="text-[10px] font-medium tracking-widest-2 uppercase text-ink-400">
              {site.name}
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative text-sm font-semibold transition-colors',
                  active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-500 transition-all duration-300',
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href={site.cta.secondary.href} className="btn-ghost">
            {site.cta.secondary.label}
          </Link>
          <Link href={site.cta.primary.href} className="btn-brand">
            {site.cta.primary.label}
          </Link>
        </div>

        <button
          aria-label={open ? '關閉選單' : '開啟選單'}
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
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'py-3 text-base font-semibold border-l-2 pl-4 transition-colors',
                    active
                      ? 'border-brand-500 text-ink-900'
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
