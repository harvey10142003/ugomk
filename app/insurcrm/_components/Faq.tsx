'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 常見問題手風琴。答案一直留在 DOM 裡（以 grid-rows 0fr 收合，不是條件渲染），
 * 所以搜尋引擎讀得到、FAQPage 結構化資料也與畫面一致。收合時用 inert 讓鍵盤與報讀器略過。
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={cn('transition-colors duration-300', isOpen && 'bg-brand-50/40')}>
            <h3>
              <button
                type="button"
                id={`icrm-faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`icrm-faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none focus-visible:bg-brand-50 sm:px-7"
              >
                <span className={cn('text-base font-bold transition-colors', isOpen ? 'text-brand-900' : 'text-ink-900')}>{f.q}</span>
                <span
                  className={cn(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    isOpen ? 'rotate-180 border-brand-700 bg-brand-700 text-white' : 'border-ink-200 text-ink-500'
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </h3>
            <div
              id={`icrm-faq-a-${i}`}
              role="region"
              aria-labelledby={`icrm-faq-q-${i}`}
              className="icrm-acc"
              data-open={isOpen}
              // @ts-expect-error inert 是標準 HTML 屬性，React 18 的型別尚未收錄
              inert={isOpen ? undefined : ''}
            >
              <div>
                <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-600 sm:px-7">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
