/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' }
    ]
  },
  async rewrites() {
    // 未對外公開的提案頁（進銷存 ERP 說明）。檔案放在 public/p/<slug>/index.html，
    // 這條只是讓網址不必帶 index.html；它不在 sitemap、站內沒有任何連結。
    // 2026-09-22 起另放三份內部教材（零售與進銷存操作手冊／練習劇本／示範 Runbook），同樣規則。
    // 2026-09-24 加一份給意向客戶看的產品功能與串接說明（platform-4ar69s），同樣規則。
    return ['erp-a7f3c1', 'retail-handbook-76ff92', 'retail-drill-ff551a', 'demo-runbook-5d42a0', 'platform-4ar69s'].map((slug) => ({
      source: `/p/${slug}`,
      destination: `/p/${slug}/index.html`
    }));
  },
  async headers() {
    // 靜態檔吃不到 Next 的 metadata，所以 noindex 走回應標頭再保一層
    //（頁面 <head> 裡也有 meta robots，兩邊同時宣告才不會因為其中一邊漏掉就被收錄）。
    return [
      {
        source: '/p/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }]
      }
    ];
  },
  async redirects() {
    return [
      // 功能介紹頁改版為「解決方案」。舊網址已被索引、也可能出現在既有文宣裡，
      // 用 308 永久轉址把權重與流量帶過去，不讓舊連結變 404。
      { source: '/features', destination: '/solutions', permanent: true }
    ];
  }
};

module.exports = nextConfig;
