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
 *  - 頁面不顯示推出階段（Shark 2026-09-28 決定）：畫面上不放首波／第二階段／第三階段的標籤、圖例或對照表。
 *    資料裡的 `phase` 保留給內部排程對照，頁面不讀。「團隊版」這類版本差異標記可以顯示。
 *  - 2026-09 時點**所有功能都還沒上線、搶先預約也還沒開放**：預約按鈕一律是不可點的「搶先預約即將開放」
 *    （_components/ComingSoonCta），開放時把它換回連到 /contact 的連結；不可以寫成「已經有」。
 *  - 不編造客戶名稱、使用人數、評價。畫面示範裡的人物一律虛構，並在旁邊註明。
 *  - 功能與界線的來源是 line-crm-saas `docs/specs/insurance-agent-module.md`，
 *    實作進度以記憶 project_insurance_agent_module（分支 feat/insurance-final）為準；
 *    「線上自助開通與付款」是平台共用基建，**尚未建置**，只能寫成開放前由我們協助開通。
 *
 * ## 字型子集
 * 標題用 Noto Serif TC、手寫註記用 LXGW WenKai TC，兩者都只下載「本頁實際用到的字」。
 * `FONT_SUBSET_TEXT` 由下面的標題與註記資料組出來；改了標題或註記要重跑
 * `node scripts/insurcrm-fonts.mjs` 重新產生 public/insurcrm/fonts/*.woff2（沒重跑的新字會退回黑體，不會壞）。
 */

/** 品牌（2026-09-27 Shark 定案）。名稱、副標、標語各一個常數，改一處即全頁、metadata、結構化資料同步 */
export const PRODUCT_NAME = '保客+';
export const PRODUCT_SHORT = PRODUCT_NAME;
/** 副標：與 Logo 上的字一致 */
export const PRODUCT_SUBTITLE = '保險人的 LINE 智慧管家';
export const PRODUCT_TAGLINE = '把繁瑣交給系統，把關係留給你。';
/** Logo 素材：由 Shark 提供的高解析透明 PNG 以程式裁切、縮放（logo 3x、盾牌 256px）；圖檔尺寸改了要同步這裡 */
export const LOGO = { src: '/insurcrm/baoke-plus-logo.png', width: 720, height: 269 };
export const LOGO_MARK = { src: '/insurcrm/baoke-plus-mark.png', width: 256, height: 257 };
export const OG_IMAGE_PATH = '/insurcrm/og-baoke-plus.png';
export const PAGE_PATH = '/insurcrm';

/** 個人版月費（2026-09-27 Shark 定案為正式價格）。改這裡會同步到方案、FAQ 與結構化資料 */
export const SOLO_PRICE = 900;

export type Phase = 1 | 2 | 3;

/** 推出階段的內部名稱 —— 頁面不顯示（Shark 2026-09-28），只供內部對照 */
export const PHASE_LABEL: Record<Phase, string> = {
  1: '首波推出',
  2: '第二階段',
  3: '第三階段'
};

/* ── 首屏 ─────────────────────────────────────────────── */
export const hero = {
  lead: '給保險業務、銀行理專與通訊處的客戶經營系統，做在你的 LINE 官方帳號裡。每天早上一則早報告訴你今天該聯絡誰；祝福、提醒、保單整理由系統先備好，你看過、按下確認才會送出。',
  status: '尚未上線'
};

/**
 * 首屏的日曆紙（示範日：2026 年中秋節，國曆 9 月 25 日星期五、農曆八月十五）。
 * 「宜／忌」借用農民曆的格式講今天的事；早報內容與下方 07:30 的示範一致。人物皆為虛構。
 */
export const calendarSheet = {
  year: '2026',
  month: '九月',
  day: '25',
  weekday: '星期五',
  prevDay: '24',
  prevWeekday: '星期四',
  lunar: '農曆八月十五',
  festival: '中秋節',
  yi: ['確認中秋祝福 12 則', '拜訪陳家．保單週年'],
  ji: ['忘了林媽媽的繳費日'],
  footer: '07:30 早報已送到你的 LINE'
};

