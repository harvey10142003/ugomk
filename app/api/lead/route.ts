/**
 * POST /api/lead —— 官網詢問表單的唯一收件口。
 *
 * ## 為什麼要經過自己的 route handler，而不是讓瀏覽器直接打 CRM
 *
 * CRM 的 `POST https://crm.ugomk.com/api/site/public/{tenant}/lead` 本身是公開的，
 * CORS 白名單也涵蓋 `*.ugomk.com`（`apps/api/src/index.ts` 的 allowedHostRe），
 * 所以瀏覽器直接打其實會通。不那樣做的理由有三個：
 *
 *   1. **通知**。名單進了 CRM 不會有任何人被通知（原因見 lib/lead-notify.ts 檔頭）。
 *      要補這一段，就必須有一個我們自己的伺服器端點。
 *   2. **CRM 掛掉時名單不會憑空消失**。這裡即使寫入失敗也照樣發通知，
 *      通知內文會標明「沒有寫進 CRM」，那封通知就是唯一的紀錄。
 *   3. **租戶代號與端點細節不外流到瀏覽器**。
 *
 * ## CRM 端實際契約（2026-09-05 grep `apps/api/src/routes/site/public.ts:573-810` 驗證）
 *
 *   POST /api/site/public/:tenant/lead        rate limit 30/min/IP
 *   欄位：form_type（inquiry|reservation|enrollment，預設 inquiry）
 *         name(≤100) / phone(≤50) / email(≤200) / message(≤5000)
 *         source_page_id(TEXT，無外鍵) / utm_json(JSONB)
 *         hp_url(honeypot) / form_started_at(ms epoch)
 *   必填：name / phone / email **至少一個**，否則 422
 *   租戶不存在 → 404；站台被停用 → 503
 *   防灌：honeypot 有值、或填表 <1500ms → 回**與成功一模一樣的 200 但不寫入**
 *         （所以 200 不保證真的寫進去了，見下方 leadId 的處理）
 *         60 秒內同人同內容重送 → 回既有那筆的 id
 */

import { NextResponse } from 'next/server';
import {
  classifyContact,
  industryLabel,
  storeCountLabel,
  type LeadFormPayload
} from '@/lib/data/lead-form';
import { notifyNewLead } from '@/lib/lead-notify';

// 這支一定要在 Node runtime 跑（要對外 fetch、要吐 log），而且絕不可被靜態化
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CRM_BASE = (process.env.CRM_API_BASE || 'https://crm.ugomk.com').replace(/\/+$/, '');
/** ⚠️ 是 `ugomk` 不是 `yuguo` —— 這兩個是不同的租戶 */
const CRM_TENANT = process.env.CRM_LEAD_TENANT || 'ugomk';
const CRM_TIMEOUT_MS = 10000;

/** 送給 CRM 的錯誤一律不原樣吐給訪客（可能含內部訊息），統一換成這句 */
const GENERIC_ERROR = '我們這邊暫時收不到表單。';

