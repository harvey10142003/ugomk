export type CaseStudy = {
  id: string;
  name: string;
  industry: string;
  problem: string;
  summary: string;
  flow: string;
  modules: string[];
  outcome: string;
  accent: 'brand' | 'mint' | 'ink';
};

export const cases: CaseStudy[] = [
  {
    id: 'gso',
    name: '小聚所',
    industry: '課程與體驗活動',
    problem: '線下活動的報名、簽到與名單分散在不同工具，活動結束後沒有後續追蹤，參與者慢慢失去聯繫。',
    summary:
      '將活動報名、會員資料、簽到、提醒與活動後回訪整合進 LINE，讓每一位參與者都能持續被經營，而不是活動結束後就失去聯繫。',
    flow: '報名、簽到、活動提醒與活動後回訪都在 LINE 內完成，每一位參與者自動回到會員系統，成為下一次活動的邀請名單。',
    modules: ['會員 / 標籤', '課程報名', '聯絡簿', '行銷自動化'],
    outcome: '報名表單直接在 LINE 內填寫、提醒自動發送，活動填表完成率提升、客服重複問題收斂。',
    accent: 'brand'
  },
  {
    id: 'finnail',
    name: '菲韻美甲',
    industry: '美業與多分店管理',
    problem: '預約、結帳、儲值與分店權限分散在不同工具，現場人員需要在不同系統之間重複操作。',
    summary:
      '整合線上預約、設計師班表、POS 結帳、會員儲值與分店權限，減少現場人員在不同系統之間重複操作。',
    flow: '顧客在 LINE 完成預約後自動進入設計師班表，現場以平板結帳並扣儲值金，各分店資料依權限分流。',
    modules: ['美業預約', 'POS 收銀', '儲值金', '行銷自動化', '分店專屬登入'],
    outcome: '一套後台管理多分店，預約、結帳、會員資料與推播提醒接成一條流程，現場作業回到同一台平板上。',
    accent: 'mint'
  },
  {
    id: 'yu13',
    name: '御十三餐酒館',
    industry: '帶客與業績管理',
    problem: '帶客紀錄與績效以人工計算，容易算錯，也難以即時掌握每位服務人員的實際業績。',
    summary:
      '透過專屬 QR Code 記錄顧客來源，串接會員與現場結帳流程，讓帶客紀錄與績效計算更加清楚。',
    flow: '顧客掃描服務人員專屬 QR Code 加入好友即綁定來源，現場結帳時系統自動計算對應績效。',
    modules: ['帶客績效', 'POS 餐飲', '廚房出單螢幕', '會員 + 點數'],
    outcome: '帶客業績透明、顧客來源一掃即綁定，現場結帳當下就完成績效計算。',
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
