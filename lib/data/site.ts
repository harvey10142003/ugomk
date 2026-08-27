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
    email: 'shark@ugomk.com',
    phone: '+886-910-087-065',
    address: '高雄市 · Kaohsiung, Taiwan',
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
      { label: 'LINE@ 行銷規劃', href: '/contact', desc: '導航式行銷策略與導入規劃', pending: true },
      { label: 'UGO AI CRM', href: '/solutions', desc: '多模組會員裂變系統' },
      { label: 'LINE@ AI 客服', href: '/solutions/ai_customer_service', desc: '知識庫自動回覆與轉真人' },
      { label: '官網建置', href: '/solutions/website', desc: '品牌官網、文章與 SEO' },
      { label: 'LINE@ 智慧名片', href: '/contact', desc: '電子名片與人脈經營', pending: true },
      { label: 'LINE@ 客製化模組', href: '/contact', desc: '依實際流程量身開發', pending: true }
    ]
  },
  { label: '費用方案', href: '/pricing' },
  { label: '成功案例', href: '/cases' },
  { label: 'LINE 經營知識', href: '/blog' },
  { label: '關於宇果', href: '/about' }
];

export const externalSites = [
  {
    label: 'LINExAI 學院',
    description: 'LINE 行銷課程與經營知識',
    href: 'https://lineai.ugomk.com'
  }
];
