/**
 * 新名單通知 —— server only（只給 app/api/lead/route.ts 用，不可 import 進 client）。
 *
 * ## 為什麼需要這個檔案
 *
 * 名單送進 CRM 的 `site_leads` 之後，**不會有任何人被通知**。這不是猜的：
 *
 *   - `apps/api/src/routes/site/leads.ts` 只有 GET / 改狀態 / 轉會員 / 回綁 四類端點，
 *     沒有任何 push、email 或未讀計數。
 *   - CRM 的 ma_rules 有一條 `lead_created` trigger（fire 點在
 *     `apps/api/src/routes/site/public.ts`），但它 **刻意沒有被放進後台的觸發類型下拉**
 *     （`apps/admin/.../rules/_RuleForm.tsx` 有註解說明，還有單元測試釘死它不出現），
 *     而且只在「電話對到既有會員 **且** 姓名也吻合」時才 fire —— 官網來的陌生訪客
 *     幾乎一定不符合，所以對這批名單而言它等於不存在。
 *   - CRM 各模組（美業預約 / POS 訂位 / 電商 / 旅宿 / 場地 / 問卷…）各自實作了一份
 *     「查 admins.line_id 然後 push」，**沒有一個是可共用的匯出函式**，官網這邊 import 不到。
 *
 * 所以「只把表單接上端點」的結果是：名單靜靜躺在後台，沒人知道它來了。
 * 這個檔案補的就是那一段。
 *
 * ## 三條規則
 *
 * 1. **通知失敗絕不可以讓表單送出失敗。** 訪客已經完成他該做的事了，
 *    失敗的代價不該落在他身上。所有 transport 都包在自己的 try/catch 裡。
 * 2. **但失敗必須留下聲音。** 不做 silent catch —— 每一個 transport 的成敗都會
 *    `console.error` 出結構化的一行，Zeabur logs 搜 `[lead-notify]` 就看得到。
 * 3. **完全沒設定時要 fail loud。** 沒有任何 transport 設定好，代表每一張名單
 *    都在無聲落地；這種狀況每次都要吼一次，不可以安靜地被當成「正常」。
 */

/** 通知內文要用到的東西 —— 已經過 route handler 正規化，這裡不再驗證 */
export type LeadNotifyContext = {
  name: string;
  /** 使用者原本填的那一串（電話或 Email），照原樣呈現最好認 */
  contactRaw: string;
  /** 產業 label（已轉成中文，不是 value） */
  industry?: string | null;
  /** 分店數 label */
  storeCount?: string | null;
  message?: string | null;
  sourcePath?: string | null;
  referrer?: string | null;
  /** utm 摘要字串，沒有就 null */
  utmSummary?: string | null;
  /** 名單有沒有成功寫進 CRM —— false 時這封通知就是唯一的紀錄 */
  storedInCrm: boolean;
  leadId?: string | null;
  crmError?: string | null;
};

/** 單一 transport 的結果 —— 一律回傳，不 throw */
type TransportResult = {
  name: string;
  ok: boolean;
  detail?: string;
};

export type NotifyOutcome = {
  /** 有設定的 transport 數量；0 代表沒有任何人會被通知 */
  configured: number;
  /** 成功送達的數量 */
  delivered: number;
  results: TransportResult[];
};

const TIMEOUT_MS = 8000;

/** 帶逾時的 fetch —— 通知服務掛掉時不可以把 route handler 一起拖住 */
async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, cache: 'no-store' });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * transport A：LINE Messaging API push。
 *
 * 為什麼優先用這條：Shark 本來就整天在看 LINE，而且這兩個值 production 已經有了 ——
 *   - `LEAD_NOTIFY_LINE_TOKEN`：ugomk 這個 LINE OA 的 channel access token
 *     （CRM 存在 `tenant_line_channels.channelAccessToken`，LINE Developers Console 也拿得到）
 *   - `LEAD_NOTIFY_LINE_TO`：收通知的 LINE UID。CRM API service 上已經有一個
 *     同性質的環境變數 `UPTIME_ALERT_LINE_UID`（infra 告警推給 Shark 用的，
 *     見 `apps/api/src/lib/admin-alert-recipients.ts`），值可以直接沿用。
 *
 * ⚠️ UID 必須是**這個 OA 簽出來的**。跨 OA 的 UID 會拿到 400，
 *    而且對方要先是這個 OA 的好友，否則 LINE 回 200、則數照扣、訊息永遠不到。
 */
