import { notFound } from 'next/navigation';
import { KitPasswordGate } from '@/components/kit/KitPasswordGate';
import { KitShell, KitUnavailable } from '@/components/kit/KitShell';
import { QaBrowser } from '@/components/kit/QaBrowser';
import { findItem, findModule, loadKit, recordOpen } from '@/lib/kit';

/** 客戶 QA：分「常見問題」「異議處理」兩區，可搜尋。內容一律以文字節點輸出（不 render HTML） */
export default async function KitQaPage({ params }: { params: { token: string; module: string; item: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'password') return <KitPasswordGate token={params.token} />;
  if (r.state === 'unavailable') return <KitUnavailable />;
  const mod = findModule(r.kit, params.module);
  const item = mod ? findItem(mod, params.item, 'qa') : null;
  if (!mod || !item) notFound();

  await recordOpen(params.token, item.id);

  return (
    <KitShell
      backHref={`/kit/${params.token}/${mod.slug}`}
      backLabel={mod.name}
      crumb="客戶 QA"
      title={item.title}
      subtitle={item.summary || '內部用：點題目看建議回答，單題回答可以複製貼給客戶；不要把整份轉給客戶。'}
    >
      <QaBrowser entries={(item.qa ?? []).map((p) => ({ q: p.q, a: p.a, kind: p.kind }))} />
    </KitShell>
  );
}
