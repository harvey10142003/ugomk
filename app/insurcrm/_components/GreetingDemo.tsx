'use client';

import { useState } from 'react';
import { Check, Clock, Gift, MoonStar, PenLine, RotateCcw, Send, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { greetingDrafts } from '../_data/content';

type Stage = 'review' | 'sending' | 'scheduled';

/**
 * 「祝福一鍵確認」互動示範：勾選、改字、確認 → 排定 09:00 發出。
 * 純前端狀態，不送出任何資料；重整或按「再示範一次」就回到初始。
 */
export function GreetingDemo() {
  const [picked, setPicked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(greetingDrafts.map((g) => [g.id, true]))
  );
  const [texts, setTexts] = useState<Record<string, string>>(() =>
    Object.fromEntries(greetingDrafts.map((g) => [g.id, g.text]))
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('review');

  const count = Object.values(picked).filter(Boolean).length;

  const confirm = () => {
    if (count === 0) return;
    setEditing(null);
    setStage('sending');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => setStage('scheduled'), reduce ? 0 : 900);
  };

  const reset = () => {
    setPicked(Object.fromEntries(greetingDrafts.map((g) => [g.id, true])));
    setTexts(Object.fromEntries(greetingDrafts.map((g) => [g.id, g.text])));
    setEditing(null);
    setStage('review');
  };

  const iconFor = (occasion: string, lunar?: boolean) =>
    lunar ? MoonStar : occasion.includes('週年') ? ShieldCheck : Gift;

  return (
    <div className="rounded-[2rem] border border-brand-100 bg-white p-4 shadow-card sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-brand-700">今天早上 07:30｜系統已擬好</div>
          <div className="mt-1 text-lg font-bold text-ink-900">今日祝福待確認</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBEFD9] px-3 py-1 text-xs font-semibold text-[#7A4B0B]">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          預定 09:00 發出
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {greetingDrafts.map((g) => {
          const Icon = iconFor(g.occasion, g.lunar);
          const on = picked[g.id];
          const done = stage === 'scheduled' && on;
          return (
            <li
              key={g.id}
              className={cn(
                'rounded-2xl border p-3.5 transition-all duration-300 sm:p-4',
                done ? 'border-brand-300 bg-brand-50' : on ? 'border-brand-200 bg-white' : 'border-ink-100 bg-mist-200 opacity-70'
              )}
            >
              <div className="flex items-start gap-3">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBEFD9] text-[#B7791F] sm:inline-flex">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-ink-900">{g.who}</span>
                    <span className="chip-ink">{g.occasion}</span>
                    {g.lunar ? <span className="chip-brand">農曆自動換算</span> : null}
                  </div>
                  {editing === g.id ? (
                    <div className="mt-2">
                      <label htmlFor={`icrm-greet-${g.id}`} className="sr-only">
                        修改給{g.who}的祝福內容
                      </label>
                      <textarea
                        id={`icrm-greet-${g.id}`}
                        value={texts[g.id]}
                        onChange={(e) => setTexts((s) => ({ ...s, [g.id]: e.target.value.slice(0, 200) }))}
                        rows={3}
                        className="w-full rounded-xl border border-brand-300 bg-white px-3 py-2 text-sm leading-relaxed text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      />
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        完成修改
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{texts[g.id]}</p>
                  )}
                  {stage === 'review' && editing !== g.id ? (
                    <button
                      type="button"
                      onClick={() => setEditing(g.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
                      aria-label={`修改給${g.who}的祝福`}
                    >
                      <PenLine className="h-3.5 w-3.5" aria-hidden />
                      改幾個字
                    </button>
                  ) : null}
                </div>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  aria-label={`${on ? '取消' : '勾選'}發送給${g.who}的${g.occasion}祝福`}
                  disabled={stage !== 'review'}
                  onClick={() => setPicked((s) => ({ ...s, [g.id]: !s[g.id] }))}
                  className={cn(
                    'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-default',
                    on ? 'border-brand-700 bg-brand-700 text-white' : 'border-ink-300 bg-white text-transparent'
                  )}
                >
                  <Check className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {done ? (
                <div className="icrm-bubble mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-800">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  已排定 09:00 以你的名義發出
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {stage === 'scheduled' ? (
          <button type="button" onClick={reset} className="btn-outline">
            <RotateCcw className="h-4 w-4" aria-hidden />
            再示範一次
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            disabled={count === 0 || stage === 'sending'}
            className="btn-brand disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
          >
            <Send className={cn('h-4 w-4', stage === 'sending' && 'animate-pulse')} aria-hidden />
            {stage === 'sending' ? '排程中' : `確認 ${count} 則，09:00 發出`}
          </button>
        )}
        <p className="text-xs text-ink-500" aria-live="polite">
          {stage === 'scheduled'
            ? `已排定 ${count} 則祝福；沒勾選的不會發出。`
            : count === 0
              ? '沒有勾選任何祝福，今天不會發出。'
              : '沒確認的祝福不會發出，隔天早報會提醒你。'}
        </p>
      </div>
    </div>
  );
}
