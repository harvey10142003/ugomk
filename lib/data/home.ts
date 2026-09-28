/**
 * 首頁文案與產品畫面資料（2026-09-28 改版）。
 *
 * 文字出處：
 *   - 區塊標題、說明、清單：docs/copy-rewrite-2026-07.md（Shark 親撰），原文照用，只重排版面。
 *   - 產品畫面上的欄位與流程：對照 CRM 實作，出處寫在各段註解；
 *     與 app/solutions/{loyalty,marketing-automation}/page.tsx 檔頭的出處清單同一套。
 *   - 手寫註記（hand）：畫面旁的旁註，只說「這裡發生了什麼」，不寫行銷話術。
 *
 * 畫面上的店家與會員全是虛構（「示範店家」「林小姐」），不可以換成真實客戶名字。
 *
 * 改了 heading／hand 的字之後執行 `node scripts/site-fonts.mjs` 重新產生字型子集
 * （沒重跑也不會壞：子集裡沒有的字退回黑體）。
 */

/** 示範畫面裡的店名 —— 虛構，不可換成客戶名 */
export const DEMO_SHOP = '示範店家';

export const hero = {
  kicker: 'LINE 官方帳號 × CRM × 行銷自動化',
  title: '讓 LINE 不只是發訊息，而是把客戶留下來',
  lead: '整合會員資料、標籤、點數、票券、預約、推播與門市營運，讓顧客從加入好友、互動、消費到再次回購，都能在同一套流程中完成。',
  sub: '不需要一開始買下所有功能。從目前最需要的模組開始，未來再跟著營運規模增加。',
  industries: ['餐飲', '美業', '零售', '教育課程', '活動展會', '多分店品牌'],
  notes: {
    member: '加好友那一刻就建檔',
    pos: '結帳回到同一位會員'
  }
};

export const problem = {
  title: 'LINE 好友不少，卻沒有真正變成會員？',
  intro: '很多企業已經經營 LINE 官方帳號，卻仍然遇到這些問題：',
  items: [
    '好友加入之後，不知道他是誰、對什麼有興趣。',
    '每次推播都發給所有人，訊息費增加，效果卻不一定提升。',
    '會員、預約、點數、票券與消費資料分散在不同系統。',
    '活動結束後沒有後續追蹤，辛苦取得的名單慢慢失去聯繫。',
    '分店與員工各自管理資料，總部很難掌握實際營運狀況。'
  ],
  conclusion: '真正需要解決的，不只是「怎麼發訊息」，而是如何把每一次互動留下來，成為下一次成交的基礎。'
};

/**
 * 顧客旅程：加入好友 → 互動 → 消費 → 再次回購（順序出自首屏那句話，是真的先後，所以有編號）。
 * 前三站與最後一站對應 Shark 文案「解決方案區塊」的四點；「互動」那站的說明是依實作補的：
 *   圖文選單依等級切換 rich-menu-rules.ts、問卷答案貼標籤 survey.ts、點數兌換票券 voucher.ts。
 * 第四點「從單店管理到多店營運」不是旅程的一站，放在旅程下方。
 */
export const journey = {
  title: '把會員經營與日常營運，接進 LINE 裡',
  lead: '顧客不需要另外下載 App，透過原本熟悉的 LINE，就能完成會員登入、預約、領券、集點、查詢與消費互動。企業則能在後台掌握會員資料與行為，安排更適合的行銷流程。',
  stops: [
    {
      id: 'join',
      step: '加入好友',
      title: '認識你的會員',
      body: '整合會員資料、標籤、等級、來源與互動紀錄，不再只看到一串沒有分類的好友名單。'
    },
    {
      id: 'engage',
      step: '互動',
      title: '每個人看到自己的入口',
      body: '圖文選單依會員等級切換，問卷答案自動貼上標籤，點數可以直接換成票券，全部在 LINE 裡完成。'
    },
    {
      id: 'buy',
      step: '消費',
      title: '讓互動直接走向消費',
      body: '將預約、點數、票券、儲值與商品服務整合進 LINE，縮短顧客從看到訊息到採取行動的距離。'
    },
    {
      id: 'return',
      step: '再次回購',
      title: '在適合的時間主動聯繫',
      body: '依照加入時間、會員標籤、消費狀況、生日或活動日期，自動發送提醒、票券與回購訊息。'
    }
  ],
  multiStore: {
    title: '從單店管理到多店營運',
    body: '總部、店長、店員與收銀人員依照權限使用系統，各分店資料清楚分流，會員權益也能依需求跨店使用。'
  }
};

/**
 * 行銷自動化。畫面上的劇本欄位對照 ma-engine.ts：
 *   觸發「久未回訪」（每日掃描型）、篩選（等級／標籤）、動作「發送票券」、
 *   啟用前預估人數 previewScanForRule、黑名單與已封鎖者不發通知。
 */
export const automation = {
  title: '設定一次，該做的會員跟進自動完成',
  lead: '行銷自動化不是一直傳訊息，而是在適合的時間，對適合的會員說適合的話。例如：',
  items: [
    '新會員加入後，自動發送歡迎訊息與入會好禮。',
    '完成問卷後，依照答案自動分類會員標籤。',
    '預約日前一天，自動發送提醒，降低臨時取消與未到店。',
    '消費一段時間後，自動發送回購券或關懷訊息。',
    '會員生日、升等或點數即將到期時，自動通知。',
    '不同會員等級，顯示不同的圖文選單與專屬入口。'
  ],
  outro: '讓團隊少做重複工作，也避免重要的顧客跟進被遺漏。',
  note: '啟用前先算給你看'
};

/**
 * POS。儲值金扣款要會員在 LINE 按確認（beauty-booking.ts，30 分鐘逾時）；
 * 這個流程只在美業預約與零售 POS，所以畫面用美業結帳，不畫成餐飲。
 */
