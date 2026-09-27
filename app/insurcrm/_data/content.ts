/**
 * /insurcrm 落地頁的全部文案與資料。
 *
 * ## 改名只改這裡
 * 品牌名稱（保客+）、副標、標語都在下方常數；頁面上、metadata、結構化資料一律讀常數，
 * 日後改名或改副標只改這裡。
 *
 * ## 文案紅線（保險業招攬規範 + 公平交易法，改文案前先讀）
 *  - 不寫「保證」「穩賺」「最高」「第一」「唯一」這類絕對用語。
 *  - 不提及、不比較任何同業產品名稱。
 *  - 不暗示提供商品推薦或投資建議；缺口分析只說「規則式、不列商品」。
 *  - 2026-09 時點**所有功能都還沒上線、搶先預約也還沒開放**：每一項都要帶 phase；預約按鈕一律是
 *    不可點的「搶先預約即將開放」（_components/ComingSoonCta），開放時把它換回連到 /contact 的連結，
 *    不可以寫成「已經有」。上線一項就把那一項的 phase 改成 'live'，再回頭改 FAQ 與 hero 的說法。
 *  - 功能與界線的來源是 line-crm-saas `docs/specs/insurance-agent-module.md`（§0、§5、§10、§12、§13、§14、§6）。
 */

/** 品牌（2026-09-27 Shark 定案）。名稱、副標、標語各一個常數，改一處即全頁、metadata、結構化資料同步 */
export const PRODUCT_NAME = '保客+';
export const PRODUCT_SHORT = PRODUCT_NAME;
/** 副標：與 Logo 上的字一致 */
export const PRODUCT_SUBTITLE = '保險人的 LINE 智慧管家';
export const PRODUCT_TAGLINE = '把繁瑣交給系統，把關係留給你。';
/** Logo 素材（由原始 PNG 以程式去白底／裁切，見 public/insurcrm/） */
export const LOGO = { src: '/insurcrm/baoke-plus-logo.png', width: 671, height: 251 };
export const LOGO_MARK = { src: '/insurcrm/baoke-plus-mark.png', width: 251, height: 251 };
export const OG_IMAGE_PATH = '/insurcrm/og-baoke-plus.png';
export const PAGE_PATH = '/insurcrm';

/** 個人版月費（2026-09-27 Shark 定案為正式價格）。改這裡會同步到方案卡、數字區、FAQ 與結構化資料 */
export const SOLO_PRICE = 900;

export type Phase = 1 | 2 | 3;

/** 三個推出階段的畫面標籤 —— 刻意不寫日期，排程未定前寫日期就是承諾 */
export const PHASE_LABEL: Record<Phase, string> = {
  1: '首波推出',
  2: '第二階段',
  3: '第三階段'
};

/* ── 首屏信任點 ─────────────────────────────────────────── */
export const heroPoints = ['客戶不用下載 App', '以你本人的名義發訊', '不蒐集健康資料'];

/* ── 一天的節奏（痛點 → 解法，用時間軸講） ─────────────────── */
export type DayStep = { time: string; title: string; body: string; icon: DayIcon };
export type DayIcon = 'sunrise' | 'gift' | 'mic' | 'calendar';
export const daySteps: DayStep[] = [
  {
    time: '07:30',
    title: '早報先送到你的 LINE',
    body: '今天的約訪、要確認的祝福、快到期的繳費與週年、久未聯絡的客戶，一則訊息整理好。',
    icon: 'sunrise'
  },
  {
    time: '09:00',
    title: '祝福一鍵確認後發出',
    body: '生日、農曆節日、保單週年的訊息系統先擬好，你看過、改幾個字、確認，準時送達。',
    icon: 'gift'
  },
  {
    time: '14:00',
    title: '面談完，對助理講重點',
    body: '用文字或 LINE 語音口述，AI 整理成筆記與下一步待辦，你確認後才存進客戶歷程。',
    icon: 'mic'
  },
  {
    time: '21:00',
    title: '明天的行程已在手機日曆',
    body: '約訪與提醒同步到手機行事曆，事件標題預設遮罩客戶姓名，外流也看不出是誰。',
    icon: 'calendar'
  }
];

