import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { DeckPlayer } from '@/components/kit/DeckPlayer';
import { isPreviewBot, loadSharedDeck, safeHttpsUrl } from '@/lib/kit';

/**
 * 簡報客戶分享頁：分享碼對得到才播，其餘（停用、不存在、模組下架、未發布）一律同一個 404。
 * 簡報以 sandbox iframe 載 R2（見 components/kit/DeckPlayer.tsx）。真人瀏覽才記一筆 open（LINE 預覽爬蟲不算）。
 */
type Props = { params: { code: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 預覽用的 metadata 不記瀏覽
  const r = await loadSharedDeck(params.code, false);
  if (r.state !== 'ok') return { title: { absolute: '宇果國際行銷' } };
  const { item } = r.deck;
  const image = safeHttpsUrl(r.deck.og_image);
  return {
    title: { absolute: `${item.title}｜宇果國際行銷` },
    description: item.summary || undefined,
    openGraph: {
      type: 'website',
      title: item.title,
      description: item.summary || undefined,
      siteName: '宇果國際行銷',
      locale: 'zh_TW',
      images: image ? [{ url: image, width: 1080, height: 1350, alt: item.title }] : [],
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: item.title, description: item.summary || undefined, images: image ? [image] : [] },
  };
}

export default async function SharedDeckPage({ params }: Props) {
  const record = !isPreviewBot(headers().get('user-agent'));
  const r = await loadSharedDeck(params.code, record);
  if (r.state === 'not_found') notFound();
  if (r.state === 'unavailable') {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center text-white/80">
        <p className="text-sm">簡報暫時無法讀取，請稍後重新整理。</p>
      </div>
    );
  }
  const src = safeHttpsUrl(r.deck.item.entry_url);
  if (!src) notFound();
  return <DeckPlayer src={src} title={r.deck.item.title} />;
}
