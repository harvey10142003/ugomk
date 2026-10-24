import { notFound } from 'next/navigation';
import { DeckPlayer } from '@/components/kit/DeckPlayer';
import { KitUnavailable } from '@/components/kit/KitShell';
import { findItem, findModule, loadKit, recordOpen, safeHttpsUrl } from '@/lib/kit';

/** 簡報播放頁：R2 上的簡報以 sandbox iframe 載入（見 components/kit/DeckPlayer.tsx） */
export default async function KitDeckPage({ params }: { params: { token: string; module: string; item: string } }) {
  const r = await loadKit(params.token);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') return <KitUnavailable />;
  const mod = findModule(r.kit, params.module);
  const item = mod ? findItem(mod, params.item, 'deck') : null;
  const src = safeHttpsUrl(item?.entry_url);
  if (!mod || !item || !src) notFound();

  await recordOpen(params.token, item.id);
  return <DeckPlayer src={src} title={item.title} backHref={`/kit/${params.token}/${mod.slug}`} />;
}
