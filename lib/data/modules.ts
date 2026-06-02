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
    caption: 'Foundation',
    description: '一個租戶開 N 間分店，會員與票券共用、銷售資料分流；MGM 推薦碼/分享連結內建。',
    icon: Store,
    bullets: ['四角色 scope 防偷看', '每店模組可選開', '推薦碼雙端戰績', '防刷自我推薦']
  },
  {
    id: 'member-loyalty',
    title: '會員 / 點數 / 儲值金',
    caption: 'Loyalty Core',
    description: '會員資料、等級、群組、標籤一站式管理；點數商城、儲值金確認制扣款全內建。',
    icon: Wallet,
    bullets: ['點數兌換 vouchers', '儲值金 LINE Flex 二次確認', '會員等級動態圖文選單', '生日 / 推薦觸發']
  },
  {
    id: 'pos',
    title: 'POS 收銀（零售 / 餐飲 / 美業）',
    caption: 'Point of Sale',
    description: '同一套 POS 框架支撐三種產業，動態 sidebar 註冊表決定店員平板看到什麼。',
    icon: CreditCard,
    bullets: ['零售 POS（pos_retail）', '餐飲 POS + KDS 廚房螢幕', '美業 POS + 預約整合', '員工帳號隔離後台']
  },
  {
    id: 'marketing',
    title: '行銷自動化 + 圖文選單',
    caption: 'Marketing Automation',
    description: '4 種觸發 × 3 種動作的任務引擎；動態圖文選單依會員條件即時切換。',
    icon: Bot,
    bullets: ['週期 / 條件 / 標籤 / 等級觸發', '推播 / 標籤 / 切圖文選單動作', '執行紀錄 + dry-run 預覽', 'admin run-now 立即測試']
  },
  {
    id: 'booking',
    title: '預約 / 派案 / 補習班 / 宮廟',
    caption: 'Industry Packs',
    description: '產業專用模組可插拔啟用，每個都自帶 admin 後台 + LIFF 端 + POS 整合。',
    icon: CalendarCheck,
    bullets: ['美業預約（指定設計師加價）', '人員派遣 / 教師排課', '補習班聯絡簿 / 點名 / 公告', '宮廟燈座 / 籤詩 / 安太歲']
  },
  {
    id: 'lottery',
    title: '抽獎 / 活動 / 市集展覽',
    caption: 'Engagement',
    description: '四種抽獎範本（轉盤 / 刮刮樂 / 夾娃娃 / 拉霸）+ 活動報名 + 市集擺攤系統一次到位。',
    icon: Sparkles,
    bullets: ['機率 / 庫存 / 兌獎管理', '活動報名 + 簽到 + 票券', '市集擺攤 + 動線地圖', '抽卡稀有度 / 屬性']
  },
  {
    id: 'survey',
    title: '問卷表單 + 標籤自動綁',
    caption: 'Survey & Tag',
    description: '18 種題型 LIFF 一頁式填表，填完自動打標籤、自動加群組。',
    icon: ClipboardList,
    bullets: ['18 題型 + Banner 上傳', '複製短連結', '答案綁標籤 / 等級', '圖文選單系統功能直連']
  },
  {
    id: 'mall',
    title: '點數商城 + 票券',
    caption: 'Voucher Mall',
    description: '所有 voucher 設 points_cost 即自動上架商城，會員 LIFF 兌換。',
    icon: Gift,
    bullets: ['vouchers 統一管理', '點數即扣即發券', '到期 / 用量 / 條件', '群組可見性']
  },
  {
    id: 'help-docs',
    title: '線上說明手冊',
    caption: 'Self-Serve Docs',
    description: 'admin 右下角浮動 widget，依模組過濾文章，新增 .md 自動 build 進 manifest。',
    icon: ImageIcon,
    bullets: ['markdown 打包', '依啟用模組過濾', '搜尋 / 目錄', 'in-context 內嵌求助']
  }
];
