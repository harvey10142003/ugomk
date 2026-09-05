'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';
import type { DemoScreen, ModuleDemo as ModuleDemoData } from '@/lib/data/module-demos';
import { cn } from '@/lib/utils';

/**
 * 模組頁的互動 demo。
 *
 * 點步驟就換畫面；一進頁面會自己輪播，讓不想動手的人也看得到全部內容，
 * 但只要使用者點了任何一步就停止自動播放 —— 畫面在你讀的時候自己跳掉是很糟的體驗。
 */
export function ModuleDemo({ demo }: { demo: ModuleDemoData }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % demo.steps.length);
    }, 4500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, demo.steps.length]);

  // 使用者一旦自己選步驟，就交還控制權
  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const step = demo.steps[active];

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
      {/* 步驟切換列 */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink-100 bg-mist-200 p-4 md:p-5">
        {demo.steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => pick(i)}
            aria-current={i === active}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200',
              i === active
                ? 'border-brand-800 bg-brand-800 text-white shadow-brand'
                : 'border-ink-200 bg-white text-ink-500 hover:border-brand-400 hover:text-brand-800'
            )}
          >
            <span className={cn('font-mono text-[11px]', i === active ? 'text-brand-200' : 'text-ink-300')}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {s.label}
            {i < demo.steps.length - 1 ? (
              <ChevronRight
                className={cn('h-3 w-3', i === active ? 'text-brand-300' : 'text-ink-200')}
                aria-hidden
              />
            ) : null}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-800"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? '暫停' : '自動播放'}
        </button>
      </div>

      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
        {/* 說明 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="chip-brand">{step.actor}操作</span>
            <span className="font-mono text-xs text-ink-300">
              {active + 1} / {demo.steps.length}
            </span>
          </div>
          <h3 className="heading-3 mt-4">{step.label}</h3>
          <p className="body-base mt-3">{step.caption}</p>

          {/* 進度指示 */}
          <div className="mt-8 flex gap-1.5">
            {demo.steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => pick(i)}
                aria-label={`第 ${i + 1} 步：${s.label}`}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors duration-300',
                  i === active ? 'bg-brand-700' : i < active ? 'bg-brand-300' : 'bg-ink-100'
                )}
              />
            ))}
          </div>
        </div>

        {/* 畫面 */}
        <div className="flex justify-center">
          <Device kind={step.device}>
            <Screen screen={step.screen} />
          </Device>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 裝置外框 ─────────── */
