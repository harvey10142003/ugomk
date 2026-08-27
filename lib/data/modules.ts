import {
  UtensilsCrossed, ShoppingCart, CalendarClock, ReceiptText, Scissors, ShoppingBag,
  Fingerprint, GraduationCap, Building2, BedDouble, Route, School, Flame,
  Bot, ScanLine, PartyPopper, Tent, Trophy, Globe, type LucideIcon
} from 'lucide-react';

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
  /**
   * 官網要不要展示、放在哪一組。
   * 沒標的模組系統裡仍然有（核心平台、行銷自動化那些），
   * 只是對外講「多模組架構」時它們是預設就在的地基，列出來只會稀釋重點。
   */
  site?: 'store' | 'engage';
  /** 卡片與模組頁的圖示（只有官網會展示的模組需要） */
  icon?: LucideIcon;
  description: string;
};

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
  { id: 'pos_restaurant', mark: '餐', title: '餐飲 POS', category: 'store', perStore: true, site: 'store', icon: UtensilsCrossed, description: '點餐收銀、訂單管理、商品管理、後廚工作台' },
  { id: 'pos_retail', mark: '零', title: '零售 POS', category: 'store', perStore: true, site: 'store', icon: ShoppingCart, description: '零售收銀、商品 SKU 條碼、進銷存、退換貨' },
  { id: 'pos_reservation', mark: '位', title: '餐飲訂位', category: 'store', perStore: true, site: 'store', icon: CalendarClock, description: '訂位管理、取號排隊、桌位平面圖、線上訂位' },
  { id: 'pos_invoice', mark: '票', title: '發票管理', category: 'store', perStore: true, site: 'store', icon: ReceiptText, description: '發票參數、捐贈碼、離線字軌、發票列表' },
  { id: 'beauty_booking', mark: '美', title: '美業預約', category: 'store', perStore: true, site: 'store', icon: Scissors, description: '服務人員與項目、預約看板、班表、派工單' },
  { id: 'ecommerce', mark: '電', title: '電商商城', category: 'store', perStore: true, site: 'store', icon: ShoppingBag, description: '商品變體庫存、購物車、訂單、配送、金流' },
  { id: 'hr_attendance', mark: '勤', title: '人事出勤', category: 'store', perStore: true, site: 'store', icon: Fingerprint, description: '員工打卡、排班、請假加班、月結薪資統計' },
  { id: 'course_enrollment', mark: '課', title: '課程報名', category: 'store', perStore: true, site: 'store', icon: GraduationCap, description: '課程展示行事曆、報名 QR、掃碼報到、學習歷程' },
  { id: 'venue_booking', mark: '場', title: '場地預約', category: 'store', perStore: true, site: 'store', icon: Building2, description: '場地管理、可預約時段、線上預約、預約審核' },
  { id: 'hotel_booking', mark: '房', title: '訂房', category: 'store', perStore: true, site: 'store', icon: BedDouble, description: '房型管理、日期區間訂房、加購項目、訂金政策' },
  { id: 'case_dispatch', mark: '派', title: '派案模組', category: 'store', perStore: true, site: 'store', icon: Route, description: '案件課程派遣、接案者分級、搶案指派、課後回饋' },
  { id: 'cram_school', mark: '補', title: '補習班', category: 'store', perStore: true, site: 'store', icon: School, description: '學生家長綁定、班級、聯絡簿、點名簽到、公告' },
  { id: 'temple_management', mark: '廟', title: '宮廟管理', category: 'store', perStore: true, site: 'store', icon: Flame, description: '光明燈認購、籤詩抽籤、安太歲名單、香油錢捐獻' },
  { id: 'bar_hostess', mark: '酒', title: '餐酒館公關', category: 'store', description: '公關管理、專屬 QR 帶客戰績、每日班表與展示頁' },

  // ── 成長行銷 ──
  { id: 'marketing_automation', mark: '行', title: '行銷自動化', category: 'grow', description: '訂單、預約、生日、久未回購自動推播發券加點' },
  { id: 'notification_center', mark: '通', title: 'LINE 通知中心', category: 'grow', description: '推播訊息範本管理、批次推播、推播紀錄統計' },
  { id: 'ai_customer_service', mark: 'AI', title: 'AI 客服', category: 'grow', site: 'engage', icon: Bot, description: '自動回覆、知識庫、工具查詢、轉真人、對話分析' },
  { id: 'invoice_reward', mark: '登', title: '發票登錄', category: 'grow', site: 'engage', icon: ScanLine, description: '登錄別家商店發票換獎勵，支援 QR 條碼與照片辨識' },
  { id: 'event_module', mark: '宴', title: '活動模組', category: 'grow', site: 'engage', icon: PartyPopper, description: '婚禮尾牙春酒：報到 QR、桌號、現場抽獎、感謝牆' },
  { id: 'market_expo', mark: '市', title: '市集展覽', category: 'grow', site: 'engage', icon: Tent, description: '攤商管理、QR 集點、電子名片型錄、完攤抽獎' },
  { id: 'game_community', mark: '社', title: '社群與遊戲化', category: 'grow', site: 'engage', icon: Trophy, description: '貼文留言讚、等級曲線、勳章成就、每日打卡、排行榜' },
  { id: 'advanced_reports', mark: '報', title: '進階報表', category: 'grow', description: 'RFM 分群、回購率、棄單率、LTV 終身價值' },
  { id: 'website', mark: '網', title: '網站經營', category: 'grow', site: 'engage', icon: Globe, description: '導流頁、品牌官網、內容網站，三階加購方案' },
  { id: 'e_signing', mark: '簽', title: '線上簽約', category: 'grow', description: '範本、發起簽署、LINE 手寫簽名、稽核軌跡' },
  { id: 'chain_management', mark: '鎖', title: '連鎖運營', category: 'grow', description: '區域門市、店長店員角色、店倉、跨店調撥、月結分潤' },

  // ── 內容擴充 ──
  { id: 'academy_articles', mark: '文', title: '學院文章', category: 'ext', description: '知識庫與教學文章管理，含獨立 SEO 欄位' },
  { id: 'academy_tools', mark: '具', title: '學院工具庫', category: 'ext', description: '範本、Excel、Notion、Prompt、Checklist 下載' },
  { id: 'academy_subscription', mark: '訂', title: '學院訂閱方案', category: 'ext', description: '免費 / Pro / Enterprise 訂閱制，信用卡定期定額' }
];