export const pos = {
  title: '預約、會員與結帳，不必各用一套系統',
  lead: '現場人員在平板完成預約確認、服務選擇、會員折扣、點數與儲值金扣款。每一筆交易都能回到會員資料中，成為後續分眾與回購行銷的依據。',
  items: [
    '美業預約、指定服務人員與加價項目。',
    '餐飲點餐、廚房出單與會員優惠。',
    '零售結帳、會員折扣與點數累積。',
    '多分店會員共用與營運資料管理。'
  ],
  note: '扣儲值金前，會員先在 LINE 按確認'
};

/** 主要功能：Shark 文案的八項，連到站內對應的說明頁 */
export const features = {
  title: '從會員經營到門市營運，一套系統彈性組合',
  items: [
    { title: '會員 CRM', body: '管理會員基本資料、標籤、群組、等級、互動紀錄與消費狀況。', href: '/solutions' },
    { title: '點數與票券', body: '設定集點、兌換、優惠券、禮品券、轉贈與會員專屬活動。', href: '/solutions/loyalty' },
    { title: '推薦與分享', body: '透過推薦碼與分享連結記錄推薦來源，規劃會員邀請與口碑成長活動。', href: '/solutions/referral' },
    { title: '預約與報名', body: '整合服務預約、設計師班表、課程報名、活動簽到與提醒通知。', href: '/solutions/beauty_booking' },
    { title: 'POS 與門市管理', body: '依照餐飲、美業與零售需求整合結帳、會員、儲值、庫存與服務紀錄。', href: '/solutions/pos_restaurant' },
    { title: '多分店管理', body: '設定總部、店長、店員與收銀人員權限，讓各店資料分流、總部集中掌握。', href: '/solutions' },
    { title: '問卷與會員標籤', body: '顧客填寫資料後，自動依答案貼上標籤，作為後續分眾溝通依據。', href: '/solutions/marketing-automation' },
    { title: '抽獎與互動活動', body: '支援轉盤、刮刮樂、拉霸、活動報名與票券兌換，讓活動名單回到會員系統中。', href: '/solutions' }
  ]
};

/**
 * 宇果優勢（顧問式導入）。
 * 背景那一行的事實出處：lib/data/about.ts 的 milestones（公司登記 2020、2024 轉做 LINE@、2026 自建系統）；
 * BNI 顧問身分出自 Shark 本人的背景資料 —— 回報中列為待 Shark 確認可否公開。
 */
export const consult = {
  title: '我們不只提供系統，也協助你把流程規劃好',
  lead: '很多系統功能很多，真正導入後卻不知道該怎麼用。宇果從企業實際的顧客流程出發，先釐清這五件事，再決定需要導入哪些功能。',
  questions: ['客戶從哪裡來', '加入後看什麼', '如何互動', '怎麼成交', '何時再次聯繫'],
  items: [
    { title: '顧問式導入', body: '不是交付一個空白後台，而是根據你的產業、客群與營運方式，規劃實際可執行的會員流程。' },
    { title: '模組化建置', body: '只啟用目前需要的功能，降低導入成本與教育負擔。未來增加分店或新服務時，再彈性擴充。' },
    { title: '產業流程整合', body: '餐飲點餐、美業預約、課程報名、會員票券、POS 收銀與活動系統，都能依照產業情境組合。' },
    { title: '客製化串接', body: '現有系統無法滿足的欄位、流程或第三方服務，可依實際需求評估 API 串接與客製開發。' }
  ],
  background: [
    { label: '2020', text: '在高雄成立，從設計與網站建置做起' },
    { label: '2024', text: '專注 LINE 官方帳號的會員經營' },
    { label: '2026', text: '自建 UGO AI CRM，系統自己寫、自己維護' },
    { label: '顧問', text: 'BNI 富聯白金分會 LINE 行銷顧問' }
  ],
  hand: '先把流程走一遍，再開模組'
};

export const cases = {
  title: '不同產業，需要不同的會員流程',
  lead: '我們不套用同一個範本，而是依照每個產業的實際工作方式調整。'
};

export const pricing = {
  title: '從現在需要的功能開始',
  lead: '不必一次導入所有模組。我們會依照分店數量、會員規模、使用功能與是否需要客製串接，建議合適的方案。'
};

export const finalCta = {
  title: '先不用決定買哪個方案，從你現在卡住的地方開始談',
  // 這句是對 /contact 表單的承諾：表單問的是產業、分店數量與想解決的問題，沒有問好友數
  lead: '你可以告訴我們目前的產業、分店數量，以及最希望改善的問題。我們會先協助判斷：',
  items: ['哪些流程適合放進 LINE。', '現有系統是否能繼續使用。', '需要哪些模組，不需要哪些功能。', '預計的導入方式與費用範圍。']
};

/** 標題（襯線）與手寫註記用到的字 —— scripts/site-fonts.mjs 讀這個產生子集 */
const SERIF_TEXT = [
  hero.title,
  problem.title,
  problem.conclusion,
  journey.title,
  ...journey.stops.map((s) => s.title + s.step),
  journey.multiStore.title,
  automation.title,
  pos.title,
  features.title,
  consult.title,
  ...consult.questions,
  ...consult.items.map((i) => i.title),
  cases.title,
  pricing.title,
  finalCta.title,
  '入門成長專業方案',
  '0123456789'
].join('');

const HAND_TEXT = [hero.notes.member, hero.notes.pos, automation.note, pos.note, consult.hand, '畫面為系統示意，店家與會員皆為虛構'].join('');

export const FONT_SUBSET_TEXT = { serif: SERIF_TEXT, hand: HAND_TEXT };
