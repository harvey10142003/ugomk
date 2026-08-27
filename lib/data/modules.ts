/**
 * UGO AI CRM 模組清單
 *
 * 資料來源＝系統實際的模組定義（apps/api/src/routes/module.ts 的 DEFAULT_MODULES
 * 與 apps/api/src/lib/modules/*.ts 的 MODULE_NAME / MODULE_DESCRIPTION），
 * 不是行銷側自己編的清單。新增模組時請一併回來更新這裡，別讓官網與系統對不上。
 *
 * perStore=true 者在系統裡是 isPerStore 模組：租戶層授權後，還要為每間分店各自啟用。
 */

export type ModuleCategoryKey = 'core' | 'store' | 'grow' | 'ext';

export type CrmModule = {
  /** 對應系統的 module id */
  id: string;
  /** 卡片上的中文單字圖示 — 刻意不用湊數的線性 icon，中文方塊更成系統 */
  mark: string;
  title: string;
  category: ModuleCategoryKey;
  perStore?: boolean;
  description: string;
};

export const moduleCategories: { key: ModuleCategoryKey | 'all'; label: string; caption: string }[] = [
  { key: 'all', label: '全部', caption: '目前系統實際擁有的模組' },
  { key: 'core', label: '核心平台', caption: '每個租戶都有，不需另外開通' },
  { key: 'store', label: '門市營運', caption: '依分店各自啟用，資料以分店隔離' },
  { key: 'grow', label: '成長行銷', caption: '跨分店共用一份' },
  { key: 'ext', label: '內容擴充', caption: '知識內容與訂閱經營' }
];

export const crmModules: CrmModule[] = [
  // ── 核心平台 ──
  { id: 'content_management', mark: '內', title: '內容管理', category: 'core', description: '圖文選單、最新消息、微網頁、圖文卡片、票券' },
  { id: 'member_management', mark: '會', title: '會員管理', category: 'core', description: '會員列表、等級、群組、標籤、週期任務、匯入' },
  { id: 'messaging', mark: '訊', title: '訊息發送', category: 'core', description: '會員留言、群發訊息、關鍵字回應、按鈕回應' },
  { id: 'activity_management', mark: '活', title: '活動管理', category: 'core', description: '抽獎、問卷、票券購買、消費與集點紀錄' },
  { id: 'settings', mark: '設', title: '參數設定', category: 'core', description: '商家設定、等級與集點參數、推薦設定、LINE 與網域' },
  { id: 'rich_menu', mark: '選', title: '圖文選單進階', category: 'core', description: '本地編輯器、模板、自由拖拉、上傳到 LINE' },
  { id: 'pos', mark: '商', title: '商店管理', category: 'core', description: 'POS 介面、商店建立、商店管理員' },
  { id: 'export', mark: '匯', title: '資料匯出', category: 'core', description: 'CSV 匯出紀錄功能' },
  { id: 'media_library', mark: '媒', title: '媒體櫃', category: 'core', description: '影音媒體、公共素材管理' },
  { id: 'system_management', mark: '系', title: '系統管理', category: 'core', description: '帳號管理、使用記錄、我的帳戶' },

  // ── 門市營運 ──
  { id: 'pos_restaurant', mark: '餐', title: '餐飲 POS', category: 'store', perStore: true, description: '點餐收銀、訂單管理、商品管理、後廚工作台' },
  { id: 'pos_retail', mark: '零', title: '零售 POS', category: 'store', perStore: true, description: '零售收銀、商品 SKU 條碼、進銷存、退換貨' },
  { id: 'pos_reservation', mark: '位', title: '餐飲訂位', category: 'store', perStore: true, description: '訂位管理、取號排隊、桌位平面圖、線上訂位' },
  { id: 'pos_invoice', mark: '票', title: '發票管理', category: 'store', perStore: true, description: '發票參數、捐贈碼、離線字軌、發票列表' },
  { id: 'beauty_booking', mark: '美', title: '美業預約', category: 'store', perStore: true, description: '服務人員與項目、預約看板、班表、派工單' },
  { id: 'ecommerce', mark: '電', title: '電商商城', category: 'store', perStore: true, description: '商品變體庫存、購物車、訂單、配送、金流' },
  { id: 'hr_attendance', mark: '勤', title: '人事出勤', category: 'store', perStore: true, description: '員工打卡、排班、請假加班、月結薪資統計' },
  { id: 'course_enrollment', mark: '課', title: '課程報名', category: 'store', perStore: true, description: '課程展示行事曆、報名 QR、掃碼報到、學習歷程' },
  { id: 'venue_booking', mark: '場', title: '場地預約', category: 'store', perStore: true, description: '場地管理、可預約時段、線上預約、預約審核' },
  { id: 'hotel_booking', mark: '房', title: '訂房', category: 'store', perStore: true, description: '房型管理、日期區間訂房、加購項目、訂金政策' },
  { id: 'case_dispatch', mark: '派', title: '派案模組', category: 'store', perStore: true, description: '案件課程派遣、接案者分級、搶案指派、課後回饋' },
  { id: 'cram_school', mark: '補', title: '補習班', category: 'store', perStore: true, description: '學生家長綁定、班級、聯絡簿、點名簽到、公告' },
  { id: 'temple_management', mark: '廟', title: '宮廟管理', category: 'store', perStore: true, description: '光明燈認購、籤詩抽籤、安太歲名單、香油錢捐獻' },
  { id: 'bar_hostess', mark: '酒', title: '餐酒館公關', category: 'store', description: '公關管理、專屬 QR 帶客戰績、每日班表與展示頁' },

  // ── 成長行銷 ──
  { id: 'marketing_automation', mark: '行', title: '行銷自動化', category: 'grow', description: '訂單、預約、生日、久未回購自動推播發券加點' },
  { id: 'notification_center', mark: '通', title: 'LINE 通知中心', category: 'grow', description: '推播訊息範本管理、批次推播、推播紀錄統計' },
  { id: 'ai_customer_service', mark: 'AI', title: 'AI 客服', category: 'grow', description: '自動回覆、知識庫、工具查詢、轉真人、對話分析' },
  { id: 'invoice_reward', mark: '登', title: '發票登錄', category: 'grow', description: '登錄別家商店發票換獎勵，支援 QR 條碼與照片辨識' },
  { id: 'event_module', mark: '宴', title: '活動模組', category: 'grow', description: '婚禮尾牙春酒：報到 QR、桌號、現場抽獎、感謝牆' },
  { id: 'market_expo', mark: '市', title: '市集展覽', category: 'grow', description: '攤商管理、QR 集點、電子名片型錄、完攤抽獎' },
  { id: 'game_community', mark: '社', title: '社群與遊戲化', category: 'grow', description: '貼文留言讚、等級曲線、勳章成就、每日打卡、排行榜' },
  { id: 'advanced_reports', mark: '報', title: '進階報表', category: 'grow', description: 'RFM 分群、回購率、棄單率、LTV 終身價值' },
  { id: 'website', mark: '網', title: '網站經營', category: 'grow', description: '導流頁、品牌官網、內容網站，三階加購方案' },
  { id: 'e_signing', mark: '簽', title: '線上簽約', category: 'grow', description: '範本、發起簽署、LINE 手寫簽名、稽核軌跡' },
  { id: 'chain_management', mark: '鎖', title: '連鎖運營', category: 'grow', description: '區域門市、店長店員角色、店倉、跨店調撥、月結分潤' },

  // ── 內容擴充 ──
  { id: 'academy_articles', mark: '文', title: '學院文章', category: 'ext', description: '知識庫與教學文章管理，含獨立 SEO 欄位' },
  { id: 'academy_tools', mark: '具', title: '學院工具庫', category: 'ext', description: '範本、Excel、Notion、Prompt、Checklist 下載' },
  { id: 'academy_subscription', mark: '訂', title: '學院訂閱方案', category: 'ext', description: '免費 / Pro / Enterprise 訂閱制，信用卡定期定額' }
];