/* ── 產品事實數字（全部是規格內的事實，不放任何成效或客戶數宣稱） ── */
export const facts: { value: number; prefix?: string; suffix?: string; label: string; note: string }[] = [
  { value: 0, suffix: ' 個', label: '客戶要下載的 App', note: '保單總表、祝福、聯絡業務，都在 LINE 裡完成' },
  { value: 6, suffix: ' 個', label: '農曆節日自動換算', note: '春節、元宵、端午、七夕、中秋、重陽，另支援農曆生日' },
  { value: 3, suffix: ' 種', label: '職業別範本', note: '保險業務、銀行理專、獨立理財顧問各有祝福與提醒範本' },
  { value: SOLO_PRICE, prefix: 'NT$', label: '個人版每月', note: '自助線上開通，一個人就能開始用' }
];

/* ── 核心功能分頁 ─────────────────────────────────────── */
export type FeatureTab = {
  id: string;
  label: string;
  icon: TabIcon;
  title: string;
  lead: string;
  points: string[];
  phase: Phase;
  mock: 'family' | 'policy' | 'calendar' | 'care' | 'client';
};
export type TabIcon = 'users' | 'scan' | 'calendar' | 'heart' | 'phone';

export const featureTabs: FeatureTab[] = [
  {
    id: 'family',
    label: '客戶與家庭',
    icon: 'users',
    title: '以家庭為單位看懂每一位客戶',
    lead: '誰是誰的配偶、小孩、父母，一張關係圖就清楚。沒有 LINE 的家人也能建檔，保障缺口一起看。',
    points: [
      '家庭關係圖，手機直式也讀得清楚',
      '客戶 A／B／C／D 分級，由你自己判斷，不自動打分數',
      '規則式保障缺口：已有／建議／缺口三欄，不列任何商品名稱',
      '客戶歷程時間軸：LINE 對話、拜訪、保單異動、祝福、筆記排在同一條線上'
    ],
    phase: 1,
    mock: 'family'
  },
  {
    id: 'policy',
    label: '保單整理',
    icon: 'scan',
    title: '跨公司保單，拍首頁就能整理',
    lead: '客戶在不同公司的保單集中整理。拍保單首頁由 AI 協助帶入欄位，你確認後才存。',
    points: [
      '拍照辨識保單首頁，逐欄顯示信心，低信心不預填',
      '提醒只拍保單資料頁，偵測到健康告知內容會直接捨棄',
      '一鍵產出家庭保障總表，以瀏覽器列印成 PDF 交給客戶',
      '同公司＋同保單號碼自動視為同一張，不重複建檔'
    ],
    phase: 1,
    mock: 'policy'
  },
  {
    id: 'calendar',
    label: '提醒與行事曆',
    icon: 'calendar',
    title: '繳費、週年、生日，不再靠記憶',
    lead: '系統依保單與客戶資料自動排出提醒，加上你自己的約訪與待辦，日／週／月三種檢視。',
    points: [
      '繳費日、保單週年、滿期、生日、年齡里程碑自動提醒',
      '久未聯絡清單：依客戶分級設定天數，到期自動列入',
      '每天早上推「早報」到你自己的 LINE',
      'iCal 訂閱連結，Google 日曆與 iPhone 日曆都能同步（單向）'
    ],
    phase: 1,
    mock: 'calendar'
  },
  {
    id: 'care',
    label: 'LINE 關懷',
    icon: 'heart',
    title: '生日與節日祝福，含農曆，一鍵確認',
    lead: '系統每天先擬好祝福，早上給你逐則預覽、改字、確認。沒確認就不發，也可以設定只用範本原文自動發送。',
    points: [
      '國曆與農曆節日、農曆生日、保單週年、自訂紀念日',
      '依稱謂自動帶入：王大哥、林媽媽，讀起來像你親手寫的',
      '範本依職業別分類（保險／理專／顧問），不含任何商品與優惠字眼',
      '只顯示「客戶有互動」，不假裝知道對方已讀'
    ],
    phase: 1,
    mock: 'care'
  },
  {
    id: 'client',
    label: '客戶看保單',
    icon: 'phone',
    title: '客戶在 LINE 裡就能看自己的保單',
    lead: '客戶點開圖文選單「我的保單」，驗證身分後看到自己的保單總表，底部一鍵聯絡你。',
    points: [
      '只看本人是被保人或要保人的保單，家人資料需各自同意才共享',
      '不顯示保單照片原圖與業務備註',
      '首次開啟先顯示個資告知並記錄同意版本',
      '「聯絡我的服務人員」直接開啟與你的對話'
    ],
    phase: 1,
    mock: 'client'
  }
];

