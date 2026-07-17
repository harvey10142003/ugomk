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
  themeColor: '#06C755',
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
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url }
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
