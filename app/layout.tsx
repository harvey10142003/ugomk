import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { site } from '@/lib/data/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap'
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-tc',
  display: 'swap'
});

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
    <html lang="zh-Hant-TW" className={`${inter.variable} ${notoSansTC.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={[organizationLd, websiteLd]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