export const moduleCount = crmModules.length;

export function countByCategory(key: ModuleCategoryKey | 'all') {
  return key === 'all' ? crmModules.length : crmModules.filter((m) => m.category === key).length;
}

/** 平台底層能力 — 模組之下、每個模組都在用的地基 */
export const platformCapabilities = [
  { mark: '隔', title: '租戶資料隔離', description: '每個品牌一套獨立資料結構，不與其他客戶共用同一張表。' },
  { mark: '店', title: '多分店權限分流', description: '總部 / 店長 / 店員 / 收銀四級權限，資料依分店隔離。' },
  { mark: '帳', title: '單一會員帳本', description: 'POS、預約、票券、推薦全部寫回同一筆會員，不會各算各的。' },
  { mark: '雲', title: '雲端自動部署', description: '免自備主機，功能更新自動生效，不需停機安裝。' }
];

/** 架構圖四層 */
export const architectureLayers = [
  {
    no: '01',
    title: '接觸層',
    caption: '顧客從這裡進來',
    items: [
      { label: 'LINE 官方帳號', line: true },
      { label: 'LIFF 會員中心', line: true },
      { label: '圖文選單' },
      { label: '品牌官網' },
      { label: '推薦連結 / QR' },
      { label: '門市現場' }
    ]
  },
  {
    no: '02',
    title: 'UGO AI CRM 會員裂變核心',
    caption: '單一會員真實來源',
    core: true,
    items: [
      { label: '會員資料' },
      { label: '標籤與等級' },
      { label: '點數 / 票券 / 儲值金' },
      { label: '推薦裂變 MGM' },
      { label: '多分店權限' },
      { label: '行銷自動化引擎' }
    ]
  },
  {
    no: '03',
    title: '模組層',
    caption: `${crmModules.length} 個可插拔模組，逐一開通`,
    items: [
      { label: `核心平台 ${countByCategory('core')}` },
      { label: `門市營運 ${countByCategory('store')}` },
      { label: `成長行銷 ${countByCategory('grow')}` },
      { label: `內容擴充 ${countByCategory('ext')}` }
    ]
  },
  {
    no: '04',
    title: '操作介面',
    caption: '誰在用，就給誰的介面',
    items: [
      { label: '管理後台' },
      { label: 'POS 平板' },
      { label: '廚房出單螢幕' },
      { label: '店長 / 店員分權' },
      { label: '顧客端 LINE', line: true }
    ]
  }
];

/** 產業組合包 — 同產業通常開哪幾個模組 */
export const industryPacks = [
  {
    industry: '餐飲',
    title: '內用外帶 + 訂位',
    modules: ['餐飲 POS', '餐飲訂位', '發票管理', '行銷自動化', '會員點數']
  },
  {
    industry: '美業',
    title: '預約 + 儲值 + 多分店',
    modules: ['美業預約', '儲值金', '連鎖運營', '人事出勤', '行銷自動化']
  },
  {
    industry: '課程活動',
    title: '報名 + 簽到 + 回訪',
    modules: ['課程報名', '活動模組', '問卷', '票券', '行銷自動化']
  }
];
