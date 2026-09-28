'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems, site } from '@/lib/data/site';
import { sourceFromPath, ctaHref } from '@/lib/site-source';
import { cn } from '@/lib/utils';

/*
 * 全站頁首（2026-09-28 改版，設計方向見 docs/design/site-direction.md）。
 *
 * ## 版面：三欄 grid，不是 flex justify-between
 *
 * 原本是 flex + justify-between，logo／選單／按鈕三塊都不能縮。
 * 只要選單的實際寬度比預期大（瀏覽器預設字級調大、縮放、字型換成較寬的備援字），
 * 最右邊的「預約需求討論」就被推出畫面 —— Shark 在 1100–1200 寬看到的就是這個。
 * 現在：logo 與按鈕兩欄是 auto（永遠保有自己的寬度），選單欄是 minmax(0, 1fr)，
 * 不夠寬時選單會在自己那一欄裡擠，按鈕不會被推走。
 * 另外 lg～xl 之間按鈕改用短文案、選單間距收小，一般字級下選單不會擠到按鈕。
 *
 * 不要在 <nav> 加 overflow-hidden：下拉面板是 nav 的子元素，會被一起切掉。
 *
 * 最後一道保險（`tight`）：桌機寬度下實際量選單需要的寬度，放不下（例如瀏覽器字級設成「特大」）
 * 就整個改用漢堡選單，而不是讓選單疊到按鈕上。
 *
 * ## 字重只用 400／700
 * 中文字型每多一個字重就多下載 3–4 個約 70KB 的分片（app/fonts.css）。
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** 桌機展開中的下拉選單 label；手機則用來記錄展開的子選單 */
  const [menu, setMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  /** 桌機寬度但選單放不下 → 改用漢堡選單（見檔頭說明） */
  const [tight, setTight] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const lg = window.matchMedia('(min-width: 1024px)');
    const check = () => {
      const nav = navRef.current;
      if (!lg.matches || !nav || !logoRef.current || !ctaRef.current) {
        setTight(false);
        return;
      }
      const cs = getComputedStyle(bar);
      const gap = parseFloat(cs.columnGap) || 0;
      const avail =
        bar.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight) -
        logoRef.current.offsetWidth -
        ctaRef.current.offsetWidth -
        gap * 2;
      // 用子項寬度加總，不用 nav.scrollWidth：選單置中時往左溢出的部分不算進 scrollWidth
      const items = Array.from(nav.children) as HTMLElement[];
      const navGap = parseFloat(getComputedStyle(nav).columnGap) || 0;
      const need = items.reduce((sum, el) => sum + el.offsetWidth, 0) + navGap * Math.max(0, items.length - 1);
      setTight(need > avail);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(bar);
    // 字級改變時 bar 本身寬度不變，要看選單各項與按鈕自己的尺寸
    if (navRef.current) Array.from(navRef.current.children).forEach((el) => ro.observe(el));
    if (ctaRef.current) ro.observe(ctaRef.current);
    lg.addEventListener?.('change', check);
    document.fonts?.ready.then(check).catch(() => {});
    return () => {
      ro.disconnect();
      lg.removeEventListener?.('change', check);
    };
  }, []);

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
   * header 的預約按鈕出現在每一頁，所以 source 要看訪客當下在哪一頁，
   * 不能寫死成 'header' —— 那樣只知道「有人按了 header」，答不出他從哪一頁按的。
   * 位置差異（桌機常駐 vs 手機選單內）放在 `pos`。
   */
  const headerSource = sourceFromPath(pathname);

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

  /** 目前所在頁的底線：logo 漸層的一小段線（冰藍 → 深青） */
  const underline = (on: boolean) => (
    <span
      aria-hidden
      className={cn(
        'absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#8CC8DA] to-[#04566B] transition-all duration-300',
        on ? 'w-full' : 'w-0 group-hover:w-full'
      )}
    />
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled || open || menu
          ? 'border-[#D3E0E5] bg-white/95 backdrop-blur-md shadow-[0_8px_24px_-18px_rgba(6,44,56,0.35)]'
          : 'border-transparent bg-white/80 backdrop-blur-sm'
      )}
    >
      {/*
        高度：h-16（手機）／h-20（md 以上）。Tailwind 沒有 h-18，別再寫回去（見 2026-09-06 的修正）。
      */}
      <div
        ref={barRef}
        className={cn(
          'container-ug grid h-16 grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 md:h-20 lg:gap-6',
          !tight && 'lg:grid-cols-[auto_minmax(0,1fr)_auto]'
        )}
      >
        <Link ref={logoRef} href="/" className="shrink-0" aria-label={`${site.name} 首頁`}>
          <Image
            src="/ugo-logo.png"
            alt={`${site.shortName} ${site.name}`}
            width={1569}
            height={528}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav
          ref={navRef}
          className={cn(
            'hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-8',
            // 放不下時仍留在 DOM 裡（量得到需要的寬度，變寬時才切得回來），但不佔位也看不到
            tight && 'lg:pointer-events-none lg:invisible lg:absolute lg:left-0 lg:top-0'
          )}
          aria-label="主選單"
          aria-hidden={tight || undefined}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative whitespace-nowrap py-2 text-[0.9375rem] transition-colors',
                    active ? 'font-bold text-[#0B2530]' : 'text-[#3D5560] hover:text-[#0B2530]'
                  )}
                >
                  {item.label}
                  {underline(active)}
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
                    'group relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[0.9375rem] transition-colors',
                    active ? 'font-bold text-[#0B2530]' : 'text-[#3D5560] hover:text-[#0B2530]',
                    expanded && 'text-[#0B2530]'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')}
                  />
                  {underline(active)}
                </button>

                {expanded ? (
                  <div
                    className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="overflow-hidden rounded-2xl border border-[#D3E0E5] bg-white p-2 shadow-[0_24px_48px_-24px_rgba(6,44,56,0.4)]">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setMenu(null)}
                          className="group/item block rounded-xl px-4 py-3 transition-colors hover:bg-[#E3F0F4]"
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-[#0B2530] group-hover/item:text-[#04566B]">
                            {c.label}
                            {c.pending ? (
                              <span className="rounded-full border border-[#D3E0E5] px-1.5 py-0.5 text-[10px] text-[#5B6F78]">
                                洽詢
                              </span>
                            ) : null}
                          </div>
                          {c.desc ? <div className="mt-0.5 text-xs text-[#5B6F78]">{c.desc}</div> : null}
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
          預約按鈕在每一種寬度都要看得到（手機訪客幾乎都從 LINE 點進來）。
          lg 以下與 lg～xl 用短文案，xl 以上才用完整文案；兩段文字都留在 DOM 裡，
          連結文字（GTM link_text）與改版前相同。
        */}
        <Link
          ref={ctaRef}
          href={ctaHref(site.cta.primary.href, headerSource, 'header')}
          className={cn(
            'col-start-3 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[#04566B] px-4 text-sm font-bold tracking-[0.04em] text-white transition-colors hover:bg-[#0B3A48] md:h-11 xl:px-6',
            !tight && 'lg:col-start-auto'
          )}
        >
          <span className="xl:hidden">預約諮詢</span>
          <span className="hidden xl:inline">{site.cta.primary.label}</span>
        </Link>

        <button
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
          className={cn(
            '-mr-2 inline-flex h-11 w-11 items-center justify-center text-[#0B2530]',
            !tight && 'lg:hidden'
          )}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 手機選單 —— 下拉在觸控裝置沒有 hover，改成可展開的子清單 */}
      {open && (
        <div
          className={cn(
            'max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#D3E0E5] bg-white',
            !tight && 'lg:hidden'
          )}
        >
          <nav className="container-ug flex flex-col gap-1 py-6" aria-label="主選單">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const expanded = menu === item.label;

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'border-l-2 py-3 pl-4 text-base transition-colors',
                      active
                        ? 'border-[#04566B] font-bold text-[#0B2530]'
                        : 'border-transparent text-[#3D5560] hover:border-[#8CC8DA] hover:text-[#0B2530]'
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
                      'flex w-full items-center justify-between border-l-2 py-3 pl-4 text-base transition-colors',
                      active ? 'border-[#04566B] font-bold text-[#0B2530]' : 'border-transparent text-[#3D5560]'
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')}
                    />
                  </button>
                  {expanded ? (
                    <div className="ml-4 border-l border-[#D3E0E5] pl-4">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block py-2.5 text-sm text-[#3D5560] hover:text-[#04566B]"
                        >
                          <span className="inline-flex items-center gap-2">
                            {c.label}
                            {c.pending ? (
                              <span className="rounded-full border border-[#D3E0E5] px-1.5 py-0.5 text-[10px] text-[#5B6F78]">
                                洽詢
                              </span>
                            ) : null}
                          </span>
                          {/* #5B6F78 白底 5.3:1；比這更淺的灰會掉到 AA 以下 */}
                          {c.desc ? <div className="mt-0.5 text-xs text-[#5B6F78]">{c.desc}</div> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link
              href={ctaHref(site.cta.primary.href, headerSource, 'header_menu')}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#04566B] text-sm font-bold tracking-[0.04em] text-white"
            >
              {site.cta.primary.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
