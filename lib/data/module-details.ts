/**
 * 模組說明頁內容。
 *
 * 每一條都對得上系統裡實際存在的後台頁面或功能 —— 來源是
 * line-crm-saas/apps/admin/docs/help/modules/*（後台操作說明書）與模組安裝腳本，
 * 只是把後台用語翻成客戶聽得懂的話。
 *
 * ⚠️ 系統沒有的功能不要寫進來。官網寫得出來、實際做不到，是最傷信任的一種錯。
 */

export type ModuleDetail = {
  /** 對應 crmModules 的 id，也是網址 /solutions/{slug} */
  slug: string;
  tagline: string;
  intro: string;
  forWho: string[];
  features: { title: string; description: string }[];
  /** 需要注意的前提或搭配關係 */
  note?: string;
};

export const moduleDetails: Record<string, ModuleDetail> = {
  // ══════════ 門市營運模組 ══════════
  pos_restaurant: {
    slug: 'pos_restaurant',
    tagline: '點餐、出單、結帳、對帳，一台平板做完',
    intro:
      '為餐飲現場設計的觸控收銀。店員在平板上點餐送單，廚房立刻看到；結帳時會員折扣與點數同時算完，當天營業額不用另外整理。',
    forWho: ['內用餐廳', '外帶店', '有廚房出單需求的店家', '多分店餐飲品牌'],
    features: [
      { title: '觸控點餐與送單', description: '以平板操作為前提設計的介面，選桌、點餐、加副選項、送單一氣呵成。' },
      { title: 'KDS 廚房看板', description: '送單後廚房螢幕立即顯示待製作品項，做好按一下就通知外場，不用喊單。' },
      { title: '桌位與桌況圖', description: '把餐廳平面圖當底圖，哪張桌在用、哪張空著、幾點有訂位，一眼看得到。' },
      { title: '分帳與拆單', description: '同一桌拆成多份各自結帳、各自開發票，多人聚餐各付各的不用手算。' },
      { title: '會員折扣與點數', description: '結帳時帶出會員資料，折扣、集點、扣儲值金在同一個畫面完成。' },
      { title: '促銷與快速折扣', description: '指定分類或單品設折扣規則自動套用；結帳頁的折扣按鈕可自訂顯示哪幾顆。' },
      { title: '菜品限量控管', description: '為單一菜色設定今天還能賣幾份，賣完 POS 自動標示售完。' },
      { title: '結算交班與日結單', description: '每班統計收款金額、各付款方式分類、現金差異，可直接印日結單對帳。' },
      { title: '出單機與出單站', description: '支援熱感應印表機列印廚房單與收據，多台印表機由固定電腦集中派送。' },
      { title: '桌邊點餐', description: '顧客掃桌上 QR 用自己的手機點餐送進廚房，尖峰時段少一個人力。' }
    ],
    note: '要開電子發票需搭配「發票管理」模組；要接受線上訂位需搭配「餐飲訂位」模組。'
  },

  pos_retail: {
    slug: 'pos_retail',
    tagline: '掃條碼結帳，庫存跟著動',
    intro:
      '零售門市的收銀與進銷存。採 SPU + 變體（SKU）架構，同一款商品的不同顏色尺寸各自算庫存，賣出、退貨、進貨、盤點都留下異動紀錄。',
    forWho: ['服飾與配件店', '生活雜貨店', '有庫存管理需求的門市', '需要退換貨流程的品牌'],
    features: [
      { title: '收銀檯', description: '搜尋商品、掃描條碼、加入購物車、辨識會員、結帳收銀在同一個畫面。' },
      { title: '商品與變體管理', description: '一個商品底下管理多個 SKU，顏色尺寸各自定價與計庫存。' },
      { title: '庫存異動全紀錄', description: '銷售、退款、進貨、盤點、手動調整都留下紀錄，庫存對不上時查得到原因。' },
      { title: '退換貨流程', description: '指定要退的品項與數量，走「待處理 → 已核准 → 已完成」的審核流程。' },
      { title: '低庫存提醒', description: '庫存低於門檻的商品集中列出，並可透過 LINE 通知負責人補貨。' },
      { title: '統計報表', description: '期間銷售概況、每日營收趨勢、熱賣商品排行一頁看完。' },
      { title: '收據自訂', description: '收據抬頭與結尾文字可自訂，並可設定結帳後自動列印。' }
    ]
  },

  pos_reservation: {
    slug: 'pos_reservation',
    tagline: '線上訂位、電話訂位、現場取號，同一份名單',
    intro:
      '顧客在 LINE 上完成訂位，店員在後台或 POS 看到同一筆資料。現場排隊取號、桌位安排、no-show 追蹤都在同一個模組裡。',
    forWho: ['需要接受訂位的餐廳', '假日會排隊的店家', '有翻桌時段規劃的餐廳', '多分店餐飲品牌'],
    features: [
      { title: '線上訂位', description: '顧客從 LINE 直接訂位，資料自動進入後台，不需要人工轉抄。' },
      { title: '三種管道統一檢視', description: '線上、電話、現場訂位顯示在同一份列表，並標示哪一筆是客人自己訂的。' },
      { title: '取號排隊', description: '現場開立取號票、依序叫號、選桌入座，畫面顯示每組已等候幾分鐘。' },
      { title: '桌位平面圖', description: '把桌位拖曳配置成平面圖，直接把訂位拖到桌上完成指派。' },
      { title: '新訂位即時提醒', description: '有新的線上訂位會跳通知並發出提示音，不會漏接。' },
      { title: 'LINE 自動通知', description: '訂位成功、提醒、變更、取消自動推播給顧客，降低 no-show。' },
      { title: 'no-show 黑名單', description: '累計未到次數自動標記，訂位時看得到風險提示。' },
      { title: '命名時段', description: '為高級餐廳或有翻桌邏輯的店家設定限時用餐與指定時段。' },
      { title: '我的訂位', description: '顧客用 LINE 身分一次看到自己所有訂位，不必記訂位編號。' }
    ],
    note: '每間分店可各自設定營業時段、公休日與訂位規則。'
  },

  pos_invoice: {
    slug: 'pos_invoice',
    tagline: '結帳完成，發票自動開出來',
    intro:
      '電子發票開立、作廢、折讓與列印。結帳時自動觸發開立，發票證明聯直接從店裡的出單機印出來，字軌與捐贈碼在後台集中管理。',
    forWho: ['需要開立電子發票的門市', '有捐贈碼需求的店家', '需要 B2B 三聯發票的公司'],
    features: [
      { title: '結帳自動開票', description: '開啟後每筆結帳完成自動開立電子發票，不用另外操作。' },
      { title: '發票列表與匯出', description: '草稿與正式發票集中管理，可開立、作廢、列印與匯出 CSV。' },
      { title: '折讓證明單', description: '發票開立後金額有變動時走折讓流程，與作廢是兩條不同的路。' },
      { title: '捐贈碼管理', description: '維護愛心碼清單，消費者結帳時可選擇捐贈發票給指定機構。' },
      { title: '會員載具', description: '支援個人載具與手機條碼，顧客不用拿紙本也能存到發票。' },
      { title: '離線字軌', description: '需要時可自行分配發票字軌號碼區段。' },
      { title: '出單機列印', description: '發票證明聯走與收據、廚房單相同的列印路徑。' }
    ],
    note: '每間分店各自設定發票參數與服務商。'
  },

  beauty_booking: {
    slug: 'beauty_booking',
    tagline: '預約、班表、開單、儲值金，設計師與櫃台共用一套',
    intro:
      '美業的預約與收銀。顧客在 LINE 選設計師與服務項目預約，班表自動擋掉沒排班的時段；做完在櫃台開單結帳，可扣儲值金。',
    forWho: ['美甲與美睫', '美髮沙龍', '美容 SPA', '需要指定服務人員的店家'],
    features: [
      { title: 'LINE 線上預約', description: '顧客選服務人員、項目與時段自行完成預約，不必來回訊息確認。' },
      { title: '服務人員與班表', description: '每位人員設定可預約時段，未排班不開放預約；班表可用 CSV 批次匯入。' },
      { title: '指定設計師加價', description: '不同資歷的服務人員可設定加價，預約與結帳時自動計入。' },
      { title: 'POS 開單與結帳', description: '開單、加購項目、折扣、結帳分成兩頁設計，符合現場先做後結的流程。' },
      { title: '儲值金', description: '顧客預先儲值，消費時直接扣款；扣款前會請會員在 LINE 上確認。' },
      { title: '派工單', description: '服務完成後由設計師用 LINE 填寫內部紀錄，記下客戶狀況、用料與技法。' },
      { title: '預約看板', description: '當日所有預約依時間軸排列，誰在做誰空著一眼看得到。' },
      { title: '業績結算', description: '依人員、依項目、依時段三個維度看業績，店長與老闆日常對帳用。' },
      { title: '行銷活動', description: '設定促銷方案，結帳時自動套用。' }
    ]
  },

  ecommerce: {
    slug: 'ecommerce',
    tagline: '線上商城，訂單與會員接回同一套系統',
    intro:
      '完整的線上購物流程：商品上架、購物車、金流、配送、訂單通知。買過的紀錄回到同一筆會員資料上，線上線下的消費合併計算。',
    forWho: ['想開線上商城的實體店', '有宅配或超商取貨需求', '販售數位商品', '需要預購或限時搶購'],
    features: [
      { title: '商品與規格管理', description: '支援單規格與多規格商品、多圖、SEO 設定與庫存管控。' },
      { title: '訂單處理工作台', description: '訂單狀態追蹤、出貨作業、物流單號填寫、退款執行集中在一頁。' },
      { title: '折扣碼', description: '金額折扣、百分比折扣或免運，可設定使用期限與次數。' },
      { title: '限時搶購', description: '指定商品在指定時段以優惠價販售，可設定活動限量。' },
      { title: '預購管理', description: '商品到貨前先開放下單，到貨前透過 LINE 批次通知所有預購者。' },
      { title: '棄單追蹤', description: '找出加了購物車卻沒結帳的顧客，用 LINE 推播提醒回來完成付款。' },
      { title: '退換貨申請', description: '顧客提出退款、退貨、換貨請求，走審核到完成的流程節點。' },
      { title: '配送與付款方式', description: '宅配、超商取貨、自取、數位寄送各自設定運費規則。' },
      { title: '訂單 LINE 通知', description: '每個訂單事件可獨立開關要不要推播給顧客。' },
      { title: '數位商品序號', description: '付款完成後自動交付序號、下載連結或教學內容。' }
    ]
  },

  hr_attendance: {
    slug: 'hr_attendance',
    tagline: '打卡、排班、請假、月結薪資統計',
    intro:
      '員工用手機打卡，班表與出勤紀錄自動對照。請假與加班走線上審核，月底直接產出結算報表，不用再對紙本班表。',
    forWho: ['需要輪班的門市', '有排班需求的餐飲美業', '需要月結工時統計的公司'],
    features: [
      { title: '多種打卡方式', description: '支援 QR、GPS、IP 等方式打卡，依門市狀況選擇。' },
      { title: '班次模板與排班月曆', description: '先建立班次模板，再用月曆排班，重複的班表不用每次重填。' },
      { title: '出勤規則', description: '設定遲到、早退、休息時間等判定規則，系統自動比對打卡紀錄。' },
      { title: '請假審核', description: '員工線上請假、主管線上審核，假別可自行設定。' },
      { title: '加班審核', description: '加班申請走同一套審核流程，時數自動累計。' },
      { title: '月結報表', description: '每月出勤、請假、加班時數彙整成報表，薪資結算的依據。' },
      { title: '員工薪資設定', description: '記錄每位員工的薪資條件，供月結統計使用。' }
    ]
  },

  course_enrollment: {
    slug: 'course_enrollment',
    tagline: '開課、報名、報到、追蹤學習歷程',
    intro:
      '課程與聚會的完整流程。學員在 LINE 上看課表報名，現場掃 QR 報到，完課紀錄留在會員資料裡，之後要邀他上下一門課有依據。',
    forWho: ['開課單位與講師', '舉辦講座與工作坊', '社群聚會主辦者', '需要追蹤學員歷程的機構'],
    features: [
      { title: '課程與場次', description: '建立課程主檔後排場次，月曆視圖一眼看出哪天有課。' },
      { title: 'LINE 報名', description: '學員在 LINE 內選課報名，報名成功自動發通知與報到 QR。' },
      { title: '掃碼報到', description: '現場用 QR 掃描完成出席確認，取代紙本點名。' },
      { title: '線上付款報名', description: '可接綠界金流線上收款，付款成功才正式佔位。' },
      { title: '折扣碼', description: '發放折扣代碼折抵報名費，折後金額同步反映在報名紀錄。' },
      { title: '講師與講義', description: '管理講師資料與課程講義，學員可在課前課後下載。' },
      { title: '學員歷程', description: '每位學員報過哪些課、報到與完課狀況、累計消費一次看完。' },
      { title: '線上講座', description: '嵌入 YouTube 影片型講座，學員在 LINE 內直接觀看。' },
      { title: '課後陪跑', description: '為已完課學員安排後續輔導場次，延長課程的服務週期。' },
      { title: '聚會管理', description: '讀書會、社群交流這類非正式課程另有獨立的聚會主檔。' }
    ]
  },

  venue_booking: {
    slug: 'venue_booking',
    tagline: '場地時段線上預約與審核',
    intro:
      '把場地的可用時段開放線上預約。顧客自行選時段送出申請，管理端審核、收訂金、記錄收款，封閉日期優先於一般規則。',
    forWho: ['活動場地與教室出租', '攝影棚與工作室', '運動場館', '會議空間'],
    features: [
      { title: '場地管理', description: '建立場地資料，含容量、計價方式、設備標籤與封面圖。' },
      { title: '可預約規則', description: '設定每個場地開放預約的時段，規則之外的時間不會出現在選項裡。' },
      { title: '預約審核', description: '預約送出後由管理端確認，可設定是否需要人工審核。' },
      { title: '封閉日期', description: '維修、包場、休假期間關閉預約，優先權高於一般規則。' },
      { title: '訂金與退費', description: '設定訂金比例與取消退費政策，並記錄收款狀態。' },
      { title: '統計報表', description: '依月份看各場地的預約數與收入表現。' }
    ]
  },

  hotel_booking: {
    slug: 'hotel_booking',
    tagline: '房型、房況、加價規則與訂房管理',
    intro:
      '民宿與旅館的線上訂房。顧客選日期區間與房型下單，房況月曆顯示未來每天的剩餘房數，週末與連假可自動加價。',
    forWho: ['民宿', '旅館與飯店', '有加購服務的住宿業者'],
    features: [
      { title: '房型管理', description: '房型名稱、可住人數、床型設施、照片與定價集中設定。' },
      { title: '日期區間訂房', description: '顧客選入住與退房日期，系統自動計算可訂房數與總價。' },
      { title: '房況月曆', description: '未來 14 天每個房型的剩餘可訂數一覽，哪天快滿一眼看到。' },
      { title: '加價規則', description: '週末、連假或特定節日相對標準房價加價，可設比例或固定金額。' },
      { title: '加購項目', description: '早餐、接送、SPA、停車位等附加服務讓顧客訂房時一起選。' },
      { title: '入住與退房', description: '訂單支援審核、Check-in、Check-out、取消與收款記錄。' },
      { title: '封閉日期', description: '包場、整修、休業期間關閉該區間的訂房。' },
      { title: '訂金與退費政策', description: '設定訂金比例、取消截止時間與退費規則。' }
    ]
  },

  case_dispatch: {
    slug: 'case_dispatch',
    tagline: '案件派遣、接案者分級、課後回饋',
    intro:
      '把案件或課程發給外部接案者。可以開放搶案，也可以直接指派；接案者分等級決定能接哪些案，完成後系統自動建立結算單。',
    forWho: ['派遣師資的教育機構', '外包接案的服務業', '需要管理外部人員的組織'],
    features: [
      { title: '案件與課程主檔', description: '兩種類型：接案者搶案的派遣案件，以及指派給老師的課程。' },
      { title: '搶案與指派', description: '案件發布後開放搶案，或由後台直接指定承接人。' },
      { title: '接案者分級', description: '設定等級門檻，發案時限定最低等級才能接。' },
      { title: '學員 QR 加入', description: '學員掃 QR 加入課程或案件，名單自動進系統。' },
      { title: '課後回饋', description: '學員用 LINE 填寫評分與評語，用來監控服務品質。' },
      { title: '結算管理', description: '案件完成自動建立待結算單，確認後標記撥款。' },
      { title: '統計報表', description: '案件總數、進行中數、評分分布與每位接案者的 KPI。' }
    ]
  },

  cram_school: {
    slug: 'cram_school',
    tagline: '點名、聯絡簿、成績、學費，家長在 LINE 收得到',
    intro:
      '補習班的日常行政。學生綁定家長會員後，點名、聯絡簿、成績、公告與學費催繳都能推到家長的 LINE，不用再靠紙本轉交。',
    forWho: ['補習班與才藝班', '安親班', '需要與家長密集溝通的教學單位'],
    features: [
      { title: '學生與家長綁定', description: '一位學生可綁多位家長會員，綁定後家長就能在 LINE 收到通知。' },
      { title: '班級管理', description: '建立班級與課表，指派任課老師。' },
      { title: '每日點名', description: '老師逐班點名簽到，出缺席紀錄留存。' },
      { title: '電子聯絡簿', description: '依日期與學生填寫學習狀況，一鍵推送到家長 LINE。' },
      { title: '成績管理', description: '先建立考試再輸入各學生分數，家長看得到孩子的成績變化。' },
      { title: '學費帳單', description: '以班級為單位批次開立同金額帳單，可逐筆推 LINE 催繳並記錄收款。' },
      { title: '公告發布', description: '針對特定班級或全校家長發布公告，發布時同步推播。' },
      { title: '老師今日待辦', description: '我教的班、今日點名完成度、待輸入分數、未繳費學生整理在一頁。' }
    ]
  },

  temple_management: {
    slug: 'temple_management',
    tagline: '點燈、安太歲、抽籤、香油錢線上化',
    intro:
      '宮廟的信眾服務。點燈認購、法事報名、隨喜功德在 LINE 上完成，名單自動建檔，不用再手抄與人工核對。',
    forWho: ['宮廟與寺院', '有點燈與法會需求的宗教團體'],
    features: [
      { title: '燈座管理', description: '建立光明燈、太歲燈、文昌燈等類別與座位，管理認購狀態。' },
      { title: '線上認購', description: '信眾用 LINE 填寫姓名、農曆生日、地址與祈求事項完成點燈申請。' },
      { title: '安太歲與補運名單', description: '安太歲、補財庫、解冤親債主等法事項目的申請名單集中管理。' },
      { title: '電子籤詩', description: '可建立多個籤詩庫，信眾在 LINE 上抽籤並看到籤詩內容。' },
      { title: '香油錢明細', description: '線上隨喜功德紀錄，也可手動補登現場與匯款捐獻。' },
      { title: '法會推播', description: '對信眾名單發送法會與活動通知。' },
      { title: '線上金流', description: '設定匯款帳號與線上收款憑證，讓信眾直接完成付款。' }
    ]
  },

  // ══════════ 顧客互動模組 ══════════
  ai_customer_service: {
    slug: 'ai_customer_service',
    tagline: '常見問題交給 AI，複雜的轉真人',
    intro:
      '用你自己的資料訓練的 LINE 客服。回答依據來自你建的知識庫，答不出來或顧客要求時轉給真人，對話紀錄完整保留。',
    forWho: ['常被問重複問題的品牌', '客服人力有限的店家', '營業時間外仍有詢問的商家'],
    features: [
      { title: '知識庫', description: 'AI 回答的事實來源，分成分類、FAQ 與文件三種形式管理。' },
      { title: '意圖與工具', description: '定義顧客可能的請求類別，並指定 AI 在該情境可以呼叫哪些查詢工具。' },
      { title: '轉真人工作台', description: '需要人工處理的對話集中在待接手、處理中、已結案三個分頁。' },
      { title: '對話歷史', description: '保留來自 LINE、測試與網頁三個管道的完整對話與處理狀態。' },
      { title: '測試對話', description: '沙盒環境模擬顧客訊息，調整前先確認 AI 會怎麼回。' },
      { title: '成效統計', description: '對話量、成本、滿意度與熱門問題排行，知道知識庫該補什麼。' },
      { title: '回覆行為設定', description: '調整語氣、生成參數、知識庫比對規則與轉真人的觸發條件。' }
    ]
  },

  invoice_reward: {
    slug: 'invoice_reward',
    tagline: '登錄發票換獎勵，把別家的消費者變成你的會員',
    intro:
      '消費者上傳發票就能換點數、票券或抽獎機會。可以登錄別家商店的發票，適合品牌主辦的跨通路促銷，參加者會留在你的會員名單裡。',
    forWho: ['辦促銷活動的品牌', '想蒐集消費者名單', '在通路上架的商品品牌'],
    features: [
      { title: '活動管理', description: '建立登錄活動並設定規則與獎勵內容。' },
      { title: '三種登錄方式', description: '支援掃 QR、輸入條碼，或直接拍照上傳由系統辨識。' },
      { title: '獎勵發放', description: '依規則自動發點數、票券、抽獎機會或貼標籤。' },
      { title: '登錄紀錄', description: '保留發票號碼、登錄方式、驗證結果與品項明細，可追溯每一筆。' },
      { title: '活動範本', description: '把設定存成範本，下次辦活動一鍵帶入。' },
      { title: '黑名單', description: '封鎖特定會員，避免同一人反覆刷獎勵。' },
      { title: '成效統計', description: '期間登錄張數、核准率、發放點數與活躍會員數。' }
    ]
  },

  event_module: {
    slug: 'event_module',
    tagline: '婚禮、尾牙、春酒的報到與現場互動',
    intro:
      '一次性大型聚會的完整流程。賓客名單、桌位安排、現場 QR 報到、抽獎與感謝牆都在同一個模組裡，活動結束名單留在會員系統。',
    forWho: ['辦尾牙春酒的公司', '婚禮主辦', '大型聚餐與週年活動'],
    features: [
      { title: '賓客名單與桌位', description: '管理出席名單並安排桌次，現場帶位不用翻紙本。' },
      { title: '賓客自助報名', description: '開放賓客自己填寫報名資料，省去人工蒐集。' },
      { title: '現場 QR 報到', description: '掃碼完成報到，即時知道到了多少人。' },
      { title: '現場抽獎', description: '活動中直接抽獎，名單來自實際報到的賓客。' },
      { title: '感謝牆', description: '賓客留言即時顯示在大螢幕，可設定要不要先審核。' },
      { title: '管理員通知', description: '指定哪些管理員會收到新報名與新留言的通知。' }
    ]
  },

  market_expo: {
    slug: 'market_expo',
    tagline: '攤位集點與完攤抽獎，讓訪客把整場逛完',
    intro:
      '市集、展覽與園遊會的參與機制。訪客掃攤位 QR 集點，集滿參加完攤抽獎；攤主可以用 LINE 登入自行管理攤位資料。',
    forWho: ['市集與園遊會主辦', '展覽承辦單位', '商圈與商會活動'],
    features: [
      { title: '展覽與攤商管理', description: '建立活動並管理參展攤位資料。' },
      { title: '攤位 QR 集點', description: '訪客掃攤位 QR 累積點數，動線設計得以引導人潮走完全場。' },
      { title: '完攤抽獎', description: '集滿指定點數才能參加抽獎，提高逛完全場的誘因。' },
      { title: '電子名片與型錄', description: '訪客可收藏攤商的名片與型錄，活動後仍聯絡得上。' },
      { title: '攤主自助管理', description: '攤主用 LINE 登入自行維護攤位內容，主辦不用代為修改。' },
      { title: '集點規則設定', description: '每間分店可各自設定集點規則與管理員通知。' }
    ]
  },

  game_community: {
    slug: 'game_community',
    tagline: '把會員從收優惠券，變成會回來互動',
    intro:
      '品牌自己的社群空間。會員在 LINE 內發文、留言、按讚，累積等級與勳章，高等級才能解鎖特定票券或課程。',
    forWho: ['想經營品牌社群', '會員黏著度需要提升', '有課程或內容可以分級開放'],
    features: [
      { title: '貼文與留言', description: '會員在 LIFF 發文互動，後台可隱藏、精選、置頂與處理檢舉。' },
      { title: '等級曲線', description: '自訂累積多少分升級、每一級的名稱與顏色。' },
      { title: '勳章與成就', description: '勳章在條件觸發時發放，成就則有進度條需要長期累積。' },
      { title: '排行榜', description: '本週、本月、總榜三種排名，把競爭氛圍視覺化。' },
      { title: '每日打卡', description: '每天回來簽到累積積分，養成回訪習慣。' },
      { title: '解鎖權限', description: '把票券、課程、貼文分類綁定到等級，達到才看得到。' },
      { title: '積分紀錄', description: '所有積分事件的流水帳，可查詢也可手動發放。' }
    ]
  }
};

export function getModuleDetail(slug: string) {
  return moduleDetails[slug];
}
