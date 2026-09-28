'use client';

import { useState } from 'react';
import { Check, Clock, PenLine, RotateCcw, Send } from 'lucide-react';
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
    window.setTimeout(() => setStage('scheduled'), reduce ? 0 : 700);
  };

  const reset = () => {
    setPicked(Object.fromEntries(greetingDrafts.map((g) => [g.id, true])));
    setTexts(Object.fromEntries(greetingDrafts.map((g) => [g.id, g.text])));
    setEditing(null);
    setStage('review');
  };

  return (
    <div className="icrm-screen">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--icrm-rule-2)] px-4 py-3 sm:px-5">
        <div>
          <div className="text-[15px] font-bold">今天待確認的祝福</div>
          <div className="icrm-small">示範 3 則（共 12 則）．系統 07:30 已擬好</div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--icrm-teal-2)]">
          <Clock className="h-4 w-4" aria-hidden />
          預定 <span className="icrm-num">09:00</span> 發出
        </span>
      </div>

      <ul>
        {greetingDrafts.map((g) => {
          const on = picked[g.id];
          const done = stage === 'scheduled' && on;
          return (
            <li
              key={g.id}
              className={cn(
                'border-b border-[color:var(--icrm-rule-2)] px-4 py-4 transition-colors duration-300 sm:px-5',
                done && 'bg-[color:var(--icrm-tint)]',
                !on && 'bg-[color:var(--icrm-paper)]'
              )}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  aria-label={`發送給${g.who}的${g.occasion}祝福`}
                  disabled={stage !== 'review'}
                  onClick={() => setPicked((s) => ({ ...s, [g.id]: !s[g.id] }))}
                  className="-m-2.5 inline-flex h-11 w-11 shrink-0 items-center justify-center disabled:cursor-default"
                >
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-[5px] border-2 transition-colors duration-200',
                      on
                        ? 'border-[color:var(--icrm-teal)] bg-[color:var(--icrm-teal)] text-white'
                        : 'border-[color:var(--icrm-ink-3)] bg-white text-transparent'
                    )}
                  >
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                </button>
                <div className={cn('min-w-0 flex-1', !on && 'opacity-60')}>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-bold">{g.who}</span>
                    <span className="text-sm text-[color:var(--icrm-ink-3)]">{g.occasion}</span>
                    {g.lunar ? (
                      <span className="text-xs font-bold text-[color:var(--icrm-red)]">農曆八月十五</span>
                    ) : null}
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
                        className="w-full rounded-lg border border-[color:var(--icrm-teal)] bg-white px-3 py-2 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[color:var(--icrm-teal)]/30"
                      />
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="mt-1 inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-[color:var(--icrm-teal)]"
                      >
                        <Check className="h-4 w-4" aria-hidden />
                        完成修改
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 text-[15px] leading-relaxed text-[color:var(--icrm-ink-2)]">{texts[g.id]}</p>
                  )}
                  {stage === 'review' && editing !== g.id ? (
                    <button
                      type="button"
                      onClick={() => setEditing(g.id)}
                      className="mt-0.5 inline-flex min-h-[40px] items-center gap-1 text-sm font-bold text-[color:var(--icrm-teal)] hover:text-[color:var(--icrm-ink)]"
                      aria-label={`修改給${g.who}的祝福`}
                    >
                      <PenLine className="h-3.5 w-3.5" aria-hidden />
                      編輯
                    </button>
                  ) : null}
                  {done ? (
                    <div className="icrm-pop mt-2 flex items-center gap-1.5 text-sm font-bold text-[color:var(--icrm-teal-2)]">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      已排定 09:00 以你的名義發出
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-5">
        {stage === 'scheduled' ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[color:var(--icrm-rule)] bg-white px-4 font-bold text-[color:var(--icrm-ink)] hover:border-[color:var(--icrm-teal)]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            再示範一次
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            disabled={count === 0 || stage === 'sending'}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[color:var(--icrm-teal)] px-5 font-bold text-white transition-colors hover:bg-[color:var(--icrm-teal-2)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" aria-hidden />
            {stage === 'sending' ? '排程中' : `確認 ${count} 則`}
          </button>
        )}
        <p className="icrm-small" aria-live="polite">
          {stage === 'scheduled'
            ? `已排定 ${count} 則；沒勾的不會發出。`
            : count === 0
              ? '沒有勾選，今天不會發出任何祝福。'
              : '這是示範，不會送出任何訊息。'}
        </p>
      </div>
    </div>
  );
}
