/**
 * 模組頁的互動 demo 腳本。
 *
 * 每個模組是一組「步驟」，使用者點步驟（或讓它自動播）就看到對應的畫面變化。
 * 畫面不是截圖，是用少數幾種版型 + 資料描述出來的 —— 18 個模組各手刻一套互動會失控，
 * 而且截圖一改版就過期，資料驅動的版型改一次全部跟著更新。
 *
 * 內容仍以系統實際功能為準（來源同 module-details.ts）。
 */

export type DemoScreen =
  /** LINE 對話（顧客端） */
  | {
      kind: 'chat';
      title: string;
      messages: { from: 'brand' | 'user'; text: string }[];
      menu?: string[];
    }
  /** 列表（後台 / 管理端） */
  | {
      kind: 'list';
      title: string;
      caption?: string;
      rows: { left: string; sub?: string; right?: string; badge?: string; tone?: 'ok' | 'warn' | 'muted' }[];
    }
  /** 表單（填寫 / 設定） */
  | {
      kind: 'form';
      title: string;
      fields: { label: string; value: string; hint?: string }[];
      submit?: string;
    }
  /** 格狀選擇（商品 / 桌位 / 時段 / 房型） */
  | {
      kind: 'grid';
      title: string;
      caption?: string;
      items: { label: string; sub?: string; state?: 'on' | 'off' | 'busy' }[];
    }
  /** 數據卡（報表 / 結算） */
  | {
      kind: 'stats';
      title: string;
      stats: { label: string; value: string; hint?: string }[];
      rows?: { left: string; right: string }[];
    };

export type DemoStep = {
  /** 步驟標籤，顯示在切換列上 */
  label: string;
  /** 這一步在做什麼 */
  caption: string;
  /** 誰在操作 */
  actor: '顧客' | '店員' | '老闆' | '系統' | '家長' | '學員' | '信眾' | '員工' | '接案者' | '攤主' | '賓客';
  device: 'phone' | 'tablet' | 'desktop';
  screen: DemoScreen;
};

export type ModuleDemo = {
  title: string;
  intro: string;
  steps: DemoStep[];
};

