'use client';

import { useEffect, useRef } from 'react';
import { countUp, presetCount, prefersReducedMotion } from './countUp';

/**
 * 首屏舞台的播放控制（動畫本身全在 CSS：app/home.css「首屏播放」）。
 *
 * - 一開始就有 `.ug-live`，CSS 動畫在第一次繪製就開始跑，不等 JS（不會先閃完整畫面再藏起來）。
 * - 掛上之後：舞台不在畫面內（例如手機版在首屏下方）→ 從頭重來並暫停，捲到才播。
 * - 離開畫面或分頁切到背景 → 暫停；回來接著播。
 * - 帶 `data-live-count` 的數字在自己的動畫開始時跳動（animationstart，跟著 CSS 的延遲走）。
 * - 播完停 6 秒，聊天內容與右側卡片淡出，再從頭播一次。
 * - 減少動態：CSS 不播，這裡什麼都不做，畫面就是最終狀態。
 */
const HOLD_MS = 6000;
const FADE_MS = 450;

export function HeroLive({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage || prefersReducedMotion()) return;

    let visible = true;
    let waiting = false; // 播完、等下一輪
    let holdTimer = 0;
    let fadeTimer = 0;

    const setPaused = (p: boolean) => stage.classList.toggle('is-paused', p);

    const presets = Array.from(stage.querySelectorAll<HTMLElement>('[data-live-count][data-count-from]'));
    const restart = () => {
      presets.forEach(presetCount);
      stage.classList.remove('ug-live', 'is-out');
      void stage.offsetWidth; // 讓瀏覽器丟掉舊的動畫狀態，重新加 class 才會從頭跑
      stage.classList.add('ug-live');
      waiting = false;
    };

    const scheduleReplay = () => {
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(() => {
        if (!visible || document.hidden) {
          waiting = true; // 回到畫面時再接著重播
          return;
        }
        stage.classList.add('is-out');
        fadeTimer = window.setTimeout(restart, FADE_MS);
      }, HOLD_MS);
    };

    // 找出最後一個出場的元素：它的動畫結束＝一輪播完
    const timed = Array.from(stage.querySelectorAll<HTMLElement>('[style*="--t"]'));
    const tOf = (el: HTMLElement) => parseFloat(el.style.getPropertyValue('--t')) || 0;
    const last = timed.reduce<HTMLElement | null>((a, el) => (!a || tOf(el) >= tOf(a) ? el : a), null);

    const onStart = (e: AnimationEvent) => {
      const el = e.target as HTMLElement;
      if (el.hasAttribute('data-live-count')) countUp(el);
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target === last) scheduleReplay();
    };
    stage.addEventListener('animationstart', onStart);
    stage.addEventListener('animationend', onEnd);

    // 頁面很慢才掛上時（後台點數那一步已經播過）不要擺回起點，否則會停在 100
    const elapsed = Number(document.timeline?.currentTime ?? 0);
    if (elapsed < 5000) presets.forEach(presetCount);

    // 不在畫面內就從頭等（手機版舞台在首屏下方，捲到才開始播）
    const r = stage.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) {
      visible = false;
      restart();
      setPaused(true);
    }

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              setPaused(!visible);
              if (visible && waiting) scheduleReplay();
            },
            { threshold: 0.25 }
          )
        : null;
    io?.observe(stage);

    const onVis = () => setPaused(document.hidden || !visible);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      stage.removeEventListener('animationstart', onStart);
      stage.removeEventListener('animationend', onEnd);
      window.clearTimeout(holdTimer);
      window.clearTimeout(fadeTimer);
      stage.classList.remove('is-paused', 'is-out');
      stage.classList.add('ug-live');
    };
  }, []);

  return (
    <div ref={ref} className="ug-stage ug-live">
      {children}
    </div>
  );
}
