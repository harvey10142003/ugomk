'use client';

import { useEffect, useRef, useState } from 'react';

type Stop = { id: string; step: string; title: string; body: string };

/**
 * 顧客旅程四站：桌機（≥1024）是「左邊四站、右邊放大畫面」的自動輪播，手機維持直的一條線、四個畫面全部攤開。
 *
 * 輪播計時不用 setInterval：目前那一站的進度條是一段 CSS 動畫，跑完（animationend）就換下一站。
 * 所以「暫停」只要讓進度條停住（滑鼠移上去、鍵盤焦點在裡面、捲出畫面、分頁在背景），
 * 減少動態或手機版時進度條根本不跑 → 不會自動換，但點選照常可用。
 *
 * 文字永遠全部在畫面上（只是非目前那站顏色淡一點），不藏內容。
 */
export function JourneyTabs({ stops, mocks }: { stops: Stop[]; mocks: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const sync = () => setPaused(hoverRef.current || focusRef.current || !visibleRef.current || document.hidden);
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([e]) => {
              visibleRef.current = e.isIntersecting;
              sync();
            },
            { threshold: 0.35 }
          )
        : null;
    io?.observe(el);
    document.addEventListener('visibilitychange', sync);
    const enter = () => ((hoverRef.current = true), sync());
    const leave = () => ((hoverRef.current = false), sync());
    const fin = () => ((focusRef.current = true), sync());
    const fout = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) {
        focusRef.current = false;
        sync();
      }
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('focusin', fin);
    el.addEventListener('focusout', fout);
    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('focusin', fin);
      el.removeEventListener('focusout', fout);
    };
  }, []);

  return (
    <div ref={rootRef} className="ug-jt" data-paused={paused ? '' : undefined}>
      <ol className="ug-journey ug-jt-list">
        {stops.map((s, i) => (
          <li
            key={s.id}
            className="ug-stop"
            onClick={() => setActive(i)}
            data-active={i === active ? '' : undefined}
            data-reveal
            style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
          >
            <span className="ug-stop-dot" aria-hidden />
            <span className="ug-stop-step">
              <span className="ug-num">{i + 1}</span>・{s.step}
            </span>
            <h3 className="ug-h3 mt-2">
              <button
                type="button"
                className="ug-jt-tab"
                aria-pressed={i === active}
                aria-controls="ug-jt-stage"
                onClick={() => setActive(i)}
              >
                {s.title}
              </button>
            </h3>
            <p className="ug-body mt-2" style={{ fontSize: '0.98rem' }}>
              {s.body}
            </p>
            {/* 進度條（只在桌機顯示）：key 變了就重新跑；跑完換下一站 */}
            <span className="ug-jt-bar" aria-hidden>
              {i === active ? (
                <span
                  key={`bar-${active}`}
                  className="ug-jt-fill"
                  onAnimationEnd={() => setActive((x) => (x + 1) % stops.length)}
                />
              ) : null}
            </span>
            {/* 手機版：畫面跟在該站下面；桌機版藏起來，改看右邊的大畫面 */}
            <div className="ug-jt-inline">{mocks[i]}</div>
          </li>
        ))}
      </ol>
      <div id="ug-jt-stage" className="ug-jt-stage" aria-hidden data-reveal style={{ '--d': '0.12s' } as React.CSSProperties}>
        {mocks.map((m, i) => (
          <div key={stops[i].id} className="ug-jt-panel" data-active={i === active ? '' : undefined}>
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
