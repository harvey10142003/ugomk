'use client';

import { useEffect, useRef } from 'react';

/**
 * 首頁捲動進場的單一控制器（與 app/insurcrm/_components/MotionRoot 同一套規則，class 名不同以免互相影響）。
 *
 * 子元素加 `data-reveal`（可加 style `--d` 延遲）即可，不必各自變成 client component。
 *
 * 失敗時一律「全部顯示」：
 *   - 沒有 IntersectionObserver、或使用者開了「減少動態」→ 不加 .ug-motion，CSS 不藏任何東西
 *   - 捲動很快或分頁在背景時 observer 可能沒回報 → 捲動節流檢查＋載入 4 秒後再掃一次
 */
export function HomeMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;

    const targets = Array.from(root.querySelectorAll<HTMLElement | SVGElement>('[data-reveal]'));
    const vh = window.innerHeight;
    // 已在首屏內的元素：先加 .ug-motion 再下一個 frame 標進場，才有「畫出來」的過程；
    // 但不能先閃一下空白 —— 所以首屏元素的初始狀態只有位移與透明，時間很短
    const inView = targets.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh * 0.92 && r.bottom > 0;
    });
    root.classList.add('ug-motion');
    const raf = window.requestAnimationFrame(() => {
      inView.forEach((el) => el.classList.add('is-in'));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    targets.filter((el) => !inView.includes(el)).forEach((el) => io.observe(el));

    let ticking = false;
    const sweep = () => {
      const h = window.innerHeight;
      targets.forEach((el) => {
        if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < h) el.classList.add('is-in');
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => {
        ticking = false;
        sweep();
      }, 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const hardStop = window.setTimeout(sweep, 4000);

    return () => {
      window.cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(hardStop);
      root.classList.remove('ug-motion');
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
