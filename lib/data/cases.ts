export type CaseStudy = {
  id: string;
  name: string;
  industry: string;
  summary: string;
  modules: string[];
  outcome: string;
  accent: 'brand' | 'mint' | 'ink';
};

export const cases: CaseStudy[] = [
  {
    id: 'gso',
    name: '小聚所',
    industry: '社群課程 / 體驗活動',
    summary: 'CRM 10 大基礎模組 + 課程報名（course_enrollment）+ 補習班模組，把線下社群活動的報名、簽到、回訪全收進 LINE@。',
    modules: ['會員 / 標籤', '課程報名', '補習班聯絡簿', '行銷自動化'],
    outcome: '報名表單 LIFF 化、自動發送提醒，活動填表轉化率提升、客服重複問題收斂。',
    accent: 'brand'
  },
  {
    id: 'finnail',
    name: '菲韻美甲',
    industry: '美業（多分店 / 跨夜店）',
    summary: '美業預約 + POS + 指定設計師加價 + 儲值金確認制扣款；跨夜營運的業務日切換時間設定。',
    modules: ['美業預約', 'POS 收銀', '儲值金', '行銷自動化', '分店專屬登入'],
    outcome: '一套後台跑多分店、預約 / 結帳 / 會員資料 / 推播自動化一條龍，現場 POS 走平板。',
    accent: 'mint'
  },
  {
    id: 'yu13',
    name: '御十三餐酒館',
    industry: '餐酒館 / 公關帶客',
    summary: '餐酒館公關（bar_hostess）模組：公關 QR 帶客、戰績即時看板、POS 帶 hostess 績效抽成。',
    modules: ['餐酒館公關', 'POS 餐飲', 'KDS 廚房螢幕', '會員 + 點數'],
    outcome: '公關業績透明、客人加好友 QR 一鍵綁定，現場結帳即計算公關抽成。',
    accent: 'ink'
  }
];

export const clientLogos = [
  { name: '小聚所', initial: '聚' },
  { name: '菲韻美甲', initial: '菲' },
  { name: '御十三餐酒館', initial: '御' },
  { name: 'BNI 富聯白金', initial: 'B' },
  { name: 'LINExAI 學院', initial: 'AI' }
];