/** 官網展示的兩組模組 — 其餘模組系統裡都有，只是不在「多模組架構」這頁列出 */
export const siteModuleGroups = [
  {
    key: 'store',
    label: '門市營運模組',
    caption: '每間分店各自開通，資料分開算',
    hint: '例如三間店裡只有一間做外送，就只有那間開電商商城',
    modules: crmModules.filter((m) => m.site === 'store')
  },
  {
    key: 'engage',
    label: '顧客互動模組',
    caption: '整個品牌共用一份，跨分店一起跑',
    hint: '例如一場市集活動，所有分店的會員都能參加',
    modules: crmModules.filter((m) => m.site === 'engage')
  }
];

export const siteModuleCount = crmModules.filter((m) => m.site).length;

/** 架構圖中心：所有模組共用的同一份會員資料 */
export const memberCoreFields = ['姓名 / 電話', '會員等級', '點數與票券', '消費紀錄', '推薦來源', '所屬分店'];

/**
 * 架構圖：圍繞核心的模組。
 * on 代表「這間店開了」— 用開/未開的視覺差別讓「不用全買」這件事一眼看懂。
 */
export const orbitModules = [
  { mark: '餐', label: '餐飲 POS', on: true },
  { mark: '位', label: '餐飲訂位', on: true },
  { mark: '美', label: '美業預約', on: false },
  { mark: '電', label: '電商商城', on: true },
  { mark: '課', label: '課程報名', on: false },
  { mark: 'AI', label: 'AI 客服', on: true },
  { mark: '社', label: '遊戲化社群', on: false },
  { mark: '市', label: '市集展覽', on: false }
];

/** 三種角色、三種介面 — 用實際畫面說明，比講「操作介面層」好懂 */
export const audienceViews = [
  {
    key: 'customer',
    label: '顧客',
    title: '在 LINE 裡就完成',
    description: '加入好友、查點數、領票券、線上預約，不用下載任何 App，也不用另外註冊帳號。'
  },
  {
    key: 'staff',
    label: '店員',
    title: '一台平板做完現場',
    description: '點餐、結帳、找會員、扣點數在同一個畫面完成，不用在不同系統之間跳來跳去。'
  },
  {
    key: 'owner',
    label: '老闆',
    title: '一個後台看全部',
    description: '各分店營業額、會員成長、推播成效在同一頁，不用等店長回報才知道發生什麼事。'
  }
];

/** 「怎麼運作」三句白話 — 取代原本的工程術語 */
export const howItWorks = [
  {
    mark: '一',
    title: '會員資料只有一份',
    description: '顧客在哪間店消費、從哪個活動進來、用哪支手機加好友，都指向同一個人。不會 A 店查不到 B 店的紀錄。'
  },
  {
    mark: '二',
    title: '模組像積木，要用才開',
    description: '需要收銀就開 POS，需要預約就開預約。沒開的模組不會出現在畫面上，員工不用學用不到的功能。'
  },
  {
    mark: '三',
    title: '每間分店開自己需要的',
    description: '總店做外送、二店只做內用，兩邊開的模組可以不一樣，資料各自分開算，總部一次看得到全部。'
  }
];

/** 產業組合包 — 同產業通常開哪幾個模組 */
export const industryPacks = [
  {
    industry: '餐飲',
    title: '內用外帶 + 訂位',
    modules: ['餐飲 POS', '餐飲訂位', '發票管理', '行銷自動化', '會員點數'],
    // Unsplash 免費授權（可商用、免標註）
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=600&fit=crop&q=80'
  },
  {
    industry: '美業',
    title: '預約 + 儲值 + 多分店',
    modules: ['美業預約', '儲值金', '連鎖運營', '人事出勤', '行銷自動化'],
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=900&h=600&fit=crop&q=80'
  },
  {
    industry: '課程活動',
    title: '報名 + 簽到 + 回訪',
    modules: ['課程報名', '活動模組', '問卷', '票券', '行銷自動化'],
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=900&h=600&fit=crop&q=80'
  }
];