async function sendLine(text: string): Promise<TransportResult | null> {
  const token = process.env.LEAD_NOTIFY_LINE_TOKEN?.trim();
  const to = process.env.LEAD_NOTIFY_LINE_TO?.trim();
  if (!token || !to) return null;

  const targets = to.split(',').map((s) => s.trim()).filter(Boolean);
  const failures: string[] = [];

  for (const uid of targets) {
    try {
      const res = await fetchWithTimeout('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ to: uid, messages: [{ type: 'text', text: text.slice(0, 4900) }] })
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        failures.push(`${uid.slice(0, 8)}…:${res.status} ${body.slice(0, 200)}`);
      }
    } catch (err) {
      failures.push(`${uid.slice(0, 8)}…:${(err as Error).message}`);
    }
  }

  return failures.length === 0
    ? { name: 'line', ok: true, detail: `${targets.length} 位收件人` }
    : { name: 'line', ok: false, detail: failures.join(' | ') };
}

/**
 * transport B：Resend email。
 *
 * 為什麼是 Resend 而不是 SMTP：CRM 已經在用 Resend，寄件網域 `mail.ugomk.com`
 * 也已經驗證過（`apps/api/src/lib/email/resend.ts`），所以這條路不需要開新帳號、
 * 不需要新的寄件網域驗證，只要把既有的 `RESEND_API_KEY` 複製到官網這個 service。
 * CRM 那邊沒有 nodemailer / SendGrid / SMTP（grep 過，不存在），不需要另尋。
 */
async function sendEmail(subject: string, text: string): Promise<TransportResult | null> {
  const key = process.env.LEAD_NOTIFY_RESEND_KEY?.trim();
  const to = process.env.LEAD_NOTIFY_EMAIL_TO?.trim();
  if (!key || !to) return null;

  const from = process.env.LEAD_NOTIFY_EMAIL_FROM?.trim() || 'ugomk.com 官網 <noreply@mail.ugomk.com>';
  try {
    const res = await fetchWithTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject,
        text
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { name: 'email', ok: false, detail: `${res.status} ${body.slice(0, 300)}` };
    }
    return { name: 'email', ok: true };
  } catch (err) {
    return { name: 'email', ok: false, detail: (err as Error).message };
  }
}

/** 通知內文 —— 純文字，LINE 與 email 共用一份 */
export function buildNotifyText(ctx: LeadNotifyContext): string {
  const lines = [
    ctx.storedInCrm ? '官網收到新的詢問名單' : '官網收到新名單，但沒有寫進 CRM（請手動處理）',
    '',
    `稱呼：${ctx.name}`,
    `聯絡：${ctx.contactRaw}`
  ];
  if (ctx.industry) lines.push(`產業：${ctx.industry}`);
  if (ctx.storeCount) lines.push(`分店：${ctx.storeCount}`);
  if (ctx.message) lines.push('', '想解決的問題：', ctx.message);
  lines.push('', `來源頁：${ctx.sourcePath || '(未知)'}`);
  if (ctx.referrer) lines.push(`前一頁：${ctx.referrer}`);
  if (ctx.utmSummary) lines.push(`UTM：${ctx.utmSummary}`);
  lines.push(
    '',
    ctx.storedInCrm
      ? `CRM 名單編號：${ctx.leadId || '(未回傳)'}`
      : `寫入失敗原因：${ctx.crmError || '(未知)'}`,
    ctx.storedInCrm ? '後台：CRM → 網站經營 → 名單' : ''
  );
  return lines.filter((l) => l !== undefined).join('\n').trim();
}

export async function notifyNewLead(ctx: LeadNotifyContext): Promise<NotifyOutcome> {
  const subject = ctx.storedInCrm
    ? `[ugomk.com] 新詢問：${ctx.name}`
    : `[ugomk.com] 新詢問（CRM 寫入失敗）：${ctx.name}`;
  const text = buildNotifyText(ctx);

  const settled = await Promise.all([sendLine(text), sendEmail(subject, text)]);
  const results = settled.filter((r): r is TransportResult => r !== null);
  const delivered = results.filter((r) => r.ok).length;

  if (results.length === 0) {
    // fail loud：一個 transport 都沒設 = 每一張名單都在無聲落地。
    // 這一行每次都要出現，不可以因為「已經講過了」就省略。
    console.error(
      '[lead-notify] 沒有任何通知管道被設定（LEAD_NOTIFY_LINE_TOKEN+LEAD_NOTIFY_LINE_TO ' +
        '或 LEAD_NOTIFY_RESEND_KEY+LEAD_NOTIFY_EMAIL_TO）→ 這張名單沒有任何人被通知。' +
        ` lead_id=${ctx.leadId || 'null'} name=${ctx.name}`
    );
  } else if (delivered === 0) {
    console.error(
      `[lead-notify] 全部通知管道都失敗 lead_id=${ctx.leadId || 'null'} ` +
        results.map((r) => `${r.name}=${r.detail}`).join(' ; ')
    );
  } else {
    for (const r of results) {
      if (!r.ok) console.error(`[lead-notify] ${r.name} 失敗：${r.detail}`);
    }
    console.log(
      `[lead-notify] 已通知 ${delivered}/${results.length} 個管道 lead_id=${ctx.leadId || 'null'}`
    );
  }

  return { configured: results.length, delivered, results };
}
