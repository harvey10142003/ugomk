export const site = {
  name: '宇果國際行銷',
  shortName: 'Ugomk',
  /** 系統品牌名 — 全站提到主架構時一律用這個寫法 */
  product: 'UGO AI CRM 會員裂變系統',
  productShort: 'UGO AI CRM',
  tagline: 'LINE CRM、會員裂變與行銷自動化',
  description:
    '宇果協助企業整合 LINE 官方帳號、會員 CRM、點數票券、預約、POS 與行銷自動化。依照產業與營運需求彈性導入，適合餐飲、美業、零售、課程與多分店品牌。',
  footerAbout:
    '宇果國際行銷專注於 LINE 官方帳號、會員 CRM、行銷自動化與產業系統整合。我們從實際的顧客旅程與營運流程出發，協助企業把加入好友、會員互動、預約消費與再次回購，整理成一套真正能執行的系統。',
  url: 'https://ugomk.com',
  locale: 'zh_TW',
  founded: '2024',
  contact: {
    email: 'harvey10142003@gmail.com',
    phone: '+886-910-087-065',
    /** tel: 連結吃國際碼比較保險，畫面顯示用本地格式 */
    phoneDisplay: '0910-087-065',
    address: '高雄市橋頭區成功南路 198 號 1 樓',
    addressStreet: '成功南路 198 號 1 樓',
    addressDistrict: '橋頭區',
    addressCity: '高雄市',
    lineId: '@ugomk',
    lineUrl: 'https://line.me/R/ti/p/%40ugomk',
    facebook: 'https://www.facebook.com/ugomk',
    instagram: 'https://www.instagram.com/ugomk'
  },
  cta: {
    primary: { label: '預約需求討論', href: '/contact' },
    secondary: { label: '查看解決方案', href: '/solutions' }
  }
};

export type NavChild = {
  label: string;
  href: string;
  desc?: string;
  /** 服務內容尚未定稿的項目，暫時導到諮詢頁 */
  pending?: boolean;
};
export type NavItem = { label: string; href: string; children?: NavChild[] };

// 「預約諮詢」不放進 nav — 它已經是 header 右側的主要按鈕，重複出現會稀釋點擊
export const navItems: NavItem[] = [
  { label: '首頁', href: '/' },
  {
    label: '解決方案',
    href: '/solutions',
    children: [
      { label: 'LINE@ 行銷規劃', href: '/services/line-marketing', desc: '導航六步法與導入規劃' },
      { label: 'UGO AI CRM', href: '/solutions', desc: '多模組會員裂變系統' },
      { label: 'LINE@ AI 客服', href: '/solutions/ai_customer_service', desc: '知識庫自動回覆與轉真人' },
      { label: '官網建置', href: '/solutions/website', desc: '品牌官網、文章與 SEO' },
      { label: 'LINE@ 智慧名片', href: '/services/smart-card', desc: 'Flex 圖卡數位名片' },
      { label: 'LINE@ 客製化模組', href: '/services/custom-modules', desc: '現成模組與客製開發' }
    ]
  },
  { label: '費用方案', href: '/pricing' },
  { label: '成功案例', href: '/cases' },
  { label: 'LINE 經營知識', href: '/blog' },
  { label: '關於宇果', href: '/about' }
];

/**
 * 靜態頁最後一次改內容的日期（YYYY-MM-DD），給 sitemap 的 lastmod 用。
 *
 * ⚠️ 不要改回 new Date()。那樣每次部署都在宣稱全站今天全部更新過，
 * Google 對這個站的 lastmod 就會整組停止採信 —— 真的改了內容那次也一起被忽略。
 * 初始值取自各頁 page.tsx 最後一次實際改動的 commit 日期。
 * 改頁面內容時順手把這裡的日期一起改。
 */
export const pageUpdatedAt: Record<string, string> = {
  '': '2026-08-27',
  '/solutions': '2026-08-28',
  '/about': '2026-08-28',
  '/pricing': '2026-08-27',
  '/cases': '2026-08-28',
  '/blog': '2026-07-17',
  '/contact': '2026-08-28',
  '/services/line-marketing': '2026-08-28',
  '/services/smart-card': '2026-08-28',
  '/services/custom-modules': '2026-08-28'
};

export const externalSites = [
  {
    label: 'LINExAI 學院',
    description: 'LINE 行銷課程與經營知識',
    href: 'https://lineai.ugomk.com'
  }
];