function Device({ kind, children }: { kind: 'phone' | 'tablet' | 'desktop'; children: React.ReactNode }) {
  if (kind === 'phone') {
    return (
      <div className="w-[280px] rounded-[36px] bg-brand-950 p-2 shadow-card">
        <div className="overflow-hidden rounded-[28px] bg-mist-200">
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-ink-700">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              ●●●●
            </span>
          </div>
          <div className="min-h-[400px] px-3 pb-4 pt-1">{children}</div>
        </div>
      </div>
    );
  }

  if (kind === 'tablet') {
    return (
      <div className="w-full max-w-[440px] rounded-[26px] bg-brand-950 p-2.5 shadow-card">
        <div className="min-h-[380px] rounded-[18px] bg-mist-200 p-3">{children}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-mist-200 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-ink-200" />
        <span className="h-2 w-2 rounded-full bg-ink-200" />
        <span className="h-2 w-2 rounded-full bg-ink-200" />
        <span className="ml-2 font-mono text-[10px] text-ink-400">crm.ugomk.com</span>
      </div>
      <div className="min-h-[340px] bg-mist-200 p-4">{children}</div>
    </div>
  );
}

/* ─────────── 畫面版型 ─────────── */
const TONE: Record<string, string> = {
  ok: 'border-brand-200 bg-brand-50 text-brand-800',
  warn: 'border-amber-200 bg-amber-50 text-amber-800',
  muted: 'border-ink-200 bg-mist-300 text-ink-500'
};

function Screen({ screen }: { screen: DemoScreen }) {
  if (screen.kind === 'chat') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2.5 rounded-t-xl border-b border-ink-100 bg-white px-3 py-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-sm font-extrabold text-white">
            U
          </span>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold text-ink-900">{screen.title}</div>
            <div className="inline-flex items-center gap-1 text-[9px] text-brand-700">
              <span className="h-1.5 w-1.5 rounded-full bg-line-500" />
              線上
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 bg-[#7B95A8]/10 px-2 py-3">
          {screen.messages.map((m, i) => (
            <div key={i} className={cn('flex items-end gap-1.5', m.from === 'user' && 'justify-end')}>
              {m.from === 'brand' ? (
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-white">
                  U
                </span>
              ) : null}
              <div
                className={cn(
                  'max-w-[190px] whitespace-pre-line px-3 py-2 text-[11px] leading-relaxed',
                  // 顧客那側的氣泡出現在 19 個模組頁的 8 個對話 demo：
                  // 綠底白字只有 2.26:1，改深字後 8.49:1，也更接近 LINE 實際的樣子
                  m.from === 'brand'
                    ? 'rounded-2xl rounded-bl-sm bg-white text-ink-800 shadow-soft'
                    : 'rounded-2xl rounded-br-sm bg-line-500 text-ink-900'
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {screen.menu ? (
          <div className="grid grid-cols-3 border-t border-ink-100 bg-white text-[9px] font-semibold text-ink-700">
            {screen.menu.map((m, i) => (
              <div key={m} className={cn('p-2 text-center', i < 2 && 'border-r border-ink-100')}>
                {m}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (screen.kind === 'list') {
    return (
      <div className="rounded-xl bg-white p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-sm font-bold text-ink-900">{screen.title}</div>
          {screen.caption ? <div className="text-[10px] text-ink-400">{screen.caption}</div> : null}
        </div>
        <div className="mt-3 space-y-2">
          {screen.rows.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-ink-100 bg-mist-100 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[11px] font-bold text-ink-900">{r.left}</div>
                {r.sub ? <div className="mt-0.5 truncate text-[10px] text-ink-400">{r.sub}</div> : null}
              </div>
              {r.right ? (
                <div className="shrink-0 font-mono text-[11px] font-bold text-ink-700">{r.right}</div>
              ) : null}
              {r.badge ? (
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold',
                    TONE[r.tone ?? 'muted']
                  )}
                >
                  {r.badge}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen.kind === 'form') {
    return (
      <div className="rounded-xl bg-white p-3.5">
        <div className="text-sm font-bold text-ink-900">{screen.title}</div>
        <div className="mt-3 space-y-2.5">
          {screen.fields.map((f) => (
            <div key={f.label} className="rounded-lg border border-ink-100 bg-mist-100 px-3 py-2">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-ink-400">
                {f.label}
              </div>
              <div className="mt-0.5 text-[11px] font-bold text-ink-900">{f.value}</div>
              {f.hint ? <div className="mt-0.5 text-[9px] text-ink-400">{f.hint}</div> : null}
            </div>
          ))}
        </div>
        {screen.submit ? (
          <div className="mt-4 rounded-full bg-brand-800 py-2.5 text-center text-[11px] font-bold text-white">
            {screen.submit}
          </div>
        ) : null}
      </div>
    );
  }

  if (screen.kind === 'grid') {
    return (
      <div className="rounded-xl bg-white p-3.5">
        <div className="text-sm font-bold text-ink-900">{screen.title}</div>
        {screen.caption ? <div className="mt-1 text-[10px] text-ink-400">{screen.caption}</div> : null}
        <div className="mt-3 grid grid-cols-2 gap-2">
          {screen.items.map((it) => (
            <div
              key={it.label}
              className={cn(
                'rounded-lg border px-2.5 py-3 text-center',
                it.state === 'on'
                  ? 'border-brand-300 bg-brand-50'
                  : it.state === 'busy'
                    ? 'border-amber-200 bg-amber-50'
                    : it.state === 'off'
                      ? 'border-ink-100 bg-mist-300 opacity-60'
                      : 'border-ink-100 bg-mist-100'
              )}
            >
              <div
                className={cn(
                  'text-[11px] font-bold',
                  it.state === 'off' ? 'text-ink-400' : 'text-ink-900'
                )}
              >
                {it.label}
              </div>
              {it.sub ? (
                <div
                  className={cn(
                    'mt-0.5 text-[9px]',
                    it.state === 'on'
                      ? 'text-brand-700'
                      : it.state === 'busy'
                        ? 'text-amber-700'
                        : 'text-ink-400'
                  )}
                >
                  {it.sub}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // stats
  return (
    <div className="rounded-xl bg-white p-3.5">
      <div className="text-sm font-bold text-ink-900">{screen.title}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {screen.stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-ink-100 bg-mist-100 px-2 py-2.5 text-center">
            <div className="text-[9px] font-semibold text-ink-400">{s.label}</div>
            <div className="mt-1 font-mono text-sm font-extrabold text-brand-900">{s.value}</div>
            {s.hint ? <div className="mt-0.5 text-[8px] text-brand-600">{s.hint}</div> : null}
          </div>
        ))}
      </div>
      {screen.rows ? (
        <div className="mt-3 space-y-1.5">
          {screen.rows.map((r) => (
            <div
              key={r.left}
              className="flex items-center justify-between rounded-lg border border-ink-100 bg-mist-100 px-3 py-2 text-[10px]"
            >
              <span className="text-ink-500">{r.left}</span>
              <span className="font-bold text-ink-900">{r.right}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
