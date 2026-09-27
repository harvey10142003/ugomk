'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 數字計數動畫。伺服器端直接輸出最終值（沒有 JS、減少動態、爬蟲都看得到正確數字），
 * 只有在「元素還沒進入視窗」時才歸零等待進場，避免已經看得到的數字閃回 0。
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1400
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    // fail-safe：6 秒內都沒進場（observer 沒回報、分頁在背景）就直接顯示最終值，數字不能卡在 0
    const safety = window.setTimeout(() => {
      if (!raf) {
        io.disconnect();
        setN(value);
      }
    }, 6000);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
