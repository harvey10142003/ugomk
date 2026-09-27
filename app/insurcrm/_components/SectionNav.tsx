'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavLink = { id: string; label: string };

/**
 * 頁內區段導覽：黏在全站 header 下方，捲動時自動標示目前所在區段（scrollspy），
 * 手機上可橫向滑動，作用中的項目會自動捲進可視範圍。
 * 錨點捲動靠 globals.css 的 `scroll-behavior: smooth`（減少動態時由瀏覽器自己處理）。
 */
export function SectionNav({ links, ctaHref, ctaLabel }: { links: NavLink[]; ctaHref: string; ctaLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  // scrollspy：用捲動位置算「上緣已經過了導覽列的最後一個區段」，比 observer 在快速捲動時更穩定
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = 180;
      let current: string | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        // 區段依文件順序排列；不在導覽裡的區段（輪播、差異化）沿用前一個區段的標示
        if (r.top <= line) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = window.setTimeout(compute, 60);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.clearTimeout(raf);
    };
  }, [links]);

  // 「已黏住」判斷用捲動位置算（不靠 observer）：導覽列上緣碰到全站 header 底部就算黏住
  useEffect(() => {
    const onScroll = () => {
      const s = sentinel.current;
      if (!s) return;
      const headerH = window.matchMedia('(min-width: 768px)').matches ? 80 : 64;
      setStuck(s.getBoundingClientRect().top <= headerH);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 作用中的項目捲進導覽列可視範圍（手機）
  useEffect(() => {
    if (!active || !barRef.current) return;
    const el = barRef.current.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!el) return;
    const bar = barRef.current;
    const left = el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2;
    bar.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />
      <nav
        aria-label="本頁導覽"
        className={cn(
          'sticky top-16 z-40 border-b transition-all duration-300 md:top-20',
          stuck ? 'border-ink-100 bg-white/90 shadow-[0_8px_24px_-18px_rgba(3,61,77,0.35)] backdrop-blur-md' : 'border-transparent bg-transparent'
        )}
      >
        <div className="container-ug flex items-center gap-3">
          <div ref={barRef} className="icrm-scroll-x flex flex-1 items-center gap-1 overflow-x-auto py-2.5">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-id={l.id}
                aria-current={active === l.id ? 'location' : undefined}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200',
                  active === l.id ? 'bg-brand-800 text-white' : 'text-ink-500 hover:bg-brand-50 hover:text-brand-800'
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={ctaHref}
            className={cn(
              'hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 sm:inline-flex',
              stuck ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            tabIndex={stuck ? 0 : -1}
            aria-hidden={!stuck}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </nav>
    </>
  );
}
