'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 首屏那條線：量出三個畫面的實際位置再畫，字型晚到、視窗改寬都會重算。
 *
 * 路線（全部落在畫面之間的空隙，不壓在畫面上）：
 *   手機「填寫會員資料」那一列的右緣 → 會員資料卡左緣
 *   會員資料卡下緣 → 結帳卡上緣（直線）
 *   結帳卡左緣 → 手機圖文選單那一列的右緣（回到 LINE）
 *
 * 只在桌機版（.ug-stage 是 grid 的時候）畫；手機版由 CSS 的左側直線代替。
 * 伺服器端不輸出，JS 沒跑也只是少一條裝飾線，畫面內容不受影響。
 */
type Anchor = 'phone' | 'join' | 'menu' | 'member' | 'pos';

export function ThreadLines() {
  const ref = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; d: string; dots: [number, number][] } | null>(null);

  useEffect(() => {
    const svg = ref.current;
    const stage = svg?.parentElement;
    if (!stage) return;
    const q = (a: Anchor) => stage.querySelector<HTMLElement>(`[data-anchor="${a}"]`);

    const measure = () => {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        setGeo(null);
        return;
      }
      const s = stage.getBoundingClientRect();
      const r = (el: HTMLElement | null) => el?.getBoundingClientRect();
      const phone = r(q('phone'));
      const join = r(q('join'));
      const menu = r(q('menu'));
      const member = r(q('member'));
      const pos = r(q('pos'));
      if (!phone || !join || !menu || !member || !pos) return;

      const x = (v: number) => Math.round(v - s.left);
      const y = (v: number) => Math.round(v - s.top);
      const A: [number, number] = [x(phone.right), y(join.top + join.height / 2)];
      const B: [number, number] = [x(member.left), y(member.top + 64)];
      const vx = x(member.left + 36);
      const C: [number, number] = [vx, y(member.bottom)];
      const D: [number, number] = [vx, y(pos.top)];
      const E: [number, number] = [x(pos.left), y(pos.top + pos.height * 0.62)];
      const F: [number, number] = [x(phone.right), y(menu.top + menu.height / 2)];
      const k = Math.max(24, (B[0] - A[0]) * 0.55);
      const d = [
        `M ${A[0]} ${A[1]} C ${A[0] + k} ${A[1]}, ${B[0] - k} ${B[1]}, ${B[0]} ${B[1]}`,
        `M ${C[0]} ${C[1]} L ${D[0]} ${D[1]}`,
        `M ${E[0]} ${E[1]} C ${E[0] - k} ${E[1]}, ${F[0] + k} ${F[1]}, ${F[0]} ${F[1]}`
      ].join(' ');
      setGeo({ w: Math.round(s.width), h: Math.round(s.height), d, dots: [A, B, C, D, E, F] });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className="ug-thread"
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      aria-hidden
    >
      <defs>
        <linearGradient id="ug-thread-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8CC8DA" />
          <stop offset="100%" stopColor="#04566B" />
        </linearGradient>
      </defs>
      {geo ? (
        <>
          <path
            className="ug-thread-path"
            pathLength={1}
            d={geo.d}
            fill="none"
            stroke="url(#ug-thread-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {geo.dots.map(([cx, cy], i) => (
            <circle
              key={i}
              className="ug-thread-dot"
              cx={cx}
              cy={cy}
              r="4.5"
              fill="#fff"
              stroke="#04566B"
              strokeWidth="2"
              style={{ '--d': `${0.5 + i * 0.22}s` } as React.CSSProperties}
            />
          ))}
        </>
      ) : null}
    </svg>
  );
}
