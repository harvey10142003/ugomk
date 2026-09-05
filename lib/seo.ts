import type { Metadata } from 'next';
import { site } from './data/site';

/**
 * 每頁 metadata 的單一產生器。
 *
 * ⚠️ 為什麼一定要走這裡：Next.js 的 metadata 是「繼承」不是「合併」——
 * 子頁沒宣告 alternates.canonical 就整包沿用 root layout 的值，
 * 結果 /pricing、/cases、/contact、/blog 四頁的 canonical 全部指向首頁，
 * 等於自報是首頁的複本；openGraph 也同樣被繼承，30 個頁面共用同一組
 * og:title / og:url。
 *
 * 解法不是「每頁記得寫」（那只是把問題延到下一次新增頁面），
 * 而是讓 canonical 與 OG 由同一個 path 算出來 —— 兩者永遠同源是結構保證。
 */

export const OG_IMAGE = '/og.jpg';

export type PageMetaInput = {
  /** 站內路徑，一律以 / 開頭；首頁傳 '/' */
  path: string;
  /** 頁面標題，不含站名 —— 站名由 layout 的 title.template 補 */
  title: string;
  description: string;
  /** 標題本身已含站名時（例如首頁）用這個覆蓋，避免站名被接兩次 */
  ogTitle?: string;
  /** 預設用全站 og.jpg，文章之類有自己的圖再覆蓋 */
  ogImage?: string;
  ogType?: 'website' | 'article';
  /** ogType='article' 時的補充欄位 */
  article?: { publishedTime?: string; authors?: string[] };
  keywords?: string[];
};

/** 站內路徑 → 絕對網址（首頁不留尾斜線，與 sitemap / JSON-LD 的寫法一致） */
export function absoluteUrl(path: string): string {
  if (!path || path === '/') return site.url;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMeta({
  path,
  title,
  description,
  ogTitle: ogTitleOverride,
  ogImage = OG_IMAGE,
  ogType = 'website',
  article,
  keywords
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  // og:title 不吃 layout 的 title.template，要自己把站名補上，
  // 不然分享出去的標題會跟搜尋結果的標題長得不一樣。
  const ogTitle = ogTitleOverride ?? `${title}｜${site.name}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: site.locale,
      siteName: site.name,
      url,
      title: ogTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
      ...(ogType === 'article' && article ? article : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage]
    }
  };
}