/* ── AI 個人助理 ──────────────────────────────────────── */
export const assistantAbilities: { title: string; body: string; icon: 'sunrise' | 'pen' | 'mic' | 'chat' }[] = [
  {
    title: 'AI 早報',
    body: '在早報附上一句「今天為什麼該聯絡他」，例如保單週年剩 5 天、上次面談提到小孩明年升學。',
    icon: 'sunrise'
  },
  {
    title: '祝福草稿',
    body: '依關係、稱謂與過往互動寫出個人化祝福草稿，一律由你確認後才會發出。',
    icon: 'pen'
  },
  {
    title: '面談口述整理',
    body: '用 LINE 語音口述面談重點，轉成文字、整理出下一步，確認後存成筆記與待辦。語音轉完即刪除。',
    icon: 'mic'
  },
  {
    title: '在 LINE 對助理說話',
    body: '「查王小明」回客戶摘要卡；「記：王小明想了解房貸保障」存成筆記；「下週二下午三點約王小明」建好待辦。',
    icon: 'chat'
  }
];

export const assistantPrinciples = [
  { title: 'AI 只寫草稿', body: '所有對客戶的訊息，AI 只能產生草稿或建議。' },
  { title: '由你確認', body: '看過、可修改，按下確認才生效；也可以隨時關閉助理。' },
  { title: '全程留痕', body: '產生、修改、確認、忽略都有紀錄，產出一律標示「AI 草稿」。' }
];

/* ── 祝福一鍵確認示範資料（虛構人物） ───────────────────── */
export type GreetingDraft = {
  id: string;
  who: string;
  occasion: string;
  lunar?: boolean;
  text: string;
};
export const greetingDrafts: GreetingDraft[] = [
  {
    id: 'g1',
    who: '王大哥',
    occasion: '生日',
    text: '王大哥生日快樂！今年也祝您身體健康、工作順心，有空再約您喝杯咖啡。'
  },
  {
    id: 'g2',
    who: '林媽媽',
    occasion: '中秋節',
    lunar: true,
    text: '林媽媽中秋節快樂！祝您和家人團圓平安，月圓人更圓。'
  },
  {
    id: 'g3',
    who: '陳小姐',
    occasion: '保單週年',
    text: '陳小姐您好，您的保單下週滿一週年，想約個時間一起看看目前的保障是否還符合需求。'
  }
];

/* ── 手機畫面輪播 ────────────────────────────────────── */
export const carouselScreens: { id: string; title: string; caption: string }[] = [
  { id: 'brief', title: '每日早報', caption: '今天的行程、待確認祝福與到期提醒，一則訊息看完。' },
  { id: 'summary', title: '家庭保障總表', caption: '以家庭為單位整理各險種保額與年繳保費。' },
  { id: 'mypolicy', title: '客戶看保單', caption: '客戶在 LINE 點開就是自己的保單總表。' },
  { id: 'card', title: '數位名片', caption: '可分享的名片，自動標示所屬公司或機構（第二階段推出）。' }
];

/* ── 後續階段功能 ────────────────────────────────────── */
export type RoadmapIcon =
  | 'file-check'
  | 'traffic'
  | 'shield'
  | 'calendar-check'
  | 'radar'
  | 'card'
  | 'share'
  | 'gauge'
  | 'chat'
  | 'scan'
  | 'clipboard';
export const roadmap: { title: string; body: string; phase: Phase; icon: RoadmapIcon; team?: boolean }[] = [
  { title: '送件／照會進度', body: '記錄送件、照會、補件、承保狀態與期限；只記狀態，不記照會原因。', phase: 2, icon: 'file-check' },
  { title: '停效與流失燈號', body: '繳費逾期、停效、封鎖、長期無互動等訊號亮燈，只給你本人看，不算分數。', phase: 2, icon: 'traffic' },
  { title: '合規副駕', body: '訊息送出前提醒誇大或不當的招攬用語，並建議替代說法；只提醒、不代替公司核可。', phase: 2, icon: 'shield' },
  { title: '年度檢視邀約', body: '保單週年前自動起草邀約，客戶在 LINE 選時段，行程自動建立。', phase: 2, icon: 'calendar-check' },
  { title: '生命事件雷達', body: '從筆記與對話找出結婚、新生兒、買房、退休等事件，產生建議卡，確認後才寫入。', phase: 2, icon: 'radar' },
  { title: '數位名片與轉介紹', body: '可分享的 LINE 名片與個人介紹頁，新朋友加好友會記下是誰介紹的。', phase: 2, icon: 'card' },
  { title: '保單辨識 2.0', body: '多頁上傳、保險存摺截圖、繳費通知單，逐欄信心值，健康告知頁整張捨棄。', phase: 2, icon: 'scan' },
  { title: '主管 AI 週報', body: '每週整理所轄業務的活動量變化與提醒完成率；只含統計，不含客戶個資，也不對組員打分數。', phase: 2, icon: 'gauge', team: true },
  { title: '面談需求摘要', body: '面談後整理客戶提到的需求與顧慮，推給客戶確認內容是否正確。', phase: 3, icon: 'clipboard' },
  { title: '客戶在 LINE 問保單', body: '客戶問「下次繳費是什麼時候」只回保單欄位，不解釋條款；涉及理賠直接轉給你。', phase: 3, icon: 'chat' }
];

