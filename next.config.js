/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' }
    ]
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
