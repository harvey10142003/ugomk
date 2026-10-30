/**
 * 數字跳動：把元素文字裡的第一組數字從 from 跑到 to（保留前後字與千分位）。
 *
 * 規則（與 docs/design 的動畫原則一致）：
 *   - 伺服器輸出的文字就是最終值；這裡只在動畫期間暫時改寫，結束一定寫回原文。
 *   - 使用者開「減少動態」時呼叫端不會呼叫這支（直接停在最終值）。
 *   - 同一元素重複觸發時，先停掉上一輪再開始，避免兩個 rAF 互搶。
 */
const running = new WeakMap<Element, number>();

export function countUp(el: HTMLElement, opts: { from?: number; duration?: number } = {}) {
  const original = el.dataset.countFinal ?? el.textContent ?? '';
  el.dataset.countFinal = original;
  const m = original.match(/\d[\d,]*/);
  if (!m || m.index === undefined) return;
  const to = Number(m[0].replace(/,/g, ''));
  if (!Number.isFinite(to)) return;
  const from = opts.from ?? Number(el.dataset.countFrom ?? 0);
  const duration = opts.duration ?? Number(el.dataset.countMs ?? 1200);
  const head = original.slice(0, m.index);
  const tail = original.slice(m.index + m[0].length);
  const comma = m[0].includes(',');
  const fmt = (n: number) => (comma ? n.toLocaleString('en-US') : String(n));

  const prev = running.get(el);
  if (prev) cancelAnimationFrame(prev);

  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    // easeOutCubic：前段快、尾段慢慢停，數字不會在最後一格才跳
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = head + fmt(Math.round(from + (to - from) * e)) + tail;
    if (p < 1) running.set(el, requestAnimationFrame(step));
    else {
      el.textContent = original;
      running.delete(el);
    }
  };
  el.textContent = head + fmt(from) + tail;
  running.set(el, requestAnimationFrame(step));
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** 播放前先把數字擺在起點（例如後台點數先顯示 100，結帳後才跳到 112）。countUp 結束會寫回原文。 */
export function presetCount(el: HTMLElement) {
  const original = el.dataset.countFinal ?? el.textContent ?? '';
  el.dataset.countFinal = original;
  const from = el.dataset.countFrom;
  if (from === undefined) return;
  el.textContent = original.replace(/\d[\d,]*/, from);
}
