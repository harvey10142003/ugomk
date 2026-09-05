export type Plan = {
  id: string;
  name: string;
  caption: string;
  /** 畫面上顯示的價格字串 */
  price: string;
  /** 同一個價格的數值形式 —— 結構化資料要的是數字，不要在 jsonld 再寫死一次 */
  priceValue: number;
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
    priceValue: 1980,
    priceSuffix: ' / 月',
    description: '適合想建立基本會員與點數制度的單店品牌。包含會員資料、標籤、等級、點數與基本推播功能。',
    features: [
      '單一分店',
      '會員 / 等級 / 標籤',
      '點數累積與兌換',
      '基本群發推播',
      '線上說明手冊'
    ],
    cta: { label: '詢問入門方案', href: '/contact' }
  },
  {
    id: 'growth',
    name: '成長 Growth',
    caption: '已有穩定客流，想提升回購',
    price: 'NT$ 3,980',
    priceValue: 3980,
    priceSuffix: ' / 月',
    description: '適合想提升回購、減少人工推播與發展會員推薦的企業。加入行銷自動化、推薦機制、動態圖文選單、問卷標籤與互動活動。',
    highlight: true,
    features: [
      '多分店（最多 3 間）',
      '行銷自動化（自動跟進會員）',
      '推薦碼 / 分享連結',
      '動態圖文選單',
      '抽獎範本 × 4',
      '問卷表單 + 標籤自動綁'
    ],
    cta: { label: '預約方案評估', href: '/contact' }
  },
  {
    id: 'pro',
    name: '專業 Pro',
    caption: '多分店 / POS / 系統串接',
    price: 'NT$ 8,800',
    priceValue: 8800,
    priceSuffix: ' 起 / 月',
    description: '適合多分店、需要 POS、產業流程或系統串接的企業。依照實際營運需求組合功能，並可評估客製模組與 API 串接。',
    features: [
      '無限分店',
      'POS（零售 / 餐飲 / 美業）',
      '產業模組（預約 / 補習班 / 宮廟）',
      '儲值金 + 點數商城',
      '客製模組開發（依需求評估）',
      '優先支援與服務保證'
    ],
    cta: { label: '討論專業導入', href: '/contact' }
  }
];

/**
 * /pricing 的常見問題。
 *
 * 抽出來是因為同一份內容要餵兩個地方：畫面上的 accordion 與 FAQPage 結構化資料。
 * 寫在 JSX 裡的話，schema 只能再抄一份，兩邊遲早對不上。
 */
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: '可以中途升級 / 降級嗎？',
    a: '可以。會員與營運資料完整保留，功能依方案調整，費用差額按比例計算。'
  },
  {
    q: '需要自己準備伺服器嗎？',
    a: '不用。主機、資料庫與 LINE 串接都由我們建置與維運，你只需要有自己的 LINE 官方帳號。'
  },
  {
    q: '客製開發要怎麼算？',
    a: '專業方案可依實際需求評估客製開發；多數需求其實用既有功能調整設定就能完成，我們會先協助確認。'
  },
  {
    q: '資料安全與備份？',
    a: '資料每日自動備份並保留 14 天；系統權限依總部、店長、店員與收銀人員分流，避免跨權限存取。'
  }
];

/** 方案價格區間 —— 給 AggregateOffer 用，數字一律從 plans 算，不另外寫死 */
export const priceRange = {
  low: Math.min(...plans.map((p) => p.priceValue)),
  high: Math.max(...plans.map((p) => p.priceValue)),
  count: plans.length,
  currency: 'TWD'
};

export const billingNote =
  '所有方案皆包含 LINE 官方帳號基本串接、系統設定與操作說明。第三方金流、簡訊、LINE 訊息費與客製開發費用另計，實際內容依導入需求確認。';