/* ── 差異化 ─────────────────────────────────────────── */
export const differentiators: { title: string; body: string; icon: 'line' | 'user' | 'moon' | 'shield' }[] = [
  {
    title: 'LINE 官方帳號原生',
    body: '客戶不用裝 App、不用記密碼。保單總表、祝福、問候、聯絡你，都在他每天打開的 LINE 裡。',
    icon: 'line'
  },
  {
    title: '以業務本人名義發訊',
    body: '團隊版共用一個官方帳號，訊息卻顯示負責業務的名字與頭像；客戶感受到的是跟你本人往來。',
    icon: 'user'
  },
  {
    title: '農曆祝福一鍵確認',
    body: '農曆節日與農曆生日每年自動換算，貼近台灣客戶的生活節奏，早上確認一次就好。',
    icon: 'moon'
  },
  {
    title: '合規設計內建',
    body: '不蒐集健康資料、範本需經核可、AI 草稿一律人工確認，每一步都留下紀錄。',
    icon: 'shield'
  }
];

/* ── 適用對象 ───────────────────────────────────────── */
export const personas: { title: string; body: string; icon: 'shield' | 'landmark' | 'briefcase' | 'building' }[] = [
  { title: '保險業務員', body: '把分散在各家公司的保單與客戶關係整理在一起，關懷不漏接。', icon: 'shield' },
  { title: '銀行理專', body: '管理自己經營的客戶關係與關懷節奏；請先確認所屬機構對客戶資料保存的規定。', icon: 'landmark' },
  { title: '獨立理財顧問', body: '用自己的 LINE 官方帳號經營老客戶，生日節日與年度檢視自動提醒。', icon: 'briefcase' },
  { title: '通訊處與團隊', body: '團隊共用一個官方帳號，主管看全隊活動量，業務各自經營自己的客戶。', icon: 'building' }
];

/* ── 方案 ───────────────────────────────────────────── */
export const plans = [
  {
    id: 'solo',
    name: '個人版',
    audience: '保險業務員、銀行理專、獨立理財顧問本人',
    price: SOLO_PRICE,
    priceNote: '每月，線上自助開通',
    highlight: true,
    cta: '個人版',
    points: [
      '使用你自己的 LINE 官方帳號，既有好友直接保留',
      '線上自助開通，LINE 設定精靈一步步帶你完成',
      '客戶家庭、保單整理、祝福、行事曆、早報完整提供',
      '可從自己的 Excel 名單匯入',
      'AI 個人助理於第二階段加入'
    ]
  },
  {
    id: 'team',
    name: '團隊版',
    audience: '通訊處、業務團隊',
    price: null as number | null,
    priceNote: '依團隊規模與導入範圍報價',
    highlight: false,
    cta: '團隊版',
    points: [
      '團隊共用一個官方帳號，訊息顯示業務本人名字與頭像',
      '業務、組長、區經理、處經理多層組織與資料可見範圍',
      '關懷範本由主管核可後才能使用',
      '主管儀表板：活動量、提醒完成率、久未拜訪客戶',
      '協助開通與教育訓練'
    ]
  }
];

/* ── 三步開通 ───────────────────────────────────────── */
export const onboardingSteps = [
  { title: '搶先預約', body: '預約即將開放。預約後，上線時我們會優先通知你並安排試用。' },
  { title: '接上你的 LINE 官方帳號', body: '設定精靈一步步帶你完成；已經在經營的官方帳號可以直接接，好友不用搬。' },
  { title: '匯入客戶，開始經營', body: '從 Excel 匯入客戶名單或手動建立，隔天早上就會收到早報。' }
];

