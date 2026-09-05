'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems, site } from '@/lib/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** 桌機展開中的下拉選單 label；手機則用來記錄展開的子選單 */
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 換頁時把選單收乾淨
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  /**
   * 滑出時延遲關閉 —— 游標從觸發按鈕移到面板的途中會經過空隙，
   * 立即關閉會讓選單「碰不到」。
   */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open || menu
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(3,61,77,0.08)]'
          : 'bg-white/70 backdrop-blur-sm'
      )}
    >
      {/*
        h-18 不在 Tailwind 的間距刻度裡（沒有 18），這個 class 一直是靜默失效的，
        手機版的高度其實是被內容撐出來的。CTA 進來之後內容高 44px，
        沒有 h-16 兜底的話 logo 上下各只剩 4px。
      */}
      <div className="container-ug flex h-16 md:h-20 items-center justify-between gap-5">
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
            const active = isActive(item.href);

            if (!item.children) {
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
            }

            const expanded = menu === item.label;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setMenu(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => setMenu(expanded ? null : item.label)}
                  className={cn(
                    'group relative inline-flex items-center gap-1 text-sm font-semibold transition-colors whitespace-nowrap',
                    active || expanded ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')}
                  />
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-600 transition-all duration-300',
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </button>

                {expanded ? (
                  <div
                    className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-4"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-card">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setMenu(null)}
                          className="group/item block rounded-xl px-4 py-3 transition-colors hover:bg-brand-50"
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-ink-900 group-hover/item:text-brand-800">
                            {c.label}
                            {c.pending ? (
                              <span className="rounded-full border border-ink-200 px-1.5 py-0.5 text-[9px] font-semibold text-ink-400">
                                洽詢
                              </span>
                            ) : null}
                          </div>
                          {c.desc ? (
                            <div className="mt-0.5 text-xs text-ink-400">{c.desc}</div>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/*
          這顆按鈕原本包在 hidden lg:flex 裡，小於 lg 整顆不渲染。
          site.ts 的註解說「預約諮詢不放進 nav，因為它已經是 header 右側的主要按鈕」——
          這個前提在手機上是假的，結果手機訪客的常駐入口從 1 個變成 0 個
          （而 LINE 點進來的訪客幾乎都是手機）。
          小螢幕縮 padding、換短文案；.btn 已有 whitespace-nowrap，不會破版。
        */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={site.cta.primary.href} className="btn-brand px-4 lg:px-6">
            <span className="lg:hidden">預約諮詢</span>
            <span className="hidden lg:inline">{site.cta.primary.label}</span>
          </Link>
        </div>

        <button
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
          className="lg:hidden -mr-2 p-2 text-ink-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 手機選單 —— 下拉在觸控裝置沒有 hover，改成可展開的子清單 */}
      {open && (
        <div className="lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-ink-100 bg-white">
          <nav className="container-ug flex flex-col py-6 gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const expanded = menu === item.label;

              if (!item.children) {
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
              }

              return (
                <div key={item.href}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMenu(expanded ? null : item.label)}
                    className={cn(
                      'flex w-full items-center justify-between py-3 pl-4 text-base font-semibold border-l-2 transition-colors',
                      active ? 'border-brand-600 text-ink-900' : 'border-transparent text-ink-500'
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')}
                    />
                  </button>
                  {expanded ? (
                    <div className="ml-4 border-l border-ink-100 pl-4">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block py-2.5 text-sm font-medium text-ink-500 hover:text-brand-800"
                        >
                          <span className="inline-flex items-center gap-2">
                            {c.label}
                            {c.pending ? (
                              <span className="rounded-full border border-ink-200 px-1.5 py-0.5 text-[9px] text-ink-400">
                                洽詢
                              </span>
                            ) : null}
                          </span>
                          {/* 桌機版同一段用 ink-400（4.83:1）；ink-300 只有 2.48:1 */}
                          {c.desc ? <div className="mt-0.5 text-xs text-ink-400">{c.desc}</div> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
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
