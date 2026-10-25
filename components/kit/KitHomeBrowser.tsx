'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { QuickShare } from '@/components/kit/actions';
import { KitImage } from '@/components/kit/KitImage';
import { QaCard, SearchBox, qaMatches, type QaEntry } from '@/components/kit/QaBrowser';
import { IconChevronRight } from '@/components/kit/icons';

/**
 * 業務資源首頁（2026-10-25 UI v2）：一個搜尋框（模組＋客戶 QA）、一排分類、依分類分區的模組卡。
 *
 * 這一頁要回答的一件事：「客戶要的那個模組在哪，我怎麼最快傳給他？」
 * ⇒ 模組卡是畫面上最大的東西，卡上有縮圖（認得出是哪個模組）與「複製連結／LINE 傳送」（最常做的事一下就到）。
 */

export interface HomeModule {
  slug: string;
  name: string;
  summary: string;
  categoryId: string;
  thumb: string | null;
  /** 模組專屬縮圖（3:2、圖上有模組名稱）；有的話完整顯示、不裁上方，桌機卡片不再重複印名稱 */
  ownThumb: string | null;
  /** 這個模組有什麼素材（給卡片上的灰字一行） */
  meta: string;
  deck: { title: string; shareUrl: string | null } | null;
}

export interface HomeCategory {
  id: string;
  label: string;
}

function norm(s: string) {
  return s.toLowerCase().replace(/\s+/g, '');
}