/* ── 合規與資料保護 ─────────────────────────────────── */
export const complianceItems: { title: string; body: string; icon: 'heart-off' | 'lock' | 'check' | 'trash' | 'ai' | 'ban' }[] = [
  {
    title: '不蒐集健康資料',
    body: '不收病歷、既往症、體檢資料；筆記偵測到疾病與醫療字詞會提醒刪除，保單辨識遇到健康告知頁直接捨棄。',
    icon: 'heart-off'
  },
  {
    title: '保單照片私有保存',
    body: '保單照片存放於不公開的儲存空間，不產生公開網址；查看原圖、匯出資料都會留下存取紀錄。',
    icon: 'lock'
  },
  {
    title: '範本核可與簽名檔',
    body: '團隊版的關懷範本須經主管核可，業務發出的訊息自動附上所屬公司或機構名稱。',
    icon: 'check'
  },
  {
    title: 'AI 草稿，人工確認',
    body: '送給 AI 的內容先去除電話與保單號碼等識別資料；只使用有商業合約、不拿資料訓練模型的服務。',
    icon: 'ai'
  },
  {
    title: '查閱、刪除與匯出',
    body: '客戶可在 LINE 查看自己的資料；刪除客戶時一併刪除保單與照片；可整批匯出客戶資料。',
    icon: 'trash'
  },
  {
    title: '不做商品推薦',
    body: '系統不提供保險商品推薦、商品比較或投資建議，缺口分析也不列任何商品名稱。',
    icon: 'ban'
  }
];

/* ── 常見問題 —— 畫面與 FAQPage 結構化資料共用這一份 ─────── */
export const faqs: { q: string; a: string }[] = [
  {
    q: '現在可以開始使用了嗎？',
    a: `${PRODUCT_NAME} 尚未上線，功能會分階段推出。首波包含客戶與家庭、保單整理、保障總表、提醒與行事曆、每日早報、生日節日祝福與客戶在 LINE 看保單；AI 個人助理於第二階段加入。搶先預約即將開放，想先了解可以用 LINE 詢問我們。`
  },
  {
    q: '我的客戶需要下載 App 嗎？',
    a: '不需要。客戶透過你的 LINE 官方帳號收到祝福、查看自己的保單總表、聯絡你，全部在 LINE 裡完成。'
  },
  {
    q: '個人版和團隊版有什麼不同？',
    a: '個人版給業務本人使用，接的是你自己的 LINE 官方帳號，線上自助開通。團隊版給通訊處或業務團隊，共用一個官方帳號，訊息顯示負責業務的名字與頭像，並提供多層組織、範本核可與主管儀表板。兩個版本彼此獨立，資料不互通。'
  },
  {
    q: '我是銀行理專或獨立理財顧問，也可以用嗎？',
    a: '可以。個人版開放保險業務員、銀行理專與獨立理財顧問使用，文案與祝福範本會依職業別切換。使用前請先確認所屬機構對客戶資料保存與行銷訊息的規定，你是這些客戶資料的控制者。'
  },
  {
    q: '需要準備自己的 LINE 官方帳號嗎？',
    a: '個人版需要你自己的 LINE 官方帳號，已經在經營的帳號可以直接接上，好友全部保留。LINE 訊息費用依你的官方帳號方案由 LINE 計收，不包含在月費內。'
  },
  {
    q: '系統會蒐集客戶的健康資料嗎？',
    a: '不會。我們刻意不蒐集病歷、既往症與體檢等資料；筆記中出現疾病或醫療字詞時會提醒刪除，保單辨識偵測到健康告知內容會直接捨棄。'
  },
  {
    q: 'AI 會自己傳訊息給我的客戶嗎？',
    a: '不會。AI 只產生草稿與建議，任何對客戶的訊息都要你確認才會發出；若設定自動發送，只能使用範本原文，不能使用 AI 草稿。'
  },
  {
    q: '系統會推薦保險商品或提供投資建議嗎？',
    a: '不會。系統不提供商品推薦、商品比較或投資建議；保障缺口分析是依你設定的規則計算，只顯示已有、建議與缺口，不列任何商品名稱。'
  },
  {
    q: '可以匯入我原本用 Excel 管理的客戶嗎？',
    a: '可以，支援從 CSV 匯入客戶名單。匯入前需確認已取得當事人同意，系統會留下紀錄。'
  },
  {
    q: '費用怎麼計算？',
    a: `個人版每月 NT$${SOLO_PRICE.toLocaleString('en-US')}；團隊版依規模報價。LINE 官方帳號的訊息費用依你的官方帳號方案由 LINE 計收，不含在月費內。`
  }
];