/* ── 一天的時間軸 ───────────────────────────────────── */
export type DayMock = 'brief' | 'greeting' | 'family' | 'assistant' | 'inbox' | 'ical';
export type DayItem = { text: string; phase: Phase; team?: boolean };
export type DayEntry = {
  id: string;
  time: string;
  /** 時間旁的一句話，說這個時段在做什麼 */
  moment: string;
  title: string;
  body: string;
  items: DayItem[];
  /** 手寫註記（手帳上的筆記），每段最多一句 */
  note: string;
  mock: DayMock;
  /** 情境照片（示意，非真實客戶），疊在產品畫面後面 */
  photo?: PhotoId;
};

/* ── 情境照片 ─────────────────────────────────────────
 * 2026-09-28 由 Shark 提供的生成圖（示意，不是真實業務或客戶）。
 * 規則：不配見證、姓名、引號，不暗示是某位真實人物的故事；照片只給情境，產品畫面才是主角。
 * 原圖 1672×941 PNG，裁成 3:2（團隊那張保留 16:9）後以 WebP 1200 寬輸出到 public/insurcrm/photos/。 */
export type PhotoId = 'morning' | 'homeVisit' | 'family' | 'team';
export const photos: Record<PhotoId, { src: string; width: number; height: number; alt: string }> = {
  morning: { src: '/insurcrm/photos/morning.webp', width: 1200, height: 800, alt: '示意照片：清晨的早餐店外，一位業務員一手拿咖啡、一手看手機，旁邊停著機車' },
  homeVisit: { src: '/insurcrm/photos/home-visit.webp', width: 1200, height: 800, alt: '示意照片：午後的客廳，業務員坐在小凳子上拿手機給一對夫妻看，桌上有茶杯與資料夾' },
  family: { src: '/insurcrm/photos/family.webp', width: 1200, height: 800, alt: '示意照片：黃昏的騎樓下，三代同堂的一家人坐在藤椅上談笑' },
  team: { src: '/insurcrm/photos/team-meeting.webp', width: 1200, height: 675, alt: '示意照片：通訊處晨會，主管站在白板旁，業務們圍著會議桌笑著討論' }
};

