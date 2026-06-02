export type Plan = {
  id: string;
  name: string;
  caption: string;
  price: string;
  priceSuffix: string;
  description: string;
  highlight?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

export const plans: Plan[] = [
  {
    id: 'starter',
    name: '入門 Starter',
    caption: '單店初次導入',
    price: 'NT$ 1,980',
    priceSuffix: ' / 月',
    description: '剛開始把 LINE@ 變成 CRM 的店家。包含會員 / 點數 / 推播三件套。',
    features: [
      '單一分店',
      '會員 / 等級 / 標籤',
      '點數累積與兌換',
      '基本群發推播',
      '線上說明手冊'
    ],
    cta: { label: '開始使用', href: '/contact' }
  },
  {
    id: 'growth',
    name: '成長 Growth',
    caption: '已有穩定客流，想自動化',
    price: 'NT$ 3,980',
    priceSuffix: ' / 月',
    description: '最受歡迎方案。把行銷自動化任務、推薦機制、動態圖文選單一次全開。',
    highlight: true,
    features: [
      '多分店（最多 3 間）',
      '行銷自動化任務引擎',
      'MGM 推薦碼 / 分享連結',
      '動態圖文選單',
      '抽獎範本 × 4',
      '問卷表單 + 標籤自動綁'
    ],
    cta: { label: '預約導入諮詢', href: '/contact' }
  },
  {
    id: 'pro',
    name: '專業 Pro',
    caption: '已有 POS 或多店連鎖',
    price: 'NT$ 8,800',
    priceSuffix: ' 起 / 月',
    description: '把產業包與 POS 串起來，後台、店端、會員端三邊都跑在自己系統上。',
    features: [
      '無限分店',
      'POS（零售 / 餐飲 / 美業）',
      '產業包（預約 / 補習班 / 宮廟）',
      '儲值金 + 點數商城',
      '客製模組開發（議價）',
      '優先支援與 SLA'
    ],
    cta: { label: '聯繫業務', href: '/contact' }
  }
];

export const billingNote =
  '所有方案皆含 LINE OA Webhook 串接、LIFF 一鍵發布、線上手冊與基礎 onboarding。實際金額依需求微調，三方金流串接與客製模組另計。';
