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

export const founder = {
  name: '施雲漢 Shark',
  role: '宇果國際行銷 執行長暨創辦人',
  tags: ['BNI 富聯白金分會 LINE 行銷顧問', '高雄'],
  /** 建議 4:5 直式；放進 public/ 後把路徑填在這裡 */
  photo: null as string | null,
  photoPending: '創辦人照片（建議 4:5 直式）',
  /** 約 200 字；音樂教育到行銷自動化的轉折是最有記憶點的一段 */
  bio: null as string | null,
  bioPending: '創辦人自述約 200 字'
};

export type Milestone = { year: string; title: string; description?: string; pending?: boolean };

export const milestones: Milestone[] = [
  { year: '2024', title: '宇果國際行銷成立', description: '待確認實際年份與說明', pending: true },
  { year: '待補', title: '第一套 LINE CRM 系統上線', pending: true },
  { year: '待補', title: '多分店與 POS 模組推出', pending: true },
  { year: '2026', title: 'UGO AI CRM 會員裂變系統，38 個模組', description: '待確認寫法', pending: true }
];

export const sites = [
  { label: 'LINExAI 學院', description: 'LINE 行銷課程與經營知識', url: 'lineai.ugomk.com', href: 'https://lineai.ugomk.com' },
  { label: 'UGO AI CRM', description: '會員裂變系統管理後台', url: 'crm.ugomk.com', href: 'https://crm.ugomk.com' }
];
