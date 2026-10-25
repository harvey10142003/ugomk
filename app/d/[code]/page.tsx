import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { DeckPlayer } from '@/components/kit/DeckPlayer';
import { site } from '@/lib/data/site';
import { isPreviewBot, loadSharedDeck, safeHttpsUrl } from '@/lib/kit';
import { ShareMessage } from '@/components/kit/ShareMessage';

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
    return <ShareMessage title="簡報暫時無法讀取" body="請稍後重新整理。若一直無法開啟，請聯絡提供連結的業務，或用 LINE 洽詢宇果國際行銷。" />;
  }
  const src = safeHttpsUrl(r.deck.item.entry_url);
  if (!src) notFound();
  return <DeckPlayer src={src} title={r.deck.item.title} contactUrl={site.contact.lineUrl} />;
}
