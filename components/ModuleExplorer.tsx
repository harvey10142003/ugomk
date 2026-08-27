'use client';

import { useState } from 'react';
import { crmModules, moduleCategories, countByCategory, type ModuleCategoryKey } from '@/lib/data/modules';
import { cn } from '@/lib/utils';

/**
 * 38 個模組的呈現問題：等權重大卡片會變成噪音，一頁看不完也記不住。
 * 解法是分四層 + 緊湊列，一行一個模組，三欄並排，兩個捲動高度內看完全部。
 */
export function ModuleExplorer() {
  const [active, setActive] = useState<ModuleCategoryKey | 'all'>('all');
  const list = active === 'all' ? crmModules : crmModules.filter((m) => m.category === active);
  const caption = moduleCategories.find((c) => c.key === active)?.caption;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mt-10">
        {moduleCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActive(c.key)}
            aria-pressed={active === c.key}
            className={cn(
              'rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200',
              active === c.key
                ? 'border-brand-800 bg-brand-800 text-white shadow-brand'
                : 'border-ink-200 bg-white text-ink-500 hover:border-brand-400 hover:text-brand-800'
            )}
          >
            {c.label}
            <span className="ml-1.5 font-mono text-[11px] opacity-75">{countByCategory(c.key)}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-sm text-ink-400">{caption}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <article
            key={m.id}
            className="group flex gap-3.5 rounded-2xl border border-ink-100 bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
          >
            <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-base font-extrabold text-brand-800 transition-colors duration-200 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
              {m.mark}
            </span>
            <div className="min-w-0">
              <h3 className="flex flex-wrap items-center gap-1.5 text-[0.92rem] font-bold text-ink-900">
                {m.title}
                {m.perStore ? (
                  <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider text-amber-800">
                    分店獨立
                  </span>
                ) : null}
              </h3>
              <p className="mt-1 text-[0.79rem] leading-relaxed text-ink-400">{m.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
