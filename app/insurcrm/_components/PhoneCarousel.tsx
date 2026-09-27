'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { carouselScreens } from '../_data/content';
import { PhoneFrame } from './PhoneFrame';
import { BriefScreen, CardScreen, MyPolicyScreen, SummaryScreen } from './MockScreens';

const SCREENS: Record<string, () => JSX.Element> = {
  brief: BriefScreen,
  summary: SummaryScreen,
  mypolicy: MyPolicyScreen,
  card: CardScreen
};
const INTERVAL = 4800;

/**
 * 手機畫面輪播。
 *  - 自動輪播：滑鼠移入、鍵盤焦點在內、畫面不在視窗內、或使用者開了減少動態時都停
 *  - 左右鍵切換、手機左右滑動切換
 *  - 有明確的暫停／播放按鈕（WCAG 2.2.2：會自己動的內容要能停）
 */
export function PhoneCarousel() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = carouselScreens.length;

  const go = useCallback((to: number) => setI(((to % n) + n) % n), [n]);

  useEffect(() => {
    const r = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    setReduce(r);
    if (r) setPlaying(false);
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hovered || !visible) return;
    const t = window.setTimeout(() => go(i + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, playing, hovered, visible, go]);

  const screen = carouselScreens[i];

  return (
    <div
      ref={wrap}
      className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* 左：畫面清單（桌機） */}
      <ol className="hidden space-y-2 lg:block">
        {carouselScreens.map((s, k) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => go(k)}
              aria-current={k === i ? 'true' : undefined}
              className={cn(
                'w-full rounded-2xl border px-5 py-4 text-left transition-all duration-300',
                k === i ? 'border-brand-200 bg-white shadow-card' : 'border-transparent hover:bg-white/60'
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold tabular-nums',
                    k === i ? 'bg-brand-800 text-white' : 'bg-mist-300 text-ink-500'
                  )}
                >
                  {k + 1}
                </span>
                <span className={cn('font-bold', k === i ? 'text-ink-900' : 'text-ink-500')}>{s.title}</span>
              </div>
              {k === i ? <p className="mt-2 pl-10 text-sm text-ink-600">{s.caption}</p> : null}
              {k === i && playing && !reduce ? (
                <span className="mt-3 ml-10 block h-0.5 overflow-hidden rounded-full bg-brand-100">
                  <span
                    key={`${i}-${hovered}-${visible}`}
                    className="block h-full origin-left bg-brand-600"
                    style={{
                      animation: hovered || !visible ? 'none' : `icrmBar ${INTERVAL}ms linear forwards`
                    }}
                  />
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ol>

      {/* 中：手機 */}
      <div
        className="relative isolate"
        role="region"
        aria-roledescription="輪播"
        aria-label="手機畫面示意"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(i + 1);
          if (e.key === 'ArrowLeft') go(i - 1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
          touchX.current = null;
        }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-mint-200 via-brand-100 to-[#FBEFD9] opacity-70 blur-2xl" aria-hidden />
        <PhoneFrame screenClassName="h-[520px]">
          <div className="relative h-full">
            {carouselScreens.map((s, k) => {
              const Screen = SCREENS[s.id];
              return (
                <div
                  key={s.id}
                  aria-hidden={k !== i}
                  role="group"
                  aria-roledescription="投影片"
                  aria-label={`${k + 1} / ${n}：${s.title}`}
                  className={cn(
                    'absolute inset-0 transition-all duration-500 ease-out',
                    k === i ? 'opacity-100 translate-x-0' : k < i ? 'pointer-events-none -translate-x-6 opacity-0' : 'pointer-events-none translate-x-6 opacity-0'
                  )}
                >
                  <Screen />
                </div>
              );
            })}
          </div>
        </PhoneFrame>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="上一個畫面"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-brand-400 hover:text-brand-800"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex items-center gap-1.5">
            {carouselScreens.map((s, k) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(k)}
                aria-label={`第 ${k + 1} 個畫面：${s.title}`}
                aria-current={k === i ? 'true' : undefined}
                className={cn('h-2 rounded-full transition-all duration-300', k === i ? 'w-6 bg-brand-700' : 'w-2 bg-ink-200 hover:bg-brand-300')}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="下一個畫面"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-brand-400 hover:text-brand-800"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? '暫停自動輪播' : '開始自動輪播'}
            aria-pressed={!playing}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 transition hover:text-brand-800"
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
          </button>
        </div>
        {/* 手機版說明文字 */}
        <p className="mt-4 text-center text-sm text-ink-600 lg:hidden" aria-live="polite">
          <span className="font-bold text-ink-900">{screen.title}</span>．{screen.caption}
        </p>
      </div>

      {/* 右：說明（桌機） */}
      <div className="hidden lg:block">
        <div className="rounded-3xl border border-brand-100 bg-white/80 p-6 backdrop-blur">
          <div className="eyebrow">目前畫面</div>
          <div className="mt-3 text-2xl font-extrabold text-ink-900" aria-live="polite">
            {screen.title}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{screen.caption}</p>
          <p className="mt-6 text-xs text-ink-400">示意畫面，人名、公司與數字皆為虛構</p>
        </div>
      </div>
    </div>
  );
}