export const dayEntries: DayEntry[] = [
  {
    id: 'brief',
    time: '07:30',
    moment: '出門前',
    title: '今天該聯絡誰，早上就寫好了',
    body: '約訪、待確認的祝福、快到的繳費日與保單週年、太久沒聯絡的客戶，合成一則早報送到你自己的 LINE。一天只推一則，不洗版。',
    items: [
      { text: '繳費日、保單週年、滿期、生日與年齡里程碑自動列入', phase: 1 },
      { text: '久未聯絡的天數依家庭分級各自設定，分級由你判斷，系統不打分數', phase: 1 },
      { text: 'AI 在每位客戶旁補一句「為什麼今天該聯絡他」', phase: 2 }
    ],
    note: '一天只一則，看完就知道先打給誰',
    mock: 'brief',
    photo: 'morning'
  },
  {
    id: 'greeting',
    time: '08:40',
    moment: '喝咖啡的時間',
    title: '十二則中秋祝福，一杯咖啡的時間確認完',
    body: '系統依生日、國曆與農曆節日、保單週年先把祝福擬好，稱謂自動帶入。你勾選、改幾個字、按確認，訊息在設定的時間以你的名義送出。',
    items: [
      { text: '農曆節日與農曆生日每年自動換算，閏月也算得出來', phase: 1 },
      { text: '沒按確認的不會發；選自動發送時只能用範本原文', phase: 1 },
      { text: '團隊版的祝福範本要主管核可後才能使用', phase: 1, team: true },
      { text: 'AI 依關係與過往互動寫個人化草稿，仍由你確認', phase: 2 }
    ],
    note: '沒按確認，一則都不會發',
    mock: 'greeting'
  },
  {
    id: 'family',
    time: '10:30',
    moment: '按電鈴之前',
    title: '進門前，先看這一家的保障總表',
    body: '以家庭為單位整理各家公司的保單，誰是被保人、保了什麼、年繳多少，一張表看完。缺口依你設定的規則計算，只列「已有、建議、缺口」，不列任何商品。',
    items: [
      { text: '拍保單首頁由 AI 帶入欄位，你逐欄確認才存；健康告知頁整張捨棄', phase: 1 },
      { text: '保障總表可印成 PDF 交給客戶；沒有 LINE 的家人也能建檔', phase: 1 },
      { text: 'LINE 對話、拜訪、保單異動、祝福排在同一條客戶歷程上', phase: 1 },
      { text: '多頁保單、保險存摺截圖也能辨識，一次最多 6 張', phase: 2 }
    ],
    note: '拍照帶入，但每一欄都要你點頭',
    mock: 'family',
    photo: 'homeVisit'
  },
  {
    id: 'assistant',
    time: '14:00',
    moment: '走出客戶家',
    title: '在 LINE 對助理說三句話，筆記和待辦就排好',
    body: '把剛才面談的重點打字或口述給助理，它整理成筆記與下一步的草稿，你按確認才存進客戶歷程。「查陳先生」回一張摘要卡，「下週二下午三點約陳太太」直接建好待辦。',
    items: [
      { text: '只給你本人用的助理，不會替你對客戶發出任何訊息', phase: 2 },
      { text: '送給 AI 前，姓名換成代號，電話、Email、保單號碼先遮掉', phase: 2 },
      { text: '語音預設關閉；開啟要本人同意，錄音轉成文字後即刪除', phase: 2 },
      { text: '面談後整理需求摘要，傳給客戶在 LINE 確認', phase: 3 }
    ],
    note: 'AI 寫草稿，存不存由你決定',
    mock: 'assistant'
  },
  {
    id: 'inbox',
    time: '16:20',
    moment: '客戶來訊',
    title: '客戶傳訊息來，回覆之前系統先看一眼',
    body: '客戶在你的官方帳號留言，系統通知負責的你，通知裡不轉貼原文。你回覆時若寫到疾病或醫療字詞，這則會直接擋下，健康資料不會留在對話紀錄裡。',
    items: [
      { text: '同一位客戶 30 分鐘內最多通知一次，晚上十點後不打擾', phase: 1 },
      { text: '一對一回覆遇到健康字詞直接擋下，不能強制送出', phase: 1 },
      { text: '合規副駕提醒誇大或不當的招攬用語，並給替代說法', phase: 2 },
      { text: '客戶問「下次什麼時候繳費」，系統依保單欄位回答；理賠問題轉給你', phase: 3 }
    ],
    note: '通知只說誰找你，不轉貼內容',
    mock: 'inbox'
  },
  {
    id: 'ical',
    time: '21:00',
    moment: '收工',
    title: '明天的行程，已經在手機日曆裡',
    body: '約訪、待辦與祝福同步到 Google 日曆或 iPhone 日曆。事件標題預設只寫「約訪 陳○明」，不帶備註與地點；手機借人看，也看不出是誰。',
    items: [
      { text: 'iCal 訂閱連結，單向同步，日／週／月三種檢視', phase: 1 },
      { text: '拜訪活動量：本週拜訪、提醒完成率、久未拜訪的客戶', phase: 1 },
      { text: '主管看全隊活動量；每週一收到只含統計、不含客戶個資的週報', phase: 2, team: true }
    ],
    note: '姓名預設遮一個字',
    mock: 'ical'
  }
];

/* ── 早報示範（與首屏日曆紙同一天；人物皆為虛構） ─────────── */
export const briefMock = {
  heading: '今日早報｜9/25（五）中秋節',
  summary: '約訪 2 件、祝福 12 則待確認',
  lines: [
    { tag: '約訪', text: '10:30 陳家．保單週年檢視' },
    { tag: '約訪', text: '14:00 王○明．初次面談' },
    { tag: '繳費', text: '林媽媽 醫療險 9/28 到期' },
    { tag: '久未聯絡', text: 'A 級家庭 3 戶，已超過 60 天' }
  ],
  action: '打開今日清單'
};

