'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CopyTextButton } from '@/components/kit/actions';
import { IconChevronDown, IconSearch, IconX } from '@/components/kit/icons';

export interface QaEntry {
  q: string;
  a: string;
  kind?: 'faq' | 'objection';
  /** 全站搜尋用：這題屬於哪個模組、連到哪一頁 */
  moduleName?: string;
  href?: string;
}

const KIND_TITLE = { faq: '常見問題', objection: '異議處理' } as const;

function norm(s: string) {
  return s.toLowerCase().replace(/\s+/g, '');
}

export function qaMatches(e: QaEntry, q: string) {
  if (!q) return true;
  const k = norm(q);
  return norm(e.q).includes(k) || norm(e.a).includes(k) || (!!e.moduleName && norm(e.moduleName).includes(k));
}

export function SearchBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label?: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label || placeholder}</span>
      <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-400" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        enterKeyHint="search"
        className="h-12 w-full rounded-md border border-mist-400 bg-white pl-10 pr-11 text-[16px] text-ink-900 placeholder:text-ink-400 focus:border-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-ink-400 hover:bg-mist-100 hover:text-ink-900"
          aria-label="清除搜尋"
        >
          <IconX className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </label>
  );
}

/** 一題 QA：點題目展開建議回答，回答可一鍵複製 */
export function QaCard({ e, open, showKind }: { e: QaEntry; open: boolean; showKind?: boolean }) {
  return (
    <details className="group rounded-lg border border-mist-300 bg-white transition-colors open:border-mist-400" open={open}>
      <summary className="flex min-h-[52px] cursor-pointer list-none items-start gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-relaxed text-ink-900">{e.q}</span>
          {(e.moduleName || showKind) && (
            <span className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-ink-400">
              {showKind && e.kind === 'objection' && <span className="rounded bg-[#fff3e8] px-1.5 py-0.5 text-[12px] font-medium text-[#8a3b0c]">異議處理</span>}
              {e.moduleName && <span>{e.moduleName}</span>}
            </span>
          )}
        </span>
        <IconChevronDown
          className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="px-4 pb-4">
        <p className="whitespace-pre-line text-[15px] leading-[1.7] text-ink-700">{e.a || '（尚未填寫建議回答）'}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <CopyTextButton text={e.a} />
          {e.href && (
            <Link href={e.href} className="text-[13px] font-medium text-brand-800 underline-offset-4 hover:underline">
              看這個模組的全部 QA
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}

type Tab = 'all' | 'faq' | 'objection';

/** 單一 QA 頁：上方搜尋＋分頁（全部／常見問題／異議處理），題目分兩區列出 */
export function QaBrowser({ entries }: { entries: QaEntry[] }) {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<Tab>('all');
  const query = q.trim();
  const kindOf = (e: QaEntry) => (e.kind === 'objection' ? 'objection' : 'faq');
  const hit = useMemo(() => entries.filter((e) => qaMatches(e, query)), [entries, query]);
  const groups = (['faq', 'objection'] as const)
    .filter((k) => tab === 'all' || tab === k)
    .map((k) => ({ kind: k, list: hit.filter((e) => kindOf(e) === k) }));
  const total = groups.reduce((n, g) => n + g.list.length, 0);
  const count = (k: Tab) => (k === 'all' ? hit.length : hit.filter((e) => kindOf(e) === k).length);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <SearchBox value={q} onChange={setQ} placeholder="搜尋題目或回答" />
        </div>
        <div role="tablist" aria-label="題目類別" className="flex shrink-0 gap-1 rounded-md bg-mist-300/70 p-1">
          {(['all', 'faq', 'objection'] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`h-10 flex-1 whitespace-nowrap rounded px-3 text-[14px] font-medium transition-colors sm:flex-none ${
                tab === k ? 'bg-white text-ink-900' : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {k === 'all' ? '全部' : KIND_TITLE[k]}
              <span className="ml-1.5 tabular-nums text-ink-400">{count(k)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {total === 0 && (
          <p className="rounded-lg border border-dashed border-mist-400 px-4 py-5 text-[15px] text-ink-500">
            {query ? `找不到符合「${query}」的題目。` : '這一類目前沒有題目。'}
          </p>
        )}
        {groups.map(
          (g) =>
            g.list.length > 0 && (
              <section key={g.kind} className="mb-10">
                <h2 className="mb-3 flex items-baseline gap-2 text-[18px] font-bold text-ink-900">
                  {KIND_TITLE[g.kind]}
                  <span className="text-[14px] font-normal tabular-nums text-ink-400">{g.list.length} 題</span>
                </h2>
                <ul className="space-y-2">
                  {g.list.map((e, i) => (
                    <li key={`${g.kind}-${i}`}>
                      <QaCard e={e} open={!!query || g.list.length <= 3} />
                    </li>
                  ))}
                </ul>
              </section>
            ),
        )}
      </div>
    </div>
  );
}