export const moduleDemos: Record<string, ModuleDemo> = {
  // ══════════ 門市營運 ══════════
  pos_restaurant: {
    title: '從點餐到結帳，走一遍看看',
    intro: '點下面的步驟，看同一筆訂單在店員、廚房與老闆眼中分別長什麼樣。',
    steps: [
      {
        label: '點餐',
        caption: '店員在平板選桌、點餐、加副選項，送單一次完成。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'grid',
          title: 'A3 桌 · 點餐',
          caption: '選擇餐點後送單，廚房立即收到',
          items: [
            { label: '招牌牛肉麵', sub: '$180', state: 'on' },
            { label: '滷肉飯', sub: '$60', state: 'on' },
            { label: '燙青菜', sub: '$50' },
            { label: '貢丸湯', sub: '$40' },
            { label: '限量控肉飯', sub: '剩 3 份', state: 'busy' },
            { label: '古早味紅茶', sub: '$35' }
          ]
        }
      },
      {
        label: '廚房出單',
        caption: '送單後廚房看板立刻顯示，做好按一下就通知外場。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: 'KDS 後廚看板',
          caption: '待製作 2 單',
          rows: [
            { left: 'A3 桌 · 招牌牛肉麵 x1', sub: '18:42 送單 · 已過 3 分鐘', badge: '製作中', tone: 'warn' },
            { left: 'A3 桌 · 滷肉飯 x1', sub: '18:42 送單', badge: '製作中', tone: 'warn' },
            { left: 'B1 桌 · 貢丸湯 x2', sub: '18:39 送單', badge: '已完成', tone: 'ok' }
          ]
        }
      },
      {
        label: '結帳',
        caption: '結帳時帶出會員，折扣與點數同時算完。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'stats',
          title: 'A3 桌 · 結帳',
          stats: [
            { label: '小計', value: '$240' },
            { label: '會員 9 折', value: '-$24' },
            { label: '應收', value: '$216' }
          ],
          rows: [
            { left: '會員', right: '林小姐 · 金卡' },
            { left: '本次獲得點數', right: '+21 點' },
            { left: '付款方式', right: '信用卡' }
          ]
        }
      },
      {
        label: '對帳',
        caption: '當天營業額不用另外整理，交班直接看結算。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '今日結算',
          stats: [
            { label: '營業額', value: '$38,420', hint: '較昨日 +12%' },
            { label: '訂單數', value: '96' },
            { label: '客單價', value: '$400' }
          ],
          rows: [
            { left: '現金', right: '$12,300' },
            { left: '信用卡', right: '$21,120' },
            { left: '行動支付', right: '$5,000' }
          ]
        }
      }
    ]
  },

  pos_retail: {
    title: '掃條碼結帳，庫存跟著動',
    intro: '看一筆零售銷售如何同時處理收銀、會員與庫存。',
    steps: [
      {
        label: '掃描商品',
        caption: '掃條碼或搜尋商品加入購物車，變體各自算庫存。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'list',
          title: '收銀檯',
          caption: '購物車 2 件',
          rows: [
            { left: '棉質上衣 / 白 / M', sub: 'SKU-1042 · 庫存 8', right: '$690' },
            { left: '帆布托特包', sub: 'SKU-2277 · 庫存 3', right: '$480', badge: '低庫存', tone: 'warn' }
          ]
        }
      },
      {
        label: '認會員',
        caption: '報電話或掃會員碼，折扣與點數自動帶入。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'stats',
          title: '結帳',
          stats: [
            { label: '小計', value: '$1,170' },
            { label: '會員折扣', value: '-$117' },
            { label: '應收', value: '$1,053' }
          ],
          rows: [
            { left: '會員', right: '陳先生 · 銀卡' },
            { left: '累積點數', right: '+105 點' }
          ]
        }
      },
      {
        label: '庫存異動',
        caption: '賣出即扣庫存，每一筆異動都查得到原因。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '庫存異動紀錄',
          rows: [
            { left: '棉質上衣 / 白 / M', sub: '銷售扣除', right: '8 → 7', tone: 'muted' },
            { left: '帆布托特包', sub: '銷售扣除', right: '3 → 2', badge: '低於門檻', tone: 'warn' },
            { left: '棉質上衣 / 黑 / L', sub: '進貨入庫', right: '2 → 12', tone: 'ok' }
          ]
        }
      },
      {
        label: '補貨提醒',
        caption: '低於門檻的品項集中列出，可用 LINE 通知負責人。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '低庫存報表',
          caption: '3 個品項待補貨',
          rows: [
            { left: '帆布托特包', sub: '門檻 5', right: '剩 2', tone: 'warn' },
            { left: '針織圍巾 / 米', sub: '門檻 5', right: '剩 1', tone: 'warn' },
            { left: '素色襪 / 灰', sub: '門檻 10', right: '剩 4', tone: 'warn' }
          ]
        }
      }
    ]
  },

  pos_reservation: {
    title: '顧客訂位到現場入座',
    intro: '同一筆訂位，顧客、店員與現場看板各自看到什麼。',
    steps: [
      {
        label: '線上訂位',
        caption: '顧客在 LINE 選日期時段人數，送出即完成。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '線上訂位',
          fields: [
            { label: '日期', value: '10 月 18 日（六）' },
            { label: '時段', value: '18:30' },
            { label: '人數', value: '4 位' },
            { label: '姓名 / 電話', value: '林小姐 · 0912-345-678' }
          ],
          submit: '送出訂位'
        }
      },
      {
        label: '店家收到',
        caption: '新的線上訂位會跳通知並發出提示音，不會漏接。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '訂位列表 · 今日',
          caption: '新訂位 1 筆',
          rows: [
            { left: '18:30 · 林小姐 · 4 位', sub: 'A3 桌', badge: '線上訂位', tone: 'ok' },
            { left: '19:00 · 王先生 · 2 位', sub: '電話訂位', badge: '已確認' },
            { left: '19:30 · 張小姐 · 6 位', sub: '大桌需求', badge: '待確認', tone: 'warn' }
          ]
        }
      },
      {
        label: '自動通知',
        caption: '訂位成功與用餐前提醒自動推播，降低 no-show。',
        actor: '系統',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '訂位通知',
          messages: [
            { from: 'brand', text: '林小姐您好，10/18（六）18:30 · 4 位的訂位已確認。' },
            { from: 'brand', text: '提醒您明天 18:30 的訂位，如需更改可直接在這裡告訴我們。' },
            { from: 'user', text: '好的，會準時到' }
          ],
          menu: ['我的訂位', '修改時間', '取消訂位']
        }
      },
      {
        label: '現場入座',
        caption: '沒訂位的現場取號，叫號後選桌入座。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'grid',
          title: '桌況圖 · 18:35',
          caption: '綠色可用、橘色使用中',
          items: [
            { label: 'A1', sub: '4 人', state: 'busy' },
            { label: 'A2', sub: '4 人', state: 'on' },
            { label: 'A3', sub: '林小姐', state: 'busy' },
            { label: 'B1', sub: '2 人', state: 'on' },
            { label: 'B2', sub: '2 人', state: 'busy' },
            { label: 'C1', sub: '8 人', state: 'on' }
          ]
        }
      }
    ]
  },

  pos_invoice: {
    title: '結帳完成，發票自動開出來',
    intro: '看發票從開立、載具到折讓的完整生命週期。',
    steps: [
      {
        label: '結帳',
        caption: '顧客出示載具，結帳完成自動觸發開立。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'form',
          title: '結帳 · 發票資訊',
          fields: [
            { label: '發票類型', value: '二聯式（B2C）' },
            { label: '載具', value: '手機條碼 /ABC1234' },
            { label: '捐贈', value: '不捐贈' },
            { label: '金額', value: '$1,053' }
          ],
          submit: '結帳並開立發票'
        }
      },
      {
        label: '自動開立',
        caption: '發票號碼由系統配發，證明聯從店裡的出單機印出。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '發票列表',
          rows: [
            { left: 'AB-12345678', sub: '10/18 19:02 · $1,053', badge: '已開立', tone: 'ok' },
            { left: 'AB-12345677', sub: '10/18 18:41 · $216', badge: '已開立', tone: 'ok' },
            { left: 'AB-12345676', sub: '10/18 18:15 · $840', badge: '已作廢', tone: 'muted' }
          ]
        }
      },
      {
        label: '退款折讓',
        caption: '開立後金額有變動走折讓，與作廢是兩條不同的路。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'form',
          title: '開立折讓證明單',
          fields: [
            { label: '原發票', value: 'AB-12345678' },
            { label: '折讓金額', value: '$300' },
            { label: '折讓原因', value: '部分退貨' }
          ],
          submit: '送出折讓'
        }
      }
    ]
  },

  beauty_booking: {
    title: '顧客預約到設計師結單',
    intro: '從 LINE 預約、班表比對、現場結帳到派工紀錄。',
    steps: [
      {
        label: '選設計師',
        caption: '顧客在 LINE 選服務人員與項目，看得到加價。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: '選擇設計師',
          caption: '指定設計師會顯示加價金額',
          items: [
            { label: 'Amy', sub: '+$200', state: 'on' },
            { label: 'Kelly', sub: '+$100' },
            { label: 'Joyce', sub: '不加價' },
            { label: '不指定', sub: '由店家安排' }
          ]
        }
      },
      {
        label: '選時段',
        caption: '沒排班的時段不會出現，不必來回訊息確認。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: 'Amy · 10 月 18 日',
          caption: '灰色為已被預約或未排班',
          items: [
            { label: '10:00', state: 'off' },
            { label: '11:30', state: 'on' },
            { label: '13:00', state: 'off' },
            { label: '14:30', state: 'on' },
            { label: '16:00', state: 'on' },
            { label: '17:30', state: 'off' }
          ]
        }
      },
      {
        label: '現場結帳',
        caption: '做完在櫃台開單，可直接扣儲值金。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'stats',
          title: '結帳 · 林小姐',
          stats: [
            { label: '光療美甲', value: '$1,200' },
            { label: '指定設計師', value: '$200' },
            { label: '應收', value: '$1,400' }
          ],
          rows: [
            { left: '儲值金餘額', right: '$3,600' },
            { left: '扣款後餘額', right: '$2,200' },
            { left: '扣款確認', right: '已由會員在 LINE 確認' }
          ]
        }
      },
      {
        label: '填派工單',
        caption: '設計師用 LINE 填內部紀錄，下次服務有依據。',
        actor: '店員',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '派工單 · 林小姐',
          fields: [
            { label: '服務項目', value: '光療美甲 · 法式' },
            { label: '使用色號', value: 'P-102 / P-233' },
            { label: '客戶狀況', value: '指甲較薄，建議兩週後回填' },
            { label: '下次建議', value: '11/01 前後' }
          ],
          submit: '儲存派工單'
        }
      }
    ]
  },

  ecommerce: {
    title: '線上下單到出貨通知',
    intro: '顧客在商城買東西，訂單與會員資料接回同一套系統。',
    steps: [
      {
        label: '瀏覽下單',
        caption: '商品支援多規格，庫存即時反映。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: '秋季新品',
          items: [
            { label: '羊毛圍巾 / 米', sub: '$1,280', state: 'on' },
            { label: '羊毛圍巾 / 灰', sub: '$1,280' },
            { label: '針織帽', sub: '售完', state: 'off' },
            { label: '手工皂禮盒', sub: '$880', state: 'on' }
          ]
        }
      },
      {
        label: '結帳',
        caption: '折扣碼、配送方式與付款在同一頁完成。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '結帳',
          fields: [
            { label: '商品', value: '羊毛圍巾 / 米 x1' },
            { label: '折扣碼', value: 'AUTUMN200（-$200）' },
            { label: '配送方式', value: '超商取貨 · $60' },
            { label: '應付金額', value: '$1,140' }
          ],
          submit: '前往付款'
        }
      },
      {
        label: '出貨',
        caption: '後台填物流單號，狀態一改顧客就收到通知。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '訂單管理',
          rows: [
            { left: 'EC-20261018-004', sub: '林小姐 · $1,140', badge: '待出貨', tone: 'warn' },
            { left: 'EC-20261018-003', sub: '陳先生 · $880', badge: '已出貨', tone: 'ok' },
            { left: 'EC-20261017-011', sub: '王小姐 · $2,460', badge: '已完成', tone: 'muted' }
          ]
        }
      },
      {
        label: '棄單追回',
        caption: '加了購物車沒結帳的顧客，用 LINE 推播提醒。',
        actor: '系統',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '棄單提醒',
          messages: [
            { from: 'brand', text: '您的購物車裡還有「羊毛圍巾 / 米」，要幫您保留嗎？' },
            { from: 'brand', text: '折扣碼 AUTUMN200 還有 2 天到期，結帳可折 $200。' },
            { from: 'user', text: '好，我現在去結' }
          ],
          menu: ['回到購物車', '查看訂單', '聯絡客服']
        }
      }
    ]
  },

  hr_attendance: {
    title: '打卡、請假到月結',
    intro: '員工用手機打卡，班表與出勤自動對照，月底直接產報表。',
    steps: [
      {
        label: '排班',
        caption: '先建班次模板，再用月曆排班，重複的不用重填。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'grid',
          title: '排班月曆 · 10 月',
          caption: '點格子指派班次',
          items: [
            { label: '10/16', sub: '早班 3 人', state: 'on' },
            { label: '10/17', sub: '早班 3 人', state: 'on' },
            { label: '10/18', sub: '假日 5 人', state: 'busy' },
            { label: '10/19', sub: '假日 5 人', state: 'busy' },
            { label: '10/20', sub: '公休', state: 'off' },
            { label: '10/21', sub: '早班 3 人', state: 'on' }
          ]
        }
      },
      {
        label: '打卡',
        caption: '支援 QR、GPS、IP 等方式，依門市狀況選。',
        actor: '員工',
        device: 'phone',
        screen: {
          kind: 'stats',
          title: '我的打卡',
          stats: [
            { label: '上班', value: '09:58', hint: '準時' },
            { label: '下班', value: '18:04' },
            { label: '本月時數', value: '142.5' }
          ],
          rows: [
            { left: '打卡方式', right: 'QR 掃描' },
            { left: '地點', right: '中山門市' }
          ]
        }
      },
      {
        label: '請假審核',
        caption: '員工線上請假、主管線上審核，假別可自訂。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '請假審核',
          rows: [
            { left: '陳小姐 · 特休 1 天', sub: '10/25', badge: '待審核', tone: 'warn' },
            { left: '王先生 · 病假 0.5 天', sub: '10/19 下午', badge: '待審核', tone: 'warn' },
            { left: '李小姐 · 特休 2 天', sub: '10/12-10/13', badge: '已核准', tone: 'ok' }
          ]
        }
      },
      {
        label: '月結',
        caption: '出勤、請假、加班彙整成報表，薪資結算的依據。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '9 月月結報表',
          stats: [
            { label: '總工時', value: '1,284h' },
            { label: '加班時數', value: '86h' },
            { label: '請假天數', value: '12' }
          ],
          rows: [
            { left: '陳小姐', right: '168h · 加班 12h' },
            { left: '王先生', right: '152h · 加班 8h' }
          ]
        }
      }
    ]
  },
  course_enrollment: {
    title: '開課到學員完課',
    intro: '學員在 LINE 報名、現場掃碼報到，完課紀錄留在會員資料裡。',
    steps: [
      {
        label: '看課表',
        caption: '學員在 LINE 內看課程與場次，直接報名。',
        actor: '學員',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: '近期課程',
          items: [
            { label: 'LINE 行銷入門', sub: '10/22 · 剩 6 位', state: 'on' },
            { label: '會員經營實戰', sub: '10/29 · 剩 2 位', state: 'on' },
            { label: '廣告投放班', sub: '已額滿', state: 'off' },
            { label: '社群經營工作坊', sub: '11/05', state: 'on' }
          ]
        }
      },
      {
        label: '報名付款',
        caption: '可接線上金流，付款成功才正式佔位。',
        actor: '學員',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '報名 · LINE 行銷入門',
          fields: [
            { label: '場次', value: '10/22（三）19:00-21:00' },
            { label: '學員', value: '林小姐' },
            { label: '折扣碼', value: 'EARLY100（-$100）' },
            { label: '應付金額', value: '$1,400' }
          ],
          submit: '前往付款'
        }
      },
      {
        label: '現場報到',
        caption: '掃 QR 完成出席確認，取代紙本點名。',
        actor: '店員',
        device: 'phone',
        screen: {
          kind: 'list',
          title: '掃碼報到 · 10/22',
          caption: '已報到 18 / 24',
          rows: [
            { left: '林小姐', sub: '19:02 報到', badge: '已報到', tone: 'ok' },
            { left: '陳先生', sub: '19:05 報到', badge: '已報到', tone: 'ok' },
            { left: '王小姐', sub: '尚未到場', badge: '未報到', tone: 'warn' }
          ]
        }
      },
      {
        label: '學員歷程',
        caption: '報過哪些課、完課狀況、累計消費一次看完。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '學員歷程 · 林小姐',
          stats: [
            { label: '報名課程', value: '4' },
            { label: '完課', value: '3' },
            { label: '累計消費', value: '$5,600' }
          ],
          rows: [
            { left: 'LINE 行銷入門', right: '已完課' },
            { left: '會員經營實戰', right: '已報名' }
          ]
        }
      }
    ]
  },

  venue_booking: {
    title: '場地時段線上預約',
    intro: '顧客自己選時段送出申請，管理端審核並記錄收款。',
    steps: [
      {
        label: '選時段',
        caption: '規則之外的時間不會出現在選項裡。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: 'A 教室 · 10/20',
          caption: '灰色為已被預約或未開放',
          items: [
            { label: '09:00-12:00', state: 'off' },
            { label: '13:00-16:00', state: 'on' },
            { label: '16:00-19:00', state: 'on' },
            { label: '19:00-22:00', state: 'off' }
          ]
        }
      },
      {
        label: '送出申請',
        caption: '填用途與人數，可設定要不要人工審核。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '場地預約申請',
          fields: [
            { label: '場地', value: 'A 教室（可容納 30 人）' },
            { label: '時段', value: '10/20 13:00-16:00' },
            { label: '用途', value: '內部教育訓練' },
            { label: '訂金', value: '$1,500（總價 30%）' }
          ],
          submit: '送出申請'
        }
      },
      {
        label: '審核收款',
        caption: '管理端確認後記錄收款狀態。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '預約管理',
          rows: [
            { left: 'A 教室 · 10/20 13:00', sub: '林小姐 · 30 人', badge: '待審核', tone: 'warn' },
            { left: 'B 教室 · 10/21 09:00', sub: '陳先生 · 12 人', badge: '已確認', tone: 'ok' },
            { left: 'A 教室 · 10/25 全天', sub: '場地維修', badge: '封閉', tone: 'muted' }
          ]
        }
      }
    ]
  },

  hotel_booking: {
    title: '選房型到入住',
    intro: '顧客選日期區間下單，房況月曆顯示每天剩餘房數。',
    steps: [
      {
        label: '選房型',
        caption: '房型含可住人數、設施與定價，週末自動加價。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: '10/18-10/19 · 1 晚',
          caption: '週末加價 20% 已計入',
          items: [
            { label: '雙人房', sub: '$3,360', state: 'on' },
            { label: '四人房', sub: '$4,800', state: 'on' },
            { label: '包棟', sub: '已被訂走', state: 'off' },
            { label: '和室房', sub: '$3,600', state: 'on' }
          ]
        }
      },
      {
        label: '加購',
        caption: '早餐、接送、SPA 等附加服務訂房時一起選。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '訂房 · 雙人房',
          fields: [
            { label: '入住 / 退房', value: '10/18 15:00 → 10/19 11:00' },
            { label: '加購', value: '早餐 x2（$400）' },
            { label: '訂金', value: '$1,120（30%）' },
            { label: '總金額', value: '$3,760' }
          ],
          submit: '確認訂房'
        }
      },
      {
        label: '房況掌握',
        caption: '未來 14 天每個房型的剩餘可訂數一覽。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'grid',
          title: '房況月曆',
          caption: '橘色代表快滿',
          items: [
            { label: '10/18', sub: '剩 1 間', state: 'busy' },
            { label: '10/19', sub: '剩 4 間', state: 'on' },
            { label: '10/20', sub: '客滿', state: 'off' },
            { label: '10/21', sub: '剩 6 間', state: 'on' },
            { label: '10/22', sub: '剩 5 間', state: 'on' },
            { label: '10/23', sub: '剩 2 間', state: 'busy' }
          ]
        }
      },
      {
        label: '入住退房',
        caption: '訂單支援審核、Check-in、Check-out 與收款記錄。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '今日訂房',
          rows: [
            { left: '雙人房 · 林小姐', sub: '10/18-10/19 · 2 位', badge: '待入住', tone: 'warn' },
            { left: '四人房 · 陳先生', sub: '10/17-10/19 · 4 位', badge: '已入住', tone: 'ok' },
            { left: '和室房 · 王小姐', sub: '10/16-10/18', badge: '今日退房', tone: 'muted' }
          ]
        }
      }
    ]
  },

  case_dispatch: {
    title: '發案到結算',
    intro: '案件發出去、接案者搶案或被指派，完成後自動建立結算單。',
    steps: [
      {
        label: '發案',
        caption: '可開放搶案，也可指定承接人，並限定最低等級。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'form',
          title: '新增案件',
          fields: [
            { label: '案件名稱', value: '國中數學家教 · 週三晚間' },
            { label: '類型', value: '教師課程' },
            { label: '最低等級', value: '銀級以上' },
            { label: '酬金', value: '$1,200 / 堂' }
          ],
          submit: '發布案件'
        }
      },
      {
        label: '搶案',
        caption: '符合等級的接案者收到通知，先搶先得。',
        actor: '接案者',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '新案件通知',
          messages: [
            { from: 'brand', text: '有新案件：國中數學家教 · 週三晚間，酬金 $1,200 / 堂。' },
            { from: 'user', text: '我要接' },
            { from: 'brand', text: '接案成功，學員加入 QR 已發給您。' }
          ],
          menu: ['我的案件', '接案紀錄', '結算查詢']
        }
      },
      {
        label: '學員加入',
        caption: '學員掃 QR 加入課程，名單自動進系統。',
        actor: '學員',
        device: 'phone',
        screen: {
          kind: 'list',
          title: '學員名單',
          caption: '已加入 3 位',
          rows: [
            { left: '王同學', sub: '10/16 掃碼加入', badge: '已加入', tone: 'ok' },
            { left: '李同學', sub: '10/16 掃碼加入', badge: '已加入', tone: 'ok' },
            { left: '張同學', sub: '10/17 掃碼加入', badge: '已加入', tone: 'ok' }
          ]
        }
      },
      {
        label: '回饋與結算',
        caption: '學員填課後回饋，案件完成自動建立待結算單。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '結算管理',
          stats: [
            { label: '本月完成案件', value: '24' },
            { label: '待結算金額', value: '$28,800' },
            { label: '平均評分', value: '4.8' }
          ],
          rows: [
            { left: '陳老師 · 8 堂', right: '$9,600 · 待撥款' },
            { left: '林老師 · 6 堂', right: '$7,200 · 已撥款' }
          ]
        }
      }
    ]
  },

  cram_school: {
    title: '點名到家長收到通知',
    intro: '老師在後台記錄，家長在 LINE 收到，不用再靠紙本轉交。',
    steps: [
      {
        label: '每日點名',
        caption: '老師逐班點名簽到，出缺席紀錄留存。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'list',
          title: '國二數學 A 班 · 點名',
          caption: '出席 12 / 14',
          rows: [
            { left: '王同學', badge: '出席', tone: 'ok' },
            { left: '李同學', badge: '出席', tone: 'ok' },
            { left: '張同學', sub: '家長已請假', badge: '請假', tone: 'muted' },
            { left: '陳同學', sub: '未到且未請假', badge: '缺席', tone: 'warn' }
          ]
        }
      },
      {
        label: '填聯絡簿',
        caption: '依日期與學生填學習狀況，一鍵推送到家長 LINE。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'form',
          title: '聯絡簿 · 王同學',
          fields: [
            { label: '日期', value: '10 月 18 日' },
            { label: '今日進度', value: '二次函數 · 課本 P.86-92' },
            { label: '作業', value: '習作 P.44 全' },
            { label: '老師備註', value: '課堂表現積極，計算需再細心' }
          ],
          submit: '儲存並推送給家長'
        }
      },
      {
        label: '家長收到',
        caption: '家長在 LINE 收到當日狀況，不用等孩子轉交。',
        actor: '家長',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '聯絡簿通知',
          messages: [
            { from: 'brand', text: '王同學 10/18 聯絡簿：\n進度 二次函數 P.86-92\n作業 習作 P.44 全' },
            { from: 'brand', text: '老師備註：課堂表現積極，計算需再細心。' },
            { from: 'user', text: '收到，謝謝老師' }
          ],
          menu: ['聯絡簿', '成績查詢', '繳費紀錄']
        }
      },
      {
        label: '學費催繳',
        caption: '以班級為單位批次開帳單，可逐筆推 LINE 催繳。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '學費帳單 · 11 月',
          caption: '未繳 3 筆',
          rows: [
            { left: '王同學 · $6,000', sub: '10/05 已繳（匯款）', badge: '已繳費', tone: 'ok' },
            { left: '李同學 · $6,000', sub: '已推播提醒 1 次', badge: '未繳費', tone: 'warn' },
            { left: '張同學 · $6,000', sub: '尚未提醒', badge: '未繳費', tone: 'warn' }
          ]
        }
      }
    ]
  },

  temple_management: {
    title: '信眾點燈到名單建檔',
    intro: '點燈、法事、隨喜功德在 LINE 完成，名單自動建檔。',
    steps: [
      {
        label: '選燈位',
        caption: '各類燈座與剩餘座位一目了然。',
        actor: '信眾',
        device: 'phone',
        screen: {
          kind: 'grid',
          title: '點燈項目',
          items: [
            { label: '光明燈', sub: '$600 / 年', state: 'on' },
            { label: '太歲燈', sub: '$800 / 年', state: 'on' },
            { label: '文昌燈', sub: '$600 / 年', state: 'on' },
            { label: '財神燈', sub: '本年額滿', state: 'off' }
          ]
        }
      },
      {
        label: '填寫資料',
        caption: '姓名、農曆生日、地址與祈求事項線上填寫。',
        actor: '信眾',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '光明燈認購',
          fields: [
            { label: '信眾姓名', value: '林○○' },
            { label: '農曆生日', value: '民國 65 年 8 月 12 日' },
            { label: '地址', value: '高雄市三民區○○路' },
            { label: '祈求事項', value: '闔家平安、身體健康' }
          ],
          submit: '確認認購'
        }
      },
      {
        label: '抽籤',
        caption: '電子籤詩可建多個籤詩庫，抽完直接看解說。',
        actor: '信眾',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '線上抽籤',
          messages: [
            { from: 'user', text: '我想求一支籤' },
            { from: 'brand', text: '請誠心默念所求之事，點下方按鈕抽籤。' },
            { from: 'brand', text: '第三十八籤 · 中吉\n蜘蛛結網在樑中，每日絲多氣力窮…' }
          ],
          menu: ['再抽一支', '籤詩解說', '點燈祈福']
        }
      },
      {
        label: '名單管理',
        caption: '認購名單自動建檔，不用再手抄與人工核對。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '本年度認購',
          stats: [
            { label: '光明燈', value: '486 位' },
            { label: '安太歲', value: '212 位' },
            { label: '香油錢', value: '$284,600' }
          ],
          rows: [
            { left: '林○○ · 光明燈', right: '10/18 · 已繳' },
            { left: '陳○○ · 安太歲', right: '10/17 · 已繳' }
          ]
        }
      }
    ]
  },

  // ══════════ 顧客互動 ══════════
  ai_customer_service: {
    title: 'AI 回答到轉真人',
    intro: '常見問題 AI 直接答，答不出來或顧客要求時轉給真人。',
    steps: [
      {
        label: '顧客提問',
        caption: 'AI 依你建的知識庫回答，不是隨便亂answer。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: 'AI 客服',
          messages: [
            { from: 'user', text: '請問你們幾點營業？停車方便嗎' },
            { from: 'brand', text: '我們每日 11:00-21:00 營業（週二公休）。\n店門口有 6 個免費停車位，滿位可停對面收費停車場。' },
            { from: 'user', text: '那可以訂位嗎' }
          ],
          menu: ['線上訂位', '查看菜單', '聯絡真人']
        }
      },
      {
        label: '知識庫',
        caption: '回答的事實來源由你維護，分成分類、FAQ 與文件。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '知識庫',
          rows: [
            { left: '營業時間與公休', sub: 'FAQ · 被引用 128 次', badge: '啟用中', tone: 'ok' },
            { left: '停車資訊', sub: 'FAQ · 被引用 96 次', badge: '啟用中', tone: 'ok' },
            { left: '菜單與價位', sub: '文件 · 被引用 210 次', badge: '啟用中', tone: 'ok' },
            { left: '包場規則', sub: '尚未建立', badge: '待補', tone: 'warn' }
          ]
        }
      },
      {
        label: '轉真人',
        caption: '需要人工處理的對話進工作台，分三個階段追蹤。',
        actor: '店員',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '轉真人工作台',
          caption: '待接手 2 筆',
          rows: [
            { left: '陳先生 · 訂位改期', sub: '等待 2 分鐘', badge: '待接手', tone: 'warn' },
            { left: '王小姐 · 包場詢問', sub: '等待 5 分鐘', badge: '待接手', tone: 'warn' },
            { left: '林小姐 · 商品退換', sub: '客服 A 處理中', badge: '處理中', tone: 'ok' }
          ]
        }
      },
      {
        label: '看成效',
        caption: '對話量、成本與熱門問題，知道知識庫該補什麼。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '本月 AI 客服',
          stats: [
            { label: '對話數', value: '1,842' },
            { label: 'AI 解決率', value: '78%' },
            { label: '轉真人', value: '406' }
          ],
          rows: [
            { left: '最常被問', right: '營業時間（312 次）' },
            { left: '第二常被問', right: '停車資訊（198 次）' }
          ]
        }
      }
    ]
  },

  invoice_reward: {
    title: '登錄發票換獎勵',
    intro: '消費者上傳發票換獎勵，同時變成你的會員。',
    steps: [
      {
        label: '上傳發票',
        caption: '掃 QR、輸入條碼或直接拍照，三種方式都支援。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '登錄發票',
          fields: [
            { label: '登錄方式', value: '拍照上傳' },
            { label: '發票號碼', value: 'AB-12345678（自動辨識）' },
            { label: '消費日期', value: '2026/10/15' },
            { label: '金額', value: '$680' }
          ],
          submit: '送出登錄'
        }
      },
      {
        label: '自動核發',
        caption: '依規則發點數、票券或抽獎機會。',
        actor: '系統',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '登錄成功',
          messages: [
            { from: 'brand', text: '發票登錄成功，獲得 68 點與抽獎機會 x1。' },
            { from: 'brand', text: '目前累積 3 張發票，再登錄 2 張可換購物金 $100。' },
            { from: 'user', text: '我要去抽獎' }
          ],
          menu: ['我的點數', '抽獎', '登錄紀錄']
        }
      },
      {
        label: '查紀錄',
        caption: '每一筆都留下號碼、驗證結果與品項明細。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '登錄紀錄',
          rows: [
            { left: 'AB-12345678 · 林小姐', sub: '拍照辨識 · $680', badge: '已核准', tone: 'ok' },
            { left: 'CD-98765432 · 陳先生', sub: '掃碼 · $1,240', badge: '已核准', tone: 'ok' },
            { left: 'EF-11223344 · 未知', sub: '重複登錄', badge: '已退件', tone: 'warn' }
          ]
        }
      },
      {
        label: '看成效',
        caption: '登錄張數、核准率與活躍會員數。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '活動成效',
          stats: [
            { label: '登錄張數', value: '3,286' },
            { label: '核准率', value: '94%' },
            { label: '新增會員', value: '1,124' }
          ],
          rows: [
            { left: '發放點數', right: '286,400 點' },
            { left: '兌換票券', right: '842 張' }
          ]
        }
      }
    ]
  },

  event_module: {
    title: '賓客報名到現場互動',
    intro: '尾牙、婚禮這類一次性大型活動的完整流程。',
    steps: [
      {
        label: '自助報名',
        caption: '開放賓客自己填資料，省去人工蒐集。',
        actor: '賓客',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '2026 尾牙報名',
          fields: [
            { label: '姓名', value: '林小姐' },
            { label: '部門', value: '行銷部' },
            { label: '出席人數', value: '2 位（含眷屬）' },
            { label: '飲食需求', value: '素食 1 份' }
          ],
          submit: '送出報名'
        }
      },
      {
        label: '桌位安排',
        caption: '管理出席名單並安排桌次，現場帶位不用翻紙本。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'grid',
          title: '桌位安排',
          caption: '共 18 桌 · 已排 16 桌',
          items: [
            { label: '第 1 桌', sub: '主管 · 10 人', state: 'busy' },
            { label: '第 2 桌', sub: '行銷部 · 10 人', state: 'busy' },
            { label: '第 3 桌', sub: '業務部 · 9 人', state: 'busy' },
            { label: '第 4 桌', sub: '尚有 4 位', state: 'on' },
            { label: '第 5 桌', sub: '尚有 8 位', state: 'on' },
            { label: '第 6 桌', sub: '未安排', state: 'off' }
          ]
        }
      },
      {
        label: '現場報到',
        caption: '掃碼完成報到，即時知道到了多少人。',
        actor: '店員',
        device: 'phone',
        screen: {
          kind: 'stats',
          title: '報到狀況',
          stats: [
            { label: '已報到', value: '142' },
            { label: '應到', value: '168' },
            { label: '報到率', value: '85%' }
          ],
          rows: [
            { left: '第 1 桌', right: '10 / 10' },
            { left: '第 2 桌', right: '8 / 10' }
          ]
        }
      },
      {
        label: '抽獎與留言',
        caption: '抽獎名單來自實際報到的賓客，留言即時上大螢幕。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '感謝牆 · 即時留言',
          rows: [
            { left: '林小姐', sub: '今年辛苦大家了，明年一起衝', badge: '已顯示', tone: 'ok' },
            { left: '陳先生', sub: '謝謝老闆的尾牙', badge: '已顯示', tone: 'ok' },
            { left: '匿名', sub: '待審核內容', badge: '待審核', tone: 'warn' }
          ]
        }
      }
    ]
  },

  market_expo: {
    title: '訪客集點到完攤抽獎',
    intro: '掃攤位 QR 集點，集滿參加抽獎，動線得以走完全場。',
    steps: [
      {
        label: '掃攤位 QR',
        caption: '每逛一攤掃一次，點數即時累積。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'stats',
          title: '我的集點',
          stats: [
            { label: '已集點', value: '6 / 10' },
            { label: '已逛攤位', value: '6' },
            { label: '距離抽獎', value: '還差 4 點' }
          ],
          rows: [
            { left: '手作皂 · A12', right: '+1 點' },
            { left: '陶藝工坊 · B03', right: '+1 點' }
          ]
        }
      },
      {
        label: '收藏名片',
        caption: '喜歡的攤商可收藏電子名片與型錄，活動後仍聯絡得上。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'list',
          title: '我收藏的攤商',
          rows: [
            { left: '手作皂工坊', sub: 'A12 · 已收藏名片', badge: '有型錄', tone: 'ok' },
            { left: '陶藝工坊', sub: 'B03 · 已收藏名片', badge: '有型錄', tone: 'ok' },
            { left: '果乾製造所', sub: 'C07 · 已收藏名片', tone: 'muted' }
          ]
        }
      },
      {
        label: '完攤抽獎',
        caption: '集滿指定點數才能抽，提高逛完全場的誘因。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: '完攤抽獎',
          messages: [
            { from: 'brand', text: '恭喜集滿 10 點，可參加完攤抽獎。' },
            { from: 'user', text: '我要抽' },
            { from: 'brand', text: '抽中「手作皂體驗券」一張，可至 A12 攤位兌換。' }
          ],
          menu: ['我的獎品', '攤位地圖', '收藏名片']
        }
      },
      {
        label: '攤主自管',
        caption: '攤主用 LINE 登入自行維護攤位內容，主辦不用代改。',
        actor: '攤主',
        device: 'phone',
        screen: {
          kind: 'form',
          title: '我的攤位 · A12',
          fields: [
            { label: '攤位名稱', value: '手作皂工坊' },
            { label: '主打商品', value: '冷製皂 · 精油系列' },
            { label: '型錄', value: '已上傳 8 張商品圖' },
            { label: '今日集點數', value: '86 次掃描' }
          ],
          submit: '儲存攤位資料'
        }
      }
    ]
  },

  game_community: {
    title: '會員從收優惠到主動回訪',
    intro: '發文互動累積等級，高等級解鎖特定票券與課程。',
    steps: [
      {
        label: '發文互動',
        caption: '會員在 LINE 內發文、留言、按讚，內容留在你的社群。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'list',
          title: '社群動態',
          rows: [
            { left: '林小姐', sub: '今天的限定甜點好好吃！', right: '32 讚', badge: '精選', tone: 'ok' },
            { left: '陳先生', sub: '請問週末有位子嗎', right: '8 留言' },
            { left: '王小姐', sub: '第 30 天打卡達成', right: '15 讚' }
          ]
        }
      },
      {
        label: '累積等級',
        caption: '等級曲線與勳章條件都可自訂。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'stats',
          title: '我的等級',
          stats: [
            { label: '目前等級', value: 'Lv.7', hint: '常客' },
            { label: '累積積分', value: '2,480' },
            { label: '距離下一級', value: '520' }
          ],
          rows: [
            { left: '已獲得勳章', right: '12 / 20' },
            { left: '連續打卡', right: '30 天' }
          ]
        }
      },
      {
        label: '解鎖權限',
        caption: '把票券、課程綁定到等級，達到才看得到。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '解鎖權限設定',
          rows: [
            { left: '會員專屬 8 折券', sub: 'Lv.5 以上可領', badge: '已解鎖', tone: 'ok' },
            { left: '新品試吃活動', sub: 'Lv.7 以上報名', badge: '已解鎖', tone: 'ok' },
            { left: 'VIP 品酒會', sub: 'Lv.10 以上', badge: '未達成', tone: 'muted' }
          ]
        }
      },
      {
        label: '排行榜',
        caption: '本週、本月、總榜三種排名，把競爭氛圍視覺化。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'list',
          title: '本月排行榜',
          rows: [
            { left: '1 · 王小姐', sub: 'Lv.12 · 打卡 30 天', right: '4,820', badge: '第一', tone: 'ok' },
            { left: '2 · 林小姐', sub: 'Lv.7 · 打卡 28 天', right: '2,480' },
            { left: '3 · 陳先生', sub: 'Lv.6 · 打卡 22 天', right: '2,140' }
          ]
        }
      }
    ]
  }
};

export function getModuleDemo(slug: string) {
  return moduleDemos[slug];
}
