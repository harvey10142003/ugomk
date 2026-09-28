import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import { OutboundClickTracker } from '@/components/OutboundClickTracker';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { site } from '@/lib/data/site';
import './fonts.css';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#04566B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}｜${site.tagline}`, template: `%s｜${site.name}` },
  description: site.description,
  keywords: [
    'LINE CRM',
    'LINE 會員系統',
    'LINE 行銷',
    'LINE 官方帳號',
    '會員經營',
    '行銷自動化',
    'POS 系統',
    '多分店管理',
    '宇果國際行銷'
  ],
  // ⚠️ 這裡只放「全站共用且與頁面無關」的欄位。
  // url / canonical 一旦寫在這一層，所有沒自己宣告的子頁都會沿用它，
  // 結果每一頁都自報是首頁的複本 —— 那兩個欄位一律由 lib/seo.ts 的 pageMeta() 逐頁產出。
  openGraph: {
    type: 'website',
    locale: site.locale,
    title: site.name,
    description: site.description,
    siteName: site.name,
    // 原本宣告了 summary_large_image 卻沒給圖，分享出去只有純文字
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: `${site.name}｜${site.product}` }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/og.jpg']
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className="font-vars">
      <head>
        {/*
          首屏一定用到的兩個字型先開始下載，不等 CSS 解析完才發現：
          內文 400（全站都用）與標題襯線子集（36KB）。字晚到會讓首屏換行位置跳動（CLS）。
          700 不預載 —— 它多半只在按鈕與小標，晚一點到的代價小，預載反而跟首屏資源搶頻寬。
        */}
        <link rel="preload" href="/fonts/body/noto-sans-tc-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/site/fonts/serif-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* GTM 的 noscript 備援要在 body 的最前面（官方要求）；未設容器 ID 時不渲染 */}
        <GoogleTagManagerNoScript />
        <JsonLd data={[organizationLd, websiteLd]} />
        {/* 全站 LINE / 電話 / Email 點擊追蹤 —— 委派式，不需要逐頁改 CTA */}
        <OutboundClickTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleTagManager />
      </body>
    </html>
  );
}
