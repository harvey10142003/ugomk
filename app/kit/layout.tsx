import type { Metadata } from 'next';

/**
 * 業務資源網站外框（2026-10-24 第一期）
 *
 * - 不讓搜尋引擎收錄：meta robots（這裡）＋回應標頭 X-Robots-Tag（next.config.js 的 /kit/:path*）兩邊都宣告。
 * - Referrer 一律不送：網址裡有通行證，點出去（R2 檔案、簡報）不能把它帶到別的網站。
 * - 不在 sitemap、官網沒有任何連結；官網頁首／頁尾／GTM 在這裡不顯示（components/SiteChrome.tsx）。
 * - 字型：系統黑體（蘋方／微軟正黑體／Noto Sans CJK），不下載網路字型。
 */
export const metadata: Metadata = {
  title: { absolute: '業務資源｜宇果國際行銷' },
  description: '',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: 'no-referrer',
  openGraph: null,
  twitter: null,
  alternates: { canonical: null },
};

export const dynamic = 'force-dynamic';

export default function KitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-mist-100 text-ink-900"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
