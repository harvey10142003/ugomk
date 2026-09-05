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
  /** 情境照（Unsplash 免費授權，可商用、免標註）— 是產業情境示意，不是客戶實景 */
  image: string;
};

export const cases: CaseStudy[] = [
  {
    id: 'gso',
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1000&h=700&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?w=1000&h=700&fit=crop&q=80',
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
    id: 'yadianzhan',
    image: 'https://images.unsplash.com/photo-1592915890261-c96701c071f6?w=1000&h=700&fit=crop&q=80',
    name: '鴨點棧 烤鴨專賣',
    industry: '烤鴨專賣與多分店餐飲',
    problem: '五間分店共用一個 LINE 官方帳號，訂位分別來自電話、現場與線上；烤鴨需要提前備料，但訂位當下沒有地方記錄客人要幾隻。',
    summary:
      '把多店訂位、桌位安排、POS 點餐、廚房出單與電子發票整合成同一套流程，訂位的時候就把烤鴨數量記進單子裡。',
    flow: '顧客在 LINE 訂位並選擇烤鴨數量，資料直接進入該分店的訂位列表與桌位時間表；現場 POS 送單後各廚房出單站同時收到，結帳完成開立電子發票。',
    modules: ['餐飲 POS', '餐飲訂位', '發票管理', '連鎖運營', '會員 / 標籤'],
    outcome: '五間分店在同一套後台運作，三種訂位管道統一檢視；備料需求在訂位當下就記錄下來，不必再另外用電話交代。',
    accent: 'brand'
  },
  {
    id: 'princemom',
    image: 'https://images.unsplash.com/photo-1565598571120-4081876df4f7?w=1000&h=700&fit=crop&q=80',
    name: '王子娘',
    industry: '創業課程與顧問服務',
    problem: '課程報名、學員名單與後續聯繫散在表單與通訊軟體之間，開課前要人工整理，課後也難以追蹤誰上過哪幾門課。',
    summary:
      '課程開課、報名、報到與學員歷程收進 LINE，並用同一套系統建立品牌官網，官網收到的詢問直接回到會員資料。',
    flow: '學員在 LINE 內看課表報名，現場掃 QR 完成報到，完課紀錄留在同一筆會員資料；官網表單的詢問名單也進到同一份名單。',
    modules: ['課程報名', '會員 / 標籤', '官網建置'],
    outcome: '報名到報到都在 LINE 完成，不必另外發表單；官網與會員系統同源，詢問名單不用手動搬。',
    accent: 'ink'
  }
];

/**
 * 只放「外部客戶、而且正在用 UGO AI CRM 營運」的品牌。
 *
 * ⚠️ 曾經多放了 BNI 富聯白金與 LINExAI 學院：前者是顧問身分服務的分會、
 * 後者是自家站，都不是系統的客戶。多兩格帶來的說服力，遠低於被看穿的代價。
 */
export const clientLogos = [
  { name: '小聚所', initial: '聚' },
  { name: '菲韻美甲', initial: '菲' },
  { name: '鴨點棧', initial: '鴨' },
  { name: '王子娘', initial: '王' }
];
