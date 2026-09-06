/**
 * 三個「跨模組能力」說明頁。
 *
 * 為什麼不放進 `crmModules`：那份清單的 id 對應系統真正的 module id，`/solutions/[slug]`
 * 也是照它生頁面。集點、行銷自動化、推薦裂變都落在核心模組裡（activity_management /
 * member_management / settings / marketing_automation），是租戶開通就有的地基，不是選配。
 * 硬塞進 crmModules 會讓「可以開通的 N 個模組」這個數字說謊。
 *
 * 這裡只負責 /solutions 總覽頁的入口卡片；導覽列與 footer 的連結在 lib/data/site.ts 的
 * navItems 裡（footer 會自動展開 children，不用另外維護第二份）。
 */
export type SolutionPage = {
  href: string;
  /** 卡片標題 */
  title: string;
  /** 一句話講這頁在回答什麼 */
  summary: string;
  detail: string;
};

export const solutionPages: SolutionPage[] = [
  {
    href: '/solutions/loyalty',
    title: '會員集點・票券・儲值',
    summary: '把集點卡搬進 LINE，名單留在自己手上',
    detail:
      '消費自動累積點數、點數換票券、票券掃碼核銷與轉贈、儲值金扣款與等級自動升等。點數、票券、儲值金與消費紀錄掛在同一位會員身上，不用再跟第三方平台對帳。'
  },
  {
    href: '/solutions/marketing-automation',
    title: '行銷自動化',
    summary: '設定一次，該做的跟進自動完成',
    detail:
      '設定「什麼情況發生，系統就做什麼」。生日、消費後、久未回訪、點數達標與票券到期自動推播、發券、加點與貼標籤，訊息只發給符合條件的會員。'
  },
  {
    href: '/solutions/referral',
    title: '推薦裂變 MGM',
    summary: '老客戶帶新客戶，系統記得是誰帶的',
    detail:
      '每位會員都有專屬推薦碼與推薦連結，朋友加入後推薦關係跟著建檔，雙方各自拿到點數或票券。獎勵時機可選加入即發或首次消費才發。'
  }
];
