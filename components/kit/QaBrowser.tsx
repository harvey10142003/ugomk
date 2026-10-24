'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';

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

function matches(e: QaEntry, q: string) {
  if (!q) return true;
  const k = norm(q);
  return norm(e.q).includes(k) || norm(e.a).includes(k);
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative mb-4 block">
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-mist-400 bg-white pl-9 pr-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function QaCard({ e, index, open }: { e: QaEntry; index: string; open: boolean }) {
  return (
    <details className="group rounded-xl border border-mist-400 bg-white open:border-brand-300" open={open}>
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span className="mt-0.5 shrink-0 text-sm font-bold text-brand-700">{index}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-relaxed text-ink-900">{e.q}</span>
          {e.moduleName && <span className="mt-0.5 block text-xs text-ink-400">{e.moduleName}</span>}
        </span>
        <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-ink-300 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-mist-300 px-4 pb-4 pt-3">
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">{e.a || '（尚未填寫建議回答）'}</p>
        {e.href && (
          <Link href={e.href} className="mt-2 inline-block text-xs font-medium text-brand-700 hover:underline">
            看這個模組的全部 QA
          </Link>
        )}
      </div>
    </details>
  );
}

/** 單一 QA 頁：分「常見問題」「異議處理」兩區，上方搜尋 */
export function QaBrowser({ entries }: { entries: QaEntry[] }) {
  const [q, setQ] = useState('');
  const groups = useMemo(() => {
    const hit = entries.filter((e) => matches(e, q.trim()));
    return (['faq', 'objection'] as const).map((k) => ({ kind: k, list: hit.filter((e) => (e.kind === 'objection' ? 'objection' : 'faq') === k) }));
  }, [entries, q]);
  const total = groups.reduce((n, g) => n + g.list.length, 0);
  return (
    <div>
      <SearchBox value={q} onChange={setQ} placeholder="搜尋題目或回答" />
      {total === 0 && <p className="rounded-lg border border-mist-400 bg-white px-4 py-6 text-sm text-ink-500">找不到符合「{q}」的題目。</p>}
      {groups.map(
        (g) =>
          g.list.length > 0 && (
            <section key={g.kind} className="mb-8">
              <h2 className="mb-3 text-lg font-bold text-ink-900">
                {KIND_TITLE[g.kind]}
                <span className="ml-2 text-sm font-normal text-ink-400">{g.list.length} 題</span>
              </h2>
              <ol className="space-y-2">
                {g.list.map((e, i) => (
                  <li key={`${g.kind}-${i}`}>
                    <QaCard e={e} index={`${g.kind === 'faq' ? 'Q' : 'O'}${i + 1}`} open={!!q.trim() || g.list.length <= 3} />
                  </li>
                ))}
              </ol>
            </section>
          ),
      )}
    </div>
  );
}

/** 業務資源首頁的全站 QA 搜尋：沒打字時不顯示結果 */
export function KitQaSearch({ entries }: { entries: QaEntry[] }) {
  const [q, setQ] = useState('');
  const query = q.trim();
  const hits = useMemo(() => (query ? entries.filter((e) => matches(e, query)).slice(0, 30) : []), [entries, query]);
  if (entries.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-lg font-bold text-ink-900">搜尋客戶 QA</h2>
      <SearchBox value={q} onChange={setQ} placeholder={`在 ${entries.length} 題常見問題與異議處理中搜尋`} />
      {query && hits.length === 0 && <p className="rounded-lg border border-mist-400 bg-white px-4 py-4 text-sm text-ink-500">找不到符合「{query}」的題目。</p>}
      {hits.length > 0 && (
        <ol className="space-y-2">
          {hits.map((e, i) => (
            <li key={`${e.href}-${i}`}>
              <QaCard e={e} index={e.kind === 'objection' ? '異議' : 'Q'} open={false} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
