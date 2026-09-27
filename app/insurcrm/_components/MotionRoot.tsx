'use client';

import { useEffect, useRef } from 'react';

/**
 * 捲動進場動畫的單一控制器。
 *
 * 子元素只要加 `data-reveal`（可選值 left / right / zoom）與 style `--d` 延遲，
 * 不必各自變成 client component。
 *
 * 失敗時一律「全部顯示」：
 *   - 沒有 IntersectionObserver、或使用者開了「減少動態」→ 不加 .icrm-motion，CSS 不會藏任何東西
 *   - 加上 .icrm-motion 之後 4 秒仍沒進場的元素（例如被捲動跳過、分頁在背景）→ 強制顯示
 */
export function MotionRoot({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const vh = window.innerHeight;
    // 已在首屏內的元素直接標記進場，避免「先閃一下空白再淡入」
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in');
    });
    root.classList.add('icrm-motion');

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
    targets.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));

    // fail-safe：捲動很快、observer 沒回報（背景分頁、節流）時，已經在視窗內或捲過去的元素
    // 不能永遠是透明的 —— 這裡只看幾何位置，不依賴 observer
    let ticking = false;
    const onScrollSafety = () => {
      if (ticking) return;
      ticking = true;
      window.setTimeout(() => {
        ticking = false;
        const h = window.innerHeight;
        targets.forEach((el) => {
          if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < h) el.classList.add('is-in');
        });
      }, 250);
    };
    window.addEventListener('scroll', onScrollSafety, { passive: true });
    const hardStop = window.setTimeout(() => {
      // 載入 4 秒後再掃一次：救「hash 直接跳到中段」而 observer 沒回報的元素
      onScrollSafety();
    }, 4000);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScrollSafety);
      window.clearTimeout(hardStop);
      root.classList.remove('icrm-motion');
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
