import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { KitQaSearch, type QaEntry } from '@/components/kit/QaBrowser';
import { ITEM_TYPE_LABEL, loadKit, type KitItemType } from '@/lib/kit';

/** 業務資源首頁：這個連結看得到的模組清單 */
export default async function KitHome({ params }: { params: { token: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') return <KitUnavailable />;
  const { kit } = r;
  const base = `/kit/${params.token}`;
  // 全站 QA 搜尋的資料（伺服器端攤平；搜尋在瀏覽器做）
  const qaEntries: QaEntry[] = kit.modules.flatMap((m) =>
    m.items
      .filter((i) => i.type === 'qa')
      .flatMap((i) => (i.qa ?? []).map((p) => ({ q: p.q, a: p.a, kind: p.kind, moduleName: m.name, href: `${base}/${m.slug}/qa/${i.id}` }))),
  );

  return (
    <KitShell
      title="產品資源"
      subtitle="各產品模組的簡報、客戶 QA、DM 與分享圖卡。這是業務內部用的網址，請不要轉給客戶；要給客戶看，請用每份簡報的「客戶分享連結」。"    >
      <KitQaSearch entries={qaEntries} />
      {qaEntries.length > 0 && kit.modules.length > 0 && <h2 className="mb-3 text-lg font-bold text-ink-900">產品模組</h2>}
      {kit.modules.length === 0 ? (
        <p className="rounded-lg border border-mist-400 bg-white px-4 py-6 text-sm text-ink-500">目前還沒有可以看的模組。</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {kit.modules.map((m) => {
            const counts = (['deck', 'qa', 'dm', 'card'] as KitItemType[])
              .map((t) => ({ t, n: m.items.filter((i) => i.type === t).length }))
              .filter((x) => x.n > 0);
            return (
              <li key={m.id}>
                <Link
                  href={`${base}/${m.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-mist-400 bg-white p-4 transition-colors hover:border-brand-300"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-base font-bold text-ink-900">{m.name}</span>
                    <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-ink-300 group-hover:text-brand-600" aria-hidden="true" />
                  </span>
                  {m.summary && <span className="mt-1 line-clamp-3 text-sm leading-relaxed text-ink-500">{m.summary}</span>}
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {counts.length === 0 ? (
                      <span className="text-xs text-ink-400">素材準備中</span>
                    ) : (
                      counts.map(({ t, n }) => (
                        <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                          {ITEM_TYPE_LABEL[t]} {n}
                        </span>
                      ))
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </KitShell>
  );
}
