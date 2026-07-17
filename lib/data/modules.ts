import {
  Store,
  Share2,
  CreditCard,
  Ticket,
  Bot,
  CalendarCheck,
  School,
  ClipboardList,
  Sparkles,
  Wallet,
  ShoppingBag,
  Gift,
  Image as ImageIcon,
  type LucideIcon
} from 'lucide-react';

export type ModuleGroup = {
  id: string;
  title: string;
  caption: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
};

export const moduleGroups: ModuleGroup[] = [
  {
    id: 'multi-store',
    title: '多分店 + 推薦機制',
    caption: '多分店與權限管理',
    description: '一個品牌開 N 間分店，會員與票券共用、銷售資料分流；推薦碼與分享連結內建。',
    icon: Store,
    bullets: ['總部 / 店長 / 店員 / 收銀權限分流', '每店功能可依需求開通', '推薦碼雙方都看得到成效', '防止自我推薦刷獎勵']
  },
  {
    id: 'member-loyalty',
    title: '會員 / 點數 / 儲值金',
    caption: '會員、點數與儲值',
    description: '會員資料、等級、群組、標籤集中管理；點數商城、儲值金扣款前先經會員確認。',
    icon: Wallet,
    bullets: ['點數兌換票券', '儲值金扣款會員 LINE 確認', '依會員等級顯示不同圖文選單', '生日 / 推薦自動觸發']
  },
  {
    id: 'pos',
    title: 'POS 收銀（零售 / 餐飲 / 美業）',
    caption: 'POS 與門市結帳',
    description: '同一套 POS 依產業調整，現場人員的平板只顯示工作需要的功能。',
    icon: CreditCard,
    bullets: ['零售結帳與會員折扣', '餐飲點餐 + 廚房出單螢幕', '美業結帳 + 預約整合', '收銀人員帳號與後台分開']
  },
  {
    id: 'marketing',
    title: '行銷自動化 + 圖文選單',
    caption: '行銷自動化',
    description: '依照時間、行為、標籤與等級自動跟進會員；圖文選單依會員條件即時切換。',
    icon: Bot,
    bullets: ['週期 / 條件 / 標籤 / 等級觸發', '推播 / 貼標籤 / 切換圖文選單', '發送前可先預覽測試', '執行紀錄完整可追溯']
  },
  {
    id: 'booking',
    title: '預約 / 派案 / 補習班 / 宮廟',
    caption: '產業專用模組',
    description: '產業專用模組依需求啟用，後台管理、會員操作與 POS 一起整合。',
    icon: CalendarCheck,
    bullets: ['美業預約（指定服務人員加價）', '人員派遣 / 教師排課', '補習班聯絡簿 / 點名 / 公告', '宮廟燈座 / 籤詩 / 安太歲']
  },
  {
    id: 'lottery',
    title: '抽獎 / 活動 / 市集展覽',
    caption: '活動與互動工具',
    description: '四種抽獎範本（轉盤 / 刮刮樂 / 夾娃娃 / 拉霸）+ 活動報名 + 市集擺攤系統一次到位。',
    icon: Sparkles,
    bullets: ['機率 / 庫存 / 兌獎管理', '活動報名 + 簽到 + 票券', '市集擺攤 + 動線地圖', '活動名單回到會員系統']
  },
  {
    id: 'survey',
    title: '問卷表單 + 標籤自動綁',
    caption: '問卷與會員分類',
    description: '18 種題型一頁式填表，顧客填完自動貼上標籤、自動加入群組。',
    icon: ClipboardList,
    bullets: ['18 種題型 + 圖片上傳', '短連結直接分享', '答案自動綁標籤 / 等級', '從圖文選單直接開啟']
  },
  {
    id: 'mall',
    title: '點數商城 + 票券',
    caption: '點數商城與票券',
    description: '票券設定點數兌換後自動上架商城，會員在 LINE 內直接兌換。',
    icon: Gift,
    bullets: ['票券集中管理', '點數即扣即發券', '到期 / 用量 / 條件設定', '依會員群組控制可見性']
  },
  {
    id: 'help-docs',
    title: '線上說明手冊',
    caption: '操作說明與支援',
    description: '後台內建操作說明，依啟用的功能顯示對應文章，遇到問題隨時查詢。',
    icon: ImageIcon,
    bullets: ['依啟用功能顯示說明', '搜尋 / 目錄', '操作頁面內直接求助', '持續更新']
  }
];