function clip(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: LeadFormPayload;
  try {
    body = (await request.json()) as LeadFormPayload;
  } catch {
    return NextResponse.json({ error: '表單內容格式不正確。' }, { status: 400 });
  }

  const name = clip(body?.name, 100);
  const contactRaw = clip(body?.contact, 200);
  const contact = classifyContact(contactRaw);

  if (!name) {
    return NextResponse.json({ error: '請留下我們可以怎麼稱呼你。' }, { status: 400 });
  }
  if (!contact) {
    return NextResponse.json({ error: '請留下有效的電話或 Email。' }, { status: 400 });
  }

  const industry = industryLabel(clip(body?.industry, 40));
  const storeCount = storeCountLabel(clip(body?.storeCount, 40));
  const userMessage = clip(body?.message, 2000);
  const sourcePath = clip(body?.sourcePath, 300);
  const referrer = clip(body?.referrer, 500);

  /* ── utm_json ────────────────────────────────────────────────────────
   * CRM 後台的名單列表只渲染 utm_source / utm_medium / utm_campaign /
   * utm_term / utm_content 這五個標準鍵（`apps/admin/.../site/leads/page.tsx`），
   * 其餘鍵會被存下來但畫面上看不到。所以：
   *   - 標準五鍵照原樣傳（後台看得到）
   *   - landing_page / referrer / gclid 之類另外傳（畫面看不到，但存得住，
   *     日後要回答「哪一頁帶來詢問」靠的就是它）
   *   - **同時**把來源頁寫進 message 尾巴，確保後台第一眼就看得到
   */
  const utm: Record<string, string> = {};
  if (body?.utm && typeof body.utm === 'object') {
    for (const [k, v] of Object.entries(body.utm)) {
      if (typeof v !== 'string' || !v.trim()) continue;
      utm[k.toLowerCase().slice(0, 40)] = v.trim().slice(0, 200);
    }
  }
  if (sourcePath) utm.landing_page = sourcePath;
  if (referrer) utm.referrer = referrer;
  utm.site = 'ugomk.com';

  const utmSummary =
    Object.entries(utm)
      .filter(([k]) => k.startsWith('utm_') || k === 'gclid' || k === 'fbclid')
      .map(([k, v]) => `${k}=${v}`)
      .join(' ') || null;

  /* ── message 組裝 ────────────────────────────────────────────────────
   * 產業與分店數沒有對應的 CRM 欄位（site_leads 只有 name/phone/email/message/utm_json），
   * 硬塞進 source_page_id 會汙染那個欄位的語意（它是給 site_pages 的 id 用的）。
   * 放進 message 尾巴是唯一「後台一定看得到」的位置。
   */
  const metaLines: string[] = [];
  if (industry) metaLines.push(`產業：${industry}`);
  if (storeCount) metaLines.push(`分店數：${storeCount}`);
  if (sourcePath) metaLines.push(`來源頁：${sourcePath}`);
  if (utmSummary) metaLines.push(`UTM：${utmSummary}`);

  const message = [userMessage, metaLines.length ? `— 來自 ugomk.com 官網表單 —\n${metaLines.join('\n')}` : '']
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 5000);

  const crmPayload = {
    form_type: 'inquiry',
    name,
    // classifyContact 只會回其中一個，另一個留空 —— CRM 端 `at least one of` 已滿足
    phone: contact.phone ?? '',
    email: contact.email ?? '',
    message,
    utm_json: utm,
    // honeypot 原樣轉送：擋機器人的判斷交給 CRM 那一層做，這裡不自己複製一份規則
    hp_url: clip(body?.hpUrl, 200),
    // 只有看起來合理的時間戳才轉送；亂值會讓 CRM 的「填表太快」判斷誤殺真人
    ...(Number.isFinite(body?.formStartedAt) && Number(body?.formStartedAt) > 0
      ? { form_started_at: Number(body.formStartedAt) }
      : {})
  };

  let storedInCrm = false;
  let leadId: string | null = null;
  let crmError: string | null = null;

  /* ── 把訪客 IP 轉送給 CRM ────────────────────────────────────────────
   *
   * CRM 那支端點的 rate limit 是 30/min **按 IP** 算的，而 IP 取自 X-Forwarded-For
   * 的第一段。我們在中間加了一層 route handler，如果不轉送，CRM 看到的就永遠是
   * Zeabur 這台伺服器的 IP —— 整個 ugomk.com 的訪客會共用同一個 30/min 配額。
   *
   * 那個失敗模式很難看：有人來灌表單就會把配額吃光，接著**真的訪客一起送不出去**，
   * 等於自己對自己的表單做了阻斷。轉送之後，灌的人只吃得掉他自己那一桶。
   *
   * 這個 header 客戶端可以偽造（CRM 自己的註解也點出這件事），所以它本來就不是
   * 真正的防線 —— 真正擋灌的是 honeypot、填表耗時與 60 秒重複這三道，
   * 那三道只看請求內容，與 IP 無關。這裡轉送只是把「配額分桶」還原成 per-visitor。 */
  const visitorIp = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CRM_TIMEOUT_MS);
  try {
    const res = await fetch(`${CRM_BASE}/api/site/public/${encodeURIComponent(CRM_TENANT)}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(visitorIp ? { 'X-Forwarded-For': visitorIp } : {})
      },
      body: JSON.stringify(crmPayload),
      signal: ctrl.signal,
      cache: 'no-store'
    });
    const json = (await res.json().catch(() => ({}))) as {
      data?: { id?: string | null };
      error?: string;
    };
    if (res.ok) {
      storedInCrm = true;
      // ⚠️ id 可能是 null 而 status 仍是 200 —— CRM 的 honeypot / 太快送出兩道
      //    刻意回「與成功完全一樣的 200」但不寫入。這裡如實記錄，不假裝拿到了 id。
      leadId = json.data?.id ?? null;
    } else {
      crmError = `${res.status} ${json.error || ''}`.trim();
      console.error(`[lead] CRM 寫入失敗 tenant=${CRM_TENANT} ${crmError}`);
    }
  } catch (err) {
    crmError = (err as Error).name === 'AbortError' ? `逾時 ${CRM_TIMEOUT_MS}ms` : (err as Error).message;
    console.error(`[lead] CRM 連線失敗 tenant=${CRM_TENANT} ${crmError}`);
  } finally {
    clearTimeout(timer);
  }

  /* 通知：無論 CRM 寫入成功與否都發。
   *
   * 寫入失敗時這封通知是這張名單**唯一的紀錄**，所以更不能省。
   * 整段包起來永不 throw —— 通知的失敗代價不該落在訪客身上
   * （他已經完成他該做的事了），但一定會在 log 留下聲音。 */
  try {
    await notifyNewLead({
      name,
      contactRaw,
      industry,
      storeCount,
      message: userMessage || null,
      sourcePath: sourcePath || null,
      referrer: referrer || null,
      utmSummary,
      storedInCrm,
      leadId,
      crmError
    });
  } catch (err) {
    console.error('[lead] 通知流程本身拋錯（表單照常視為成功）:', (err as Error).message);
  }

  if (!storedInCrm) {
    // 訪客要知道「沒送出去」才會改用其他管道找我們 —— 這裡不可以假裝成功。
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
