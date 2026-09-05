/**
 * 「關於宇果」頁的內容來源。
 *
 * ⚠️ 標了 pending 的欄位＝還沒拿到真實素材，頁面會顯示明確的 placeholder。
 * 補上真實內容後把 pending 拿掉即可，不需要動頁面程式。
 * 沒有真實素材時寧可留 placeholder，也不要放編造的年份、數字或故事。
 */

export const positioning = {
  eyebrow: 'Our position',
  title: '大多數品牌不缺工具，缺的是把工具接起來的人',
  paragraphs: [
    '市面上不缺 CRM、不缺 POS、也不缺群發工具。真正的困難在於：這些系統各自握著一部分顧客資料，沒有人負責讓它們對得起來。',
    '我們的做法是先把營運流程走一遍，再決定要開哪些模組，而不是先賣一整套系統，讓客戶自己想辦法用完。'
  ]
};

export const approach = [
  { mark: '流', title: '先走流程，再開模組', description: '從顧客旅程與現場動線出發' },
  { mark: '導', title: '導航式行銷', description: '讓顧客每一步都知道下一步該做什麼' },
  { mark: '陪', title: '上線後才是開始', description: '持續調整推播節奏與模組配置' }
];

export type Milestone = { year: string; title: string; description?: string; pending?: boolean };

/**
 * 每一筆都要對得上可查證的來源：公司登記、租戶建立紀錄或系統現況。
 * 沒有來源的年份寧可不寫，也不要為了讓時間軸好看而補一筆。
 */
export const milestones: Milestone[] = [
  {
    year: '2020',
    title: '宇果國際行銷成立',
    description: '從平面設計、網站建置與圖書出版做起，替在地品牌處理對外的視覺與內容。'
  },
  {
    year: '2024',
    title: '轉做 LINE@ 私域行銷',
    description:
      '把重心移到 LINE 官方帳號的會員經營，協助企業規劃好友加入之後的流程，至今超過 200 位客戶。'
  },
  {
    year: '2026',
    title: '自建 UGO AI CRM，五月第一個客戶上線',
    description:
      '四月開始寫自己的會員系統，餐飲 POS、美業預約與多分店模組陸續完成；五月第一個客戶正式用它營運。'
  },
  {
    year: '2026',
    title: '38 個模組可依需求啟用',
    description: '從會員、點數票券、預約到 POS 與行銷自動化，客戶只開現在用得到的部分。'
  }
];

export const sites = [
  { label: 'LINExAI 學院', description: 'LINE 行銷課程與經營知識', url: 'lineai.ugomk.com', href: 'https://lineai.ugomk.com' },
  { label: 'UGO AI CRM', description: '會員裂變系統管理後台', url: 'crm.ugomk.com', href: 'https://crm.ugomk.com' }
];