export function KitHomeBrowser({
  base,
  modules,
  categories,
  qa,
}: {
  base: string;
  modules: HomeModule[];
  categories: HomeCategory[];
  qa: QaEntry[];
}) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');
  const query = q.trim();

  const shown = useMemo(() => {
    const k = norm(query);
    return modules.filter((m) => (cat === 'all' || m.categoryId === cat) && (!k || norm(m.name).includes(k) || norm(m.summary).includes(k)));
  }, [modules, cat, query]);

  const qaHits = useMemo(() => (query ? qa.filter((e) => qaMatches(e, query)) : []), [qa, query]);

  // 依分類排序成一整片格子（不切分區：小分類只有 1 個模組時，分區會留下整排空白）；分類寫在卡片上，用上方分類鈕篩選
  const order = new Map(categories.map((c, i) => [c.id, i]));
  const labelOf = new Map(categories.map((c) => [c.id, c.label]));
  const sorted = [...shown].sort((a, b) => (order.get(a.categoryId) ?? 99) - (order.get(b.categoryId) ?? 99));
  const activeLabel = cat === 'all' ? '全部模組' : labelOf.get(cat) ?? '模組';

  const countIn = (id: string) => modules.filter((m) => m.categoryId === id).length;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 bg-mist-100 px-4 pb-3 pt-3 sm:-mx-8 sm:px-8">
        <SearchBox value={q} onChange={setQ} placeholder={`搜尋模組或客戶問題（${qa.length} 題 QA）`} label="搜尋模組或客戶 QA" />
        <div className="-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="模組分類" className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap">
            {[{ id: 'all', label: '全部' }, ...categories].map((c) => {
              const active = cat === c.id;
              const n = c.id === 'all' ? modules.length : countIn(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.id)}
                  className={`inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[14px] font-medium transition-colors ${
                    active ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 ring-1 ring-inset ring-mist-400 hover:ring-ink-300'
                  }`}
                >
                  {c.label}
                  <span className={`tabular-nums ${active ? 'text-white/70' : 'text-ink-400'}`}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {query && (
        <p className="mt-3 text-[14px] text-ink-500" aria-live="polite">
          「{query}」：模組 <span className="tabular-nums">{shown.length}</span> 個、客戶 QA <span className="tabular-nums">{qaHits.length}</span> 題
        </p>
      )}

      <section className="mt-6" aria-labelledby="mods-h">
        <h2 id="mods-h" className="mb-3 flex items-baseline gap-2 text-[18px] font-bold text-ink-900">
          {activeLabel}
          <span className="text-[14px] font-normal tabular-nums text-ink-400">{sorted.length}</span>
        </h2>
        {sorted.length === 0 ? (
          <p className="rounded-lg border border-dashed border-mist-400 px-4 py-5 text-[15px] text-ink-500">
            {modules.length === 0 ? '目前還沒有可以看的模組。' : '沒有符合的模組。'}
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {sorted.map((m, i) => (
              <li key={m.slug}>
                <ModuleCard m={m} href={`${base}/${m.slug}`} category={labelOf.get(m.categoryId) ?? ''} priority={i < 3} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {qaHits.length > 0 && (
        <section className="mt-10" aria-labelledby="qa-hits">
          <h2 id="qa-hits" className="mb-3 flex items-baseline gap-2 text-[18px] font-bold text-ink-900">
            客戶 QA
            <span className="text-[14px] font-normal tabular-nums text-ink-400">{qaHits.length} 題</span>
          </h2>
          <ul className="space-y-2">
            {qaHits.slice(0, 40).map((e, i) => (
              <li key={`${e.href}-${i}`}>
                <QaCard e={e} open={false} showKind />
              </li>
            ))}
          </ul>
          {qaHits.length > 40 && <p className="mt-3 text-[14px] text-ink-500">只列前 40 題，請再多打幾個字縮小範圍。</p>}
        </section>
      )}
    </div>
  );
}

/**
 * 模組卡：手機是一列（左縮圖、右文字＋分享鈕），平板以上是直式卡（上縮圖 3:2，取上方主視覺）。
 * 縮圖與名稱連到模組頁；分享鈕不在連結裡（避免巢狀互動元素）。
 */
function ModuleCard({ m, href, category, priority }: { m: HomeModule; href: string; category: string; priority: boolean }) {
  const own = !!m.ownThumb && m.thumb === m.ownThumb;
  return (
    <article className="group flex h-full gap-3 rounded-lg border border-mist-300 bg-white p-3 transition-colors hover:border-mist-400 sm:flex-col sm:gap-0 sm:p-0">
      <Link
        href={href}
        {...(own ? { 'aria-label': m.name } : { tabIndex: -1, 'aria-hidden': true })}
        className="block shrink-0 sm:overflow-hidden sm:rounded-t-lg"
      >
        <KitImage
          src={m.thumb}
          position={own ? 'center' : 'top'}
          alt=""
          fallbackLabel={m.name}
          sizes="(max-width: 639px) 112px, (max-width: 1023px) 46vw, 380px"
          priority={priority}
          className="h-[75px] w-[112px] rounded-md sm:aspect-[3/2] sm:h-auto sm:w-full sm:rounded-none [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.03] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col sm:p-4">
        {/* 有專屬縮圖時，桌機的名稱已在圖上 ⇒ 只留給螢幕閱讀器；手機縮圖太小讀不到圖上的字，照常顯示 */}
        {own && <h3 className="sr-only hidden sm:block">{m.name}</h3>}
        <h3 className={`text-[16px] font-bold leading-snug text-ink-900 ${own ? 'sm:hidden' : ''}`}>
          <Link href={href} className="inline-flex items-start gap-1 hover:text-brand-800">
            <span>{m.name}</span>
            <IconChevronRight className="mt-[3px] h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </h3>
        {m.summary && <p className={`mt-1 line-clamp-2 text-[14px] leading-relaxed text-ink-500 ${own ? 'sm:mt-0' : ''}`}>{m.summary}</p>}
        <p className="mt-1.5 text-[13px] text-ink-400">
          <span className="text-brand-800">{category}</span>
          <span aria-hidden="true">・</span>
          {m.meta}
        </p>
        <div className="mt-auto pt-3">{m.deck ? <QuickShare title={m.deck.title} shareUrl={m.deck.shareUrl} /> : <p className="text-[13px] text-ink-400">尚無簡報</p>}</div>
      </div>
    </article>
  );
}
