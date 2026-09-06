import type { ModuleDemo } from './module-demos';

/**
 * 解決方案頁的互動 demo 腳本。
 *
 * ## 為什麼另開一個檔而不是塞進 module-demos.ts
 *
 * `moduleDemos` 是 `/solutions/[slug]` 動態路由在讀的字典，鍵一律是系統的 module id。
 * 這三頁不是模組頁 —— 它們講的是跨模組的能力（集點/票券/儲值是 activity_management +
 * member_management + settings 三個核心模組的組合，行銷自動化是 marketing_automation，
 * 推薦裂變是 settings 裡的推薦設定 + referral 路由），沒有一個對得上單一 module id。
 * 借用那個字典等於在模組字典裡塞非模組的鍵，下一個人讀 `moduleDemos` 時會以為
 * 官網有 `/solutions/loyalty` 這個模組頁。分開放，兩邊各自說得清楚自己是什麼。
 *
 * ## 內容紀律
 *
 * 每一步演的畫面都必須對得上 CRM 裡真的做得到的事（來源見各頁 page.tsx 的段落註解）。
 * 這裡不是示意圖，是把後台實際的欄位與流程換成看得懂的說法 —— 演出系統做不到的步驟，
 * 第一個受害的是帶著這頁去談客戶的業務。
 */
export const solutionDemos: Record<'loyalty', ModuleDemo> = {
  /* ══════════ 會員集點・票券・儲值 ══════════ */
  loyalty: {
    title: '一張 LINE 集點卡，從發點到核銷走一遍',
    intro: '點下面的步驟，看同一位客人的點數、票券與儲值金，怎麼在結帳與 LINE 兩端對起來。',
    steps: [
      {
        label: '設定規則',
        caption: '在後台設定消費多少錢累積一點、等級門檻怎麼算，之後每一筆結帳自動照這個跑。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'form',
          title: '集點參數設定',
          fields: [
            { label: '累積方式', value: '每消費 100 元累積 1 點', hint: '金額比例可自訂' },
            { label: '會員等級', value: '一般 / 銀卡 / 金卡' },
            { label: '升等門檻', value: '累積消費、點數、成長值', hint: '三項都達標才升等' },
            { label: '適用範圍', value: '全部分店共用' }
          ],
          submit: '儲存設定'
        }
      },
      {
        label: '結帳集點',
        caption: '結帳時帶出會員，點數自動累積；美業預約與零售 POS 還能直接扣抵儲值金。',
        actor: '店員',
        device: 'tablet',
        screen: {
          kind: 'stats',
          title: '零售 POS 結帳 · 陳小姐（金卡）',
          stats: [
            { label: '本次消費', value: '$1,280' },
            { label: '本次累積', value: '12 點', hint: '每 100 元 1 點' },
            { label: '可用點數', value: '148 點' }
          ],
          rows: [
            { left: '儲值金餘額', right: '$3,500' },
            { left: '本次以儲值金支付', right: '$1,280' },
            { left: '扣款方式', right: '推 LINE 給會員確認後才扣' },
            { left: '扣款後餘額', right: '$2,220' }
          ]
        }
      },
      {
        label: '顧客領券',
        caption: '票券直接進 LINE 裡的會員卡，顧客不用再下載一個集點 App。',
        actor: '顧客',
        device: 'phone',
        screen: {
          kind: 'chat',
          title: 'LINE · 品牌官方帳號',
          messages: [
            { from: 'brand', text: '陳小姐您好，本次消費累積 12 點，目前共 148 點。' },
            { from: 'brand', text: '您已達金卡門檻，附上金卡專屬折抵券一張。' },
            { from: 'user', text: '謝謝，票券在哪裡看？' },
            { from: 'brand', text: '點下方選單「我的會員卡」就能看到點數、票券與儲值金餘額。' }
          ],
          menu: ['我的會員卡', '點數兌換', '最新活動']
        }
      },
      {
        label: '核銷與紀錄',
        caption: '票券在店裡核銷後，這筆紀錄回到同一位會員身上，不用再跟第三方平台對帳。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '陳小姐 · 會員紀錄',
          caption: '點數、票券、儲值金與消費紀錄都掛在同一位會員底下',
          rows: [
            { left: '金卡折抵券', sub: '博愛店核銷', right: '今天 19:42', badge: '已核銷', tone: 'ok' },
            { left: '消費 $1,280', sub: '儲值金支付', right: '今天 19:40', badge: '已完成', tone: 'ok' },
            { left: '點數 +12', sub: '消費累積', right: '今天 19:40', badge: '入帳', tone: 'ok' },
            { left: '會員等級', sub: '銀卡 → 金卡', right: '今天 19:40', badge: '升等', tone: 'ok' },
            { left: '生日券', sub: '尚未使用', right: '11/30 到期', badge: '待核銷', tone: 'warn' }
          ]
        }
      }
    ]
  }
};
