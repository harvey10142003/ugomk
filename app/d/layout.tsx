import type { Metadata } from 'next';

/**
 * 簡報客戶分享頁外框（2026-10-24 第二期，ugomk.com/d/<code>）
 *
 * 業務直接傳給客戶的網址：只全螢幕播一份簡報。不收錄（meta＋X-Robots-Tag）、不送 Referer、
 * 官網頁首頁尾與 GTM 不顯示（components/SiteChrome.tsx），系統黑體。og 標題／描述／圖由頁面依簡報產生。
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: 'no-referrer',
  alternates: { canonical: null },
};

export const dynamic = 'force-dynamic';

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-ink-900 text-ink-900"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC", "Noto Sans TC", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
