import type { ModuleDemo } from './module-demos';

/**
 * 解決方案頁（/solutions/loyalty、/solutions/marketing-automation）的互動 demo 腳本。
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
export const solutionDemos: Record<'loyalty' | 'marketing-automation', ModuleDemo> = {
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
  },

  /* ══════════ 行銷自動化 ══════════ */
  'marketing-automation': {
    title: '一條自動跟進的劇本，怎麼設定與執行',
    intro: '點下面的步驟，看一條「久未回訪就自動關懷」的劇本從設定到送達的完整過程。',
    steps: [
      {
        label: '設觸發條件',
        caption: '先選什麼情況要觸發。生日、消費後、久未回訪、點數達標、票券快到期都可以。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'form',
          title: '新增劇本 · 觸發條件',
          fields: [
            { label: '劇本名稱', value: '90 天未回訪關懷' },
            { label: '觸發條件', value: '距離上次消費滿 N 天', hint: '系統每天自動掃描' },
            { label: '天數', value: '90 天' },
            { label: '適用分店', value: '全部分店共用', hint: '也可指定單一分店專用' }
          ],
          submit: '下一步'
        }
      },
      {
        label: '挑對象',
        caption: '再縮小要發給誰。可依會員等級、必須有哪些標籤、要排除哪些標籤來篩。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'stats',
          title: '啟用前預估',
          stats: [
            { label: '符合條件會員', value: '284 位', hint: '啟用前先算給你看' },
            { label: '會員等級', value: '銀卡以上' },
            { label: '排除標籤', value: '已退訂' }
          ],
          rows: [
            { left: '必須有標籤', right: '曾消費' },
            { left: '排除標籤', right: '已退訂、黑名單' },
            { left: '這次會實際發送', right: '284 位' }
          ]
        }
      },
      {
        label: '設動作',
        caption: '選系統要做什麼。發訊息、發票券、加點數、貼標籤、發抽獎機會都可以一次設多個。',
        actor: '老闆',
        device: 'desktop',
        screen: {
          kind: 'grid',
          title: '這條劇本要做的事',
          caption: '可同時設定多個動作，也可以設定延遲多久才執行',
          items: [
            { label: '推播訊息', sub: '關懷文案', state: 'on' },
            { label: '發放票券', sub: '回店折抵券', state: 'on' },
            { label: '加點數', sub: '未使用' },
            { label: '貼標籤', sub: '沉睡喚回', state: 'on' },
            { label: '發抽獎機會', sub: '未使用' },
            { label: '延遲執行', sub: '立即發送' }
          ]
        }
      },
      {
        label: '自動執行',
        caption: '之後不用再管。系統每天掃描，符合條件的會員自動收到，每一次執行都留紀錄。',
        actor: '系統',
        device: 'desktop',
        screen: {
          kind: 'list',
          title: '執行紀錄',
          caption: '每一次觸發都寫一筆，看得到成功、略過與失敗',
          rows: [
            { left: '90 天未回訪關懷', sub: '推播 + 發券', right: '今天 10:00', badge: '成功 284', tone: 'ok' },
            { left: '生日當月祝賀', sub: '推播 + 發券', right: '今天 09:00', badge: '成功 41', tone: 'ok' },
            { left: '票券到期前提醒', sub: '推播', right: '昨天 09:00', badge: '成功 96', tone: 'ok' },
            { left: '新會員歡迎禮', sub: '推播 + 發券', right: '昨天 21:13', badge: '成功 3', tone: 'ok' },
            { left: '點數達 500 點通知', sub: '推播', right: '昨天 18:02', badge: '略過 1', tone: 'muted' }
          ]
        }
      }
    ]
  }
};
