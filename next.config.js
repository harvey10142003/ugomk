/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      // 業務資源網站的模組縮圖（圖卡／DM 原檔在 R2）：只放行這個 bucket 的 sales-kit/ 路徑，
      // 不開 *.r2.dev（否則誰的 R2 都能拿我們的伺服器當縮圖代理）。與 lib/kit-media.ts 的 KIT_IMAGE_HOSTS 一致。
      { protocol: 'https', hostname: 'pub-5f2592935ed445a8a9c1c543a6380c1d.r2.dev', pathname: '/sales-kit/**' }
    ],
    formats: ['image/webp'],
    // R2 上的素材檔名帶時間戳與亂數（換檔就換網址），縮圖可以放心快取一天，不必每分鐘重算
    minimumCacheTTL: 86400
  },
  async rewrites() {
    // 未對外公開的提案頁（進銷存 ERP 說明）。檔案放在 public/p/<slug>/index.html，
    // 這條只是讓網址不必帶 index.html；它不在 sitemap、站內沒有任何連結。
    // 2026-09-22 起另放三份內部教材（零售與進銷存操作手冊／練習劇本／示範 Runbook），同樣規則。
    // 2026-09-24 加一份給意向客戶看的產品功能與串接說明（platform-4ar69s），同樣規則。
    // 2026-10-16 加幸福腦 App 系統規劃書（hb-hgeqxyffnuyb，含可操作的畫面原型），同樣規則。
    // 2026-10-19 加幸福腦年度 LINE 行銷規劃（hb-plan-z4ocaczd），同樣規則。新增 /p/<slug> 一定要把 slug 加進這裡，否則短網址 404。
    // 2026-10-19 加 BNI 年會 INW 系統介紹網頁簡報（inw-deck-mrqrjb0x），同樣規則。
    // 2026-10-20 加上海 2026 玩具展行程（sh2026-8d7ace44），同樣規則。
    return ['erp-a7f3c1', 'retail-handbook-76ff92', 'retail-drill-ff551a', 'demo-runbook-5d42a0', 'platform-4ar69s', 'hb-hgeqxyffnuyb', 'hb-plan-z4ocaczd', 'inw-deck-mrqrjb0x', 'sh2026-8d7ace44'].map((slug) => ({
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
      },
      // 業務資源網站（2026-10-24）：網址裡就是通行證 —— 不收錄、不快取、不帶 Referer 出去、不准被別的網站框住。
      // 頁面本身（app/kit/layout.tsx）也宣告 meta robots／referrer，兩邊同時宣告。
      // 簡報客戶分享頁（2026-10-24 第二期）：同一組規則
      ...['/kit/:path*', '/d/:path*'].map((source) => ({
        source,
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" }
        ]
      }))
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