/* ── 家庭保障總表示範（虛構家庭；保額為示意） ─────────────── */
export const familyMock = {
  household: '陳家',
  grade: 'A',
  members: ['陳先生', '陳太太', '陳小弟'],
  roles: ['本人', '配偶', '子女'],
  rows: [
    { kind: '壽險', cells: ['300 萬', '100 萬', '—'], gap: [false, false, false] },
    { kind: '醫療', cells: ['日額 2,000', '日額 2,000', '日額 1,000'], gap: [false, false, false] },
    { kind: '意外', cells: ['100 萬', '—', '50 萬'], gap: [false, true, false] },
    { kind: '長照', cells: ['—', '—', '—'], gap: [true, true, false] }
  ],
  premium: '年繳保費合計 NT$86,400',
  footnote: '缺口依你設定的規則計算，不列商品名稱'
};

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
    who: '林媽媽',
    occasion: '中秋節',
    lunar: true,
    text: '林媽媽中秋節快樂！祝您和家人團圓平安，有空回來喝杯茶，我再去看您。'
  },
  {
    id: 'g2',
    who: '王大哥',
    occasion: '生日',
    text: '王大哥生日快樂！今年也祝您身體健康、工作順心，改天再約您喝咖啡。'
  },
  {
    id: 'g3',
    who: '陳小姐',
    occasion: '保單週年',
    text: '陳小姐您好，您的保單下週滿一週年，想約個時間一起看看目前的保障是否還符合需求。'
  }
];

/* ── 客戶那一端 ─────────────────────────────────────── */
export const clientSide = {
  title: '客戶不用裝 App，打開 LINE 就找得到你',
  body: '客戶點開你官方帳號的選單「我的保單」，驗證身分後看到自己的保單總表；有問題，底下一顆按鈕直接回到跟你的對話。',
  items: [
    { text: '只看得到本人是要保人或被保人的保單；家人資料要各自同意才共享', phase: 1 as Phase },
    { text: '首次開啟先看個資告知，同意的版本會記下來', phase: 1 as Phase },
    { text: '保單週年前收到年度檢視邀約，在 LINE 裡直接選時段', phase: 2 as Phase },
    { text: '保單健診報告在 LINE 打開、簽收', phase: 3 as Phase },
    { text: '講座在 LINE 報名，現場憑報到碼入場', phase: 3 as Phase }
  ]
};

/* ── 合規與界線 ─────────────────────────────────────── */
export const compliance = {
  title: '該守的界線，寫在程式裡，不靠記性',
  lead: '寫給要替整個通訊處把關的主管：以下每一條都是系統的行為，不是使用守則。',
  does: [
    {
      title: '不收健康資料',
      body: '沒有病歷、既往症、體檢的欄位。筆記、祝福改字、一對一回覆遇到疾病或醫療字詞直接擋下；保單辨識遇到健康告知頁整張捨棄。'
    },
    {
      title: '客戶要求刪除，就真的刪',
      body: '刪除客戶時，保單、保單照片、LINE 對話全文一起刪除；家庭名稱與操作紀錄去除識別資料。'
    },
    {
      title: '誰看過什麼，都有紀錄',
      body: '保單照片放在不公開的儲存空間，不產生公開網址。查看原圖、匯出資料、主管打開別人的客戶，都先留下存取紀錄。'
    },
    {
      title: 'AI 只寫草稿，人按確認',
      body: '對客戶的每一則訊息都由人確認；自動發送只能用範本原文。送給 AI 的內容先去除姓名、電話、Email 與保單號碼。'
    },
    {
      title: '代登入的人不能替你點頭',
      body: '客服或平台人員協助操作時，不能代替業務勾選同意、核可範本或完成開通確認。'
    },
    {
      title: '團隊版範本先核可',
      body: '祝福與關懷範本須經主管核可才能使用，發出的訊息附上所屬公司或機構名稱。',
      team: true
    }
  ],
  donts: [
    '推薦保險商品、做商品比較或投資建議',
    '計算佣金',
    '核保預測',
    '撥號錄音',
    'AI 自動發社群文宣',
    '轉介紹發點數或獎勵'
  ],
  footnote: '以上為產品的設計與實作方式；實際合規以你所屬公司或機構的規定為準。'
};

/* ── 完整功能清單 ─────────────────────────────────────
 * 依推出階段分組只是內部對照；頁面用 allFeatures 不分階段列出。 */
