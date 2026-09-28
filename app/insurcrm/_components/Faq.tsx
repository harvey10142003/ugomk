'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 常見問題手風琴。答案一直留在 DOM 裡（以 grid-rows 0fr 收合，不是條件渲染），
 * 所以搜尋引擎讀得到、FAQPage 結構化資料也與畫面一致。收合時用 inert 讓鍵盤與報讀器略過。
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t-2 border-[color:var(--icrm-ink)]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-[color:var(--icrm-rule)]">
            <h3>
              <button
                type="button"
                id={`icrm-faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`icrm-faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[64px] w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="text-[17px] font-bold">{f.q}</span>
                <Plus
                  className={cn(
                    'h-5 w-5 shrink-0 text-[color:var(--icrm-teal)] transition-transform duration-300',
                    isOpen && 'rotate-45'
                  )}
                  aria-hidden
                />
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
                <p className="icrm-body pb-6 pr-10">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
