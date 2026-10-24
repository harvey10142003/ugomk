import { notFound } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { findItem, findModule, loadKit, recordOpen } from '@/lib/kit';

/** 客戶 QA：題目＋建議回答。內容一律以文字節點輸出（不 render HTML） */
export default async function KitQaPage({ params }: { params: { token: string; module: string; item: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') return <KitUnavailable />;
  const mod = findModule(r.kit, params.module);
  const item = mod ? findItem(mod, params.item, 'qa') : null;
  if (!mod || !item) notFound();

  await recordOpen(params.token, item.id);
  const pairs = item.qa ?? [];

  return (
    <KitShell backHref={`/kit/${params.token}/${mod.slug}`} backLabel={mod.name} eyebrow="客戶 QA" title={item.title} subtitle={item.summary}>
      <ol className="space-y-2">
        {pairs.map((p, i) => (
          <li key={i}>
            <details className="group rounded-xl border border-mist-400 bg-white open:border-brand-300" open={pairs.length <= 3}>
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 shrink-0 text-sm font-bold text-brand-700">Q{i + 1}</span>
                <span className="min-w-0 flex-1 text-sm font-bold leading-relaxed text-ink-900">{p.q}</span>
                <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-ink-300 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="border-t border-mist-300 px-4 pb-4 pt-3">
                <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">{p.a || '（尚未填寫建議回答）'}</p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </KitShell>
  );
}