export type RoadmapItem = { title: string; body: string; team?: boolean };
export const roadmap: Record<Phase, RoadmapItem[]> = {
  1: [
    { title: '客戶與家庭', body: '家庭關係、分級、沒有 LINE 的家人也能建檔' },
    { title: '保單整理', body: '跨公司集中，拍首頁帶入欄位，同號保單不重複' },
    { title: '家庭保障總表', body: '規則式缺口，可印成 PDF' },
    { title: '提醒與行事曆', body: '繳費、週年、生日，iCal 同步' },
    { title: '每日早報', body: '一天一則，推到你自己的 LINE' },
    { title: '生日與節日祝福', body: '含農曆，一鍵確認' },
    { title: '一對一訊息', body: '以你的名義回覆，來訊通知' },
    { title: '客戶在 LINE 看保單', body: '本人保單總表，家人各自同意' },
    { title: '客戶歷程', body: '對話、拜訪、保單、祝福同一條線' },
    { title: '拜訪活動量', body: '個人版看自己，團隊版主管看全隊' },
    { title: 'Excel 名單匯入', body: 'CSV 匯入客戶與保單' },
    { title: '同意、刪除與匯出', body: '告知版本留存，刪除連照片一起' }
  ],
  2: [
    { title: 'AI 業務助理', body: '早報理由、祝福草稿、面談整理、對話指令' },
    { title: '合規副駕', body: '送出前提醒不當用語' },
    { title: '送件與照會進度', body: '只記狀態，不記照會原因' },
    { title: '停效與流失燈號', body: '只給負責業務看' },
    { title: '年度檢視邀約', body: '客戶在 LINE 選時段' },
    { title: '生命事件提醒', body: '依家人生日推算入學、成年、退休' },
    { title: '保單辨識進階版', body: '多頁與存摺截圖' },
    { title: '保障需求試算', body: '規則式，不列商品' },
    { title: '名片與潛在客戶', body: '拍名片建檔' },
    { title: '數位名片與轉介紹', body: '記下誰介紹誰，不發獎勵' },
    { title: '理賠協助清單', body: '只記文件是否備齊，不收檔案' },
    { title: '增員與團隊業績', body: 'FYP／FYC 手動登錄', team: true },
    { title: '主管 AI 週報', body: '只含統計，不含個資', team: true }
  ],
  3: [
    { title: '面談需求摘要', body: '傳給客戶在 LINE 確認' },
    { title: '客戶在 LINE 問保單', body: '依保單欄位回答，理賠轉真人' },
    { title: '保單健診報告', body: '在 LINE 打開與簽收' },
    { title: '講座報名', body: 'LINE 報名與報到' },
    { title: '遺產與贈與稅試算', body: '預設關閉，核對年度稅率數字後才開啟' }
  ]
};

/** 頁面上的「全部功能」：不分階段 */
export const allFeatures: RoadmapItem[] = [...roadmap[1], ...roadmap[2], ...roadmap[3]];

/* ── 方案比較 ───────────────────────────────────────── */
export const planRows: { label: string; solo: string; team: string }[] = [
  { label: '給誰用', solo: '保險業務員、銀行理專、獨立理財顧問本人', team: '通訊處與業務團隊：業務、組長、區經理、處經理' },
  { label: 'LINE 官方帳號', solo: '用你自己的，既有好友直接保留', team: '團隊共用一個，訊息顯示負責業務的名字與頭像' },
  { label: '祝福範本', solo: '依職業別（保險、理專、顧問）內建，建立即可用', team: '固定保險業範本，主管核可後才能使用' },
  { label: '主管功能', solo: '沒有主管，看的是你自己的活動量', team: '主管儀表板、增員與團隊業績、主管週報' },
  { label: '開通方式', solo: '線上自助開通建置中；開放前由我們協助開通', team: '協助導入與教育訓練' },
  { label: '月費', solo: `NT$${SOLO_PRICE.toLocaleString('en-US')}／月`, team: '依團隊規模與導入範圍報價' }
];
export const planNote = '兩個版本是同一套系統，彼此獨立、資料不互通。LINE 官方帳號的訊息費依你的官方帳號方案由 LINE 計收，不含在月費內。';

