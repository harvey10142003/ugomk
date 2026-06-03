export type ArticleSection =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'callout'; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  author: { name: string; role: string };
  cover: { tone: 'brand' | 'ink' | 'mint'; emoji: string };
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'line-oa-as-crm-not-customer-service',
    title: '別把 LINE@ 只當客服 — 從 CRM 角度重新設計顧客旅程',
    excerpt:
      '多數店家把 LINE@ 當客服信箱用，等顧客先發訊息才回應。但 CRM 的價值，是從顧客「還沒開口」之前就開始 — 用標籤、等級、行為觸發，讓對話變成關係。',
    category: '策略思維',
    publishedAt: '2026-05-28',
    readingMinutes: 6,
    author: { name: 'Shark', role: '宇果國際行銷 CEO' },
    cover: { tone: 'brand', emoji: '💬' },
    sections: [
      {
        kind: 'p',
        text: '走進大部分用 LINE@ 的店家後台，你看到的常是這樣：一個未讀數字、一條條等待人工回覆的訊息、店員輪流值班抓重點問題回答。這不是 CRM，是線上服務台。'
      },
      {
        kind: 'p',
        text: 'CRM 的「R」是 Relationship — 關係，是有來有往、會記得、會延續的東西。LINE 之所以該變成你的 CRM 而不是客服系統，原因有三個。'
      },
      {
        kind: 'h2',
        text: '一、LINE 知道顧客「來了」這件事'
      },
      {
        kind: 'p',
        text: '當會員打開你的圖文選單、點了「最新優惠」，這個動作本身就是訊號。CRM 化的 LINE@ 會把這次點擊記下來、改變這位會員的標籤，下一次推播或許就會推完全不同的內容給他。'
      },
      {
        kind: 'p',
        text: '客服思維下，這個點擊只會被當「他自己找答案」，不會留下痕跡；CRM 思維下，這是一筆行為資料，可以驅動下次溝通。'
      },
      {
        kind: 'h2',
        text: '二、LINE 會員有結構：等級 / 標籤 / 群組'
      },
      {
        kind: 'p',
        text: '客服處理的是「一個問題」；CRM 處理的是「一群有共同屬性的人」。一旦你開始用等級、標籤、群組去描述會員，你就能做「新會員 30 天內沒回來，推一張回訪券」這種事 — 而且全程自動化。'
      },
      {
        kind: 'callout',
        title: '小提醒',
        text: '不要一開始就設一堆標籤。先從 3 個對你最有用的開始（譬如：來過 / 已消費 / 流失），跑兩個月，再慢慢擴。標籤通膨比沒標籤更難收。'
      },
      {
        kind: 'h2',
        text: '三、行銷自動化把「主動」交還給品牌'
      },
      {
        kind: 'p',
        text: '客服是被動的 — 顧客來了才有事做。CRM 是主動的 — 你定好條件，系統替你出手。會員生日前一週、消費滿 3 次未推薦朋友、累積點數可兌換餐券、上次消費 14 天沒回頭…這些時機，店員不可能每個都記得。'
      },
      {
        kind: 'p',
        text: '把行銷自動化條件設好之後，店員只需要處理「真的需要人」的對話 — 客訴、特殊預約、客製諮詢。客服量不會增加，但顧客感受到的關心會。'
      },
      {
        kind: 'h2',
        text: '從哪裡開始？'
      },
      {
        kind: 'list',
        items: [
          '第一步：把現在 LINE@ 的會員撈出來，看看你有沒有「等級 / 標籤 / 消費紀錄」這三個欄位',
          '第二步：選 1 個觸發條件來自動化（生日、首購、流失 14 天），先做這一條',
          '第三步：跑 1 個月後看數字 — 觸發了幾次、推播打開率、有沒有人回來消費',
          '第四步：把這條跑通的自動化變成模板，複製到下一個情境'
        ]
      },
      {
        kind: 'quote',
        text: 'CRM 不是換系統的工程，是換思維的工程。LINE@ 還是那個 LINE@，但你看待它的方式變了之後，整個品牌的成長曲線會跟著變。'
      }
    ]
  },
  {
    slug: 'multi-store-line-oa-permission-design',
    title: '多分店連鎖怎麼用 LINE@ 不打架？權限切法的 4 個層級',
    excerpt:
      '一個 LINE@ 同時服務總公司、店長、店員、POS 員工 — 資料怎麼分？權限怎麼隔離？分享同一個會員，但消費資料各看各的，這件事比想像難。',
    category: '架構設計',
    publishedAt: '2026-05-20',
    readingMinutes: 7,
    author: { name: 'Shark', role: '宇果國際行銷 CEO' },
    cover: { tone: 'ink', emoji: '🏬' },
    sections: [
      {
        kind: 'p',
        text: '「我們有 3 間店，能不能用同一個 LINE@？」這是最近最常被問的問題之一。答案是可以，但前提是後台架構要分得開 — 不然會員資料、推播權限、業績歸屬都會打架。'
      },
      {
        kind: 'p',
        text: '我們把多分店架構做了 4 個角色 scope，下面用一個假想的「3 間店連鎖美甲店」當例子說明每層在幹嘛。'
      },
      {
        kind: 'h2',
        text: '角色一：總店（Owner）'
      },
      {
        kind: 'p',
        text: '看得到所有店的全部資料：營收、會員、預約、推播。可以建店、開模組、調設定。實務上這通常是老闆或行銷主管。'
      },
      {
        kind: 'p',
        text: '注意：總店「可以」看一切，不代表「應該」每件事都看。日常營運交給店長，總店只在跨店比較、推播策略、結算時介入。'
      },
      {
        kind: 'h2',
        text: '角色二：店長（Store Manager）'
      },
      {
        kind: 'p',
        text: '只看自己這間店的資料 — 預約、營收、員工、報表。可以建活動、發店內推播。不能看其他分店的數字，但可以看跨店共用的會員資料（譬如這位會員在別店消費過幾次）。'
      },
      {
        kind: 'callout',
        title: '為什麼共用會員、分開消費？',
        text: '會員是「品牌的資產」，所以共用；消費是「店的業績」，所以隔離。這樣業績歸屬清楚，會員體驗一致。'
      },
      {
        kind: 'h2',
        text: '角色三：店員（Staff）'
      },
      {
        kind: 'p',
        text: '只看自己這間店、且只看跟服務相關的功能 — 今日預約、客人來店記錄、POS 結帳。不能改設定、不能發推播、不能看營收報表。'
      },
      {
        kind: 'p',
        text: '這層的設計重點是「店員平板介面要乾淨」。把店員不需要的東西全收起來，誤觸風險降到最低。'
      },
      {
        kind: 'h2',
        text: '角色四：POS 員工（POS Cashier）'
      },
      {
        kind: 'p',
        text: '只能在 POS 介面結帳、查會員。連 admin 後台都進不去。實務上會給臨時工、外場、結帳員用。'
      },
      {
        kind: 'p',
        text: '這層的存在是因為：給臨時工開店員帳號太「重」，但又需要他們能查會員、扣點。POS 員工是最輕量的權限。'
      },
      {
        kind: 'h2',
        text: '常見錯誤：所有店員都用同一組帳號'
      },
      {
        kind: 'list',
        items: [
          '誰刷退誰結帳查不出來，發生客訴沒辦法回溯',
          '員工離職帳號不能換，後續還有人用',
          '操作紀錄全部混在一起，無法做員工績效',
          '會員資料任何人都能改，沒留追蹤'
        ]
      },
      {
        kind: 'p',
        text: '正確做法：一人一帳號，POS 員工帳號免費送（可以開 N 個），這樣每筆操作都有歸屬。'
      },
      {
        kind: 'quote',
        text: '多分店不是「複製一份系統」，是「同一套系統的權限切法」。切對了，店越開越多後台不會越亂；切錯了，3 間店就會開始打架。'
      }
    ]
  },
  {
    slug: 'marketing-automation-trigger-conditions',
    title: '行銷自動化的 90% 應該交給觸發條件，不是寫腳本',
    excerpt:
      '很多店家以為「行銷自動化 = 寫一堆 Zapier 流程」。事實上，真正在跑的店家用的不是腳本，而是 4 種觸發條件 × 3 種動作的乘法。',
    category: '行銷實戰',
    publishedAt: '2026-05-12',
    readingMinutes: 5,
    author: { name: 'Shark', role: '宇果國際行銷 CEO' },
    cover: { tone: 'mint', emoji: '⚡' },
    sections: [
      {
        kind: 'p',
        text: '「自動化」這三個字常常被神話。聽起來像是要寫 code、要架 server、要學 Zapier 拉一堆節點。但實際上店家在跑的自動化，90% 都不需要這些東西。'
      },
      {
        kind: 'p',
        text: '我們把所有「真的在跑」的自動化任務拆開來看，只剩兩件事：觸發條件 × 動作。把這兩個維度乘起來，幾乎涵蓋所有店家會用的場景。'
      },
      {
        kind: 'h2',
        text: '4 種觸發條件'
      },
      {
        kind: 'h3',
        text: '1. 週期觸發（時間）'
      },
      {
        kind: 'p',
        text: '每天早上 10 點、每週一、每月 1 號、每年生日當天。最簡單、最常用的一種。例子：每週一早上推「本週特惠菜單」。'
      },
      {
        kind: 'h3',
        text: '2. 行為觸發（事件）'
      },
      {
        kind: 'p',
        text: '會員第一次消費、累積消費滿某金額、點了圖文選單某按鈕、填了問卷。這類觸發即時性高，是 CRM 化的核心。'
      },
      {
        kind: 'h3',
        text: '3. 標籤觸發'
      },
      {
        kind: 'p',
        text: '會員被加上某標籤、或被移除某標籤時觸發。譬如「新會員」標籤被加上時，自動推一張新人券。'
      },
      {
        kind: 'h3',
        text: '4. 等級觸發'
      },
      {
        kind: 'p',
        text: '會員升等或降等時觸發。升等推恭喜訊息＋升等好禮，降等推回流活動。'
      },
      {
        kind: 'h2',
        text: '3 種動作'
      },
      {
        kind: 'list',
        items: [
          '推播：給會員一條 LINE 訊息（文字 / 圖卡 / Flex）',
          '改標籤：自動加 / 移會員的標籤、群組、等級',
          '切圖文選單：依會員條件，讓他看到不同的圖文選單入口'
        ]
      },
      {
        kind: 'callout',
        title: '為什麼這 3 種動作就夠了？',
        text: '推播是「告訴他」、改標籤是「分類他」、切選單是「給他看不一樣的」。所有 LINE 上跟會員互動的事，都能用這 3 件事完成。'
      },
      {
        kind: 'h2',
        text: '實例：4 × 3 = 12 種常用組合'
      },
      {
        kind: 'list',
        items: [
          '生日當天（週期）→ 推播祝賀 + 折扣券',
          '第一次消費（行為）→ 推播感謝 + 加「已消費」標籤',
          '加入「鑽石會員」標籤（標籤）→ 切換到 VIP 圖文選單',
          '升等到金卡（等級）→ 推播恭喜 + 升等好禮',
          '14 天未回購（行為）→ 推播召回券 + 加「流失警示」標籤'
        ]
      },
      {
        kind: 'p',
        text: '這 5 條就能涵蓋多數店家 80% 的自動化需求。剩下 20% 是業務客製，再用客製方案處理就好。'
      },
      {
        kind: 'quote',
        text: '行銷自動化不是 IT 工程，是「條件設定」。把 4 × 3 想清楚，剩下的就是排列組合。'
      }
    ]
  }
];

export function articleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function relatedArticles(currentSlug: string, limit = 2) {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