/* ── 常見問題 —— 畫面與 FAQPage 結構化資料共用這一份 ─────── */
export const faqs: { q: string; a: string }[] = [
  {
    q: '現在可以開始使用了嗎？',
    a: `${PRODUCT_NAME} 尚未上線，搶先預約即將開放。想先了解功能或導入方式，可以用 LINE 詢問我們。`
  },
  {
    q: '我的客戶需要下載 App 嗎？',
    a: '不需要。客戶透過你的 LINE 官方帳號收到祝福、查看自己的保單總表、聯絡你，全部在 LINE 裡完成。'
  },
  {
    q: '個人版和團隊版有什麼不同？',
    a: '個人版給業務本人使用，接的是你自己的 LINE 官方帳號。團隊版給通訊處或業務團隊，共用一個官方帳號，訊息顯示負責業務的名字與頭像，並提供多層組織、範本核可與主管儀表板。兩個版本彼此獨立，資料不互通。'
  },
  {
    q: '我是銀行理專或獨立理財顧問，也可以用嗎？',
    a: '可以。個人版開放保險業務員、銀行理專與獨立理財顧問使用，祝福與提醒範本會依職業別切換。使用前請先確認所屬機構對客戶資料保存與行銷訊息的規定，你是這些客戶資料的控制者。'
  },
  {
    q: '需要準備自己的 LINE 官方帳號嗎？',
    a: '個人版需要你自己的 LINE 官方帳號，已經在經營的帳號可以直接接上，好友全部保留。LINE 訊息費用依你的官方帳號方案由 LINE 計收，不包含在月費內。'
  },
  {
    q: '系統會蒐集客戶的健康資料嗎？',
    a: '不會。系統沒有病歷、既往症與體檢的欄位；筆記、祝福與一對一回覆出現疾病或醫療字詞會直接擋下，保單辨識偵測到健康告知內容會整張捨棄。'
  },
  {
    q: 'AI 會自己傳訊息給我的客戶嗎？',
    a: '不會。AI 只產生草稿與建議，任何對客戶的訊息都要你確認才會發出；設定自動發送時只能使用範本原文，不能使用 AI 草稿。'
  },
  {
    q: '系統會推薦保險商品或提供投資建議嗎？',
    a: '不會。系統不提供商品推薦、商品比較或投資建議；保障缺口與需求試算都依你設定的規則計算，只顯示已有、建議與缺口，不列任何商品名稱。'
  },
  {
    q: '可以匯入我原本用 Excel 管理的客戶嗎？',
    a: '可以，支援從 CSV 匯入客戶與保單。匯入前需確認已取得當事人同意，系統會留下紀錄。'
  },
  {
    q: '費用怎麼計算？',
    a: `個人版每月 NT$${SOLO_PRICE.toLocaleString('en-US')}；團隊版依規模報價。LINE 官方帳號的訊息費用依你的官方帳號方案由 LINE 計收，不含在月費內。`
  }
];

/* ── 區塊標題（標題用 Noto Serif TC 子集，所以集中在這裡） ─── */
export const headings = {
  day: '業務的一天，從一張日曆紙開始',
  dayLead: '以下是同一天的六個時段，每個時段配一個產品畫面。產品尚未上線，畫面皆為示意。',
  client: clientSide.title,
  compliance: compliance.title,
  roadmap: '全部功能，一次看完',
  roadmapLead: '從客戶經營、LINE 關懷到團隊管理，保客+ 目前規劃的完整功能。',
  plans: '一個人經營，或整個通訊處一起用',
  faq: '還想知道的事',
  closing: PRODUCT_TAGLINE
};

/** 手寫註記用到的全部文字 */
const HAND_TEXT = [...dayEntries.map((d) => d.note), '宜', '忌', '示範人物皆為虛構'].join('');
/** 標題字型用到的全部文字（含日曆紙） */
const SERIF_TEXT = [
  PRODUCT_TAGLINE,
  ...Object.values(headings),
  ...dayEntries.map((d) => d.title),
  ...Object.values(calendarSheet).flat(),
  '0123456789個人版團隊版洽詢報價',
  familyMock.household
].join('');

/** 給 scripts/insurcrm-fonts.mjs 產生字型子集用；頁面不讀 */
export const FONT_SUBSET_TEXT = { serif: SERIF_TEXT, hand: HAND_TEXT };
