import { headers } from 'next/headers';

/**
 * 業務資源網站（/kit/<token>）的資料來源 —— 只在伺服器端跑（2026-10-24 第一期）。
 *
 * 每次請求向 CRM 取一次（no-store），不快取：連結被停用、素材下架要立刻生效。
 *
 * ## CRM 契約（apps/api/src/routes/sales-kit.ts）
 *   GET  {CRM}/api/sales-kit/public/kit          header x-sales-kit-token
 *   POST {CRM}/api/sales-kit/public/kit/events   { item_id, event: 'open' }
 *   token 錯／停用／過期 → 404（同一個形狀）；這邊一律轉成 notFound()，畫面上分不出差別。
 *
 * ## 代理金鑰（SALES_KIT_PROXY_SECRET，兩邊要設同一組）
 *   有設：CRM 只收帶對金鑰的請求，並信我們轉過去的訪客 IP（x-sales-kit-client-ip）做限流 ——
 *   否則所有業務都從這台伺服器的出口 IP 出去，會吃同一個限流桶。
 *   token 放 header，不放網址，CRM 的存取紀錄看不到它。
 */

export const KIT_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

const CRM_BASE = (process.env.CRM_API_BASE || 'https://crm.ugomk.com').replace(/\/+$/, '');
const TIMEOUT_MS = 8000;

export type KitItemType = 'deck' | 'qa' | 'dm' | 'card';

export interface KitItem {
  id: string;
  type: KitItemType;
  title: string;
  summary: string;
  version: number;
  entry_url?: string;
  file_url?: string;
  file_kind?: 'image' | 'pdf';
  share_text?: string;
  /** 簡報的客戶分享網址（ugomk.com/d/<code>）；停用時沒有 */
  share_url?: string;
  /** DM：PDF 主檔另附的 PNG */
  preview_url?: string;
  qa?: Array<{ q: string; a: string; kind?: 'faq' | 'objection' }>;
}

export interface KitModule {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category?: string;
  /** 模組專屬縮圖（1200×800、3:2，圖上已排好模組名稱）；舊資料沒有這個欄位或為 null */
  thumbnail_url?: string | null;
  items: KitItem[];
}

/* ── 簡報客戶分享（第二期）：ugomk.com/d/<code> ───────────────────────── */

export const SHARE_CODE_RE = /^[A-Za-z0-9_-]{16,64}$/;

export interface SharedDeck {
  item: { id: string; title: string; summary: string; version: number; entry_url: string };
  module: { id: string; slug: string; name: string };
  og_image: string | null;
}

/** LINE／社群貼連結時的預覽爬蟲不算一次瀏覽 */
const PREVIEW_BOT_RE = /bot|crawl|spider|facebookexternalhit|preview|slack|discord|telegram|whatsapp|skype|embedly|vkshare|pinterest/i;

export function isPreviewBot(ua: string | null | undefined): boolean {
  return !!ua && PREVIEW_BOT_RE.test(ua);
}

export type ShareLoad = { state: 'ok'; deck: SharedDeck } | { state: 'not_found' } | { state: 'unavailable' };

/** 分享碼對得到才回；record＝這次要不要記一筆「開啟」（真人瀏覽才記） */
export async function loadSharedDeck(code: string, record: boolean): Promise<ShareLoad> {
  if (!SHARE_CODE_RE.test(code)) return { state: 'not_found' };
  let res: Response;
  try {
    const h: Record<string, string> = { accept: 'application/json', 'x-sales-kit-share-code': code };
    const secret = process.env.SALES_KIT_PROXY_SECRET?.trim();
    if (secret) {
      h['x-sales-kit-proxy-key'] = secret;
      const ip = visitorIp();
      if (ip) h['x-sales-kit-client-ip'] = ip;
    }
    if (record) h['x-sales-kit-record'] = '1';
    res = await fetch(`${CRM_BASE}/api/sales-kit/public/share`, { headers: h, cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    return { state: 'unavailable' };
  }
  if (res.status === 404) return { state: 'not_found' };
  if (!res.ok) return { state: 'unavailable' };
  const body = (await res.json().catch(() => null)) as { success?: boolean; data?: SharedDeck } | null;
  if (!body?.success || !body.data?.item?.entry_url) return { state: 'unavailable' };
  return { state: 'ok', deck: body.data };
}

/** 圖卡文案裡的 {deck_link} 換成該模組第一份簡報的客戶分享網址；沒有就拿掉這個位置 */
export function fillDeckLink(text: string, deckLink: string | null | undefined): string {
  return text.replace(/\{deck_link\}/g, deckLink || '').replace(/[ \t]+\n/g, '\n').trim();
}

export function lineShareUrl(text: string): string {
  return `https://line.me/R/share?text=${encodeURIComponent(text)}`;
}

export interface Kit {
  link: { name: string; expires_at: string | null };
  modules: KitModule[];
}

export function isKitToken(v: unknown): v is string {
  return typeof v === 'string' && KIT_TOKEN_RE.test(v);
}

/** 好記的別名（/kit/sale）→ 換成環境變數裡的真 token；沒設就維持原值（會 404） */
const KIT_ALIASES: Record<string, string | undefined> = {
  sale: process.env.SALES_KIT_SALE_TOKEN?.trim(),
};

export function resolveKitToken(v: string): string {
  return KIT_ALIASES[v] || v;
}

/** 訪客真實 IP：X-Forwarded-For 最後一段（Zeabur ingress 追加在尾端，前面幾段是訪客自己可以亂填的） */
function visitorIp(): string {
  const xff = headers().get('x-forwarded-for') || '';
  const hops = xff.split(',').map((s) => s.trim()).filter(Boolean);
  return hops[hops.length - 1] || headers().get('x-real-ip') || '';
}

function crmHeaders(token: string): Record<string, string> {
  const h: Record<string, string> = { 'x-sales-kit-token': resolveKitToken(token), accept: 'application/json' };
  const secret = process.env.SALES_KIT_PROXY_SECRET?.trim();
  if (secret) {
    h['x-sales-kit-proxy-key'] = secret;
    const ip = visitorIp();
    if (ip) h['x-sales-kit-client-ip'] = ip;
  }
  return h;
}

export class KitUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KitUnavailableError';
  }
}

/**
 * 取這個連結看得到的內容。token 無效 → null（呼叫端 notFound()）；CRM 掛掉 → 丟 KitUnavailableError（顯示稍後再試）。
 */
export async function fetchKit(token: string): Promise<Kit | null> {
  if (!isKitToken(resolveKitToken(token))) return null;
  let res: Response;
  try {
    res = await fetch(`${CRM_BASE}/api/sales-kit/public/kit`, {
      headers: crmHeaders(token),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new KitUnavailableError('CRM 連線失敗');
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new KitUnavailableError(`CRM 回應 ${res.status}`);
  const body = (await res.json().catch(() => null)) as { success?: boolean; data?: Kit } | null;
  if (!body?.success || !body.data || !Array.isArray(body.data.modules)) throw new KitUnavailableError('CRM 回應格式不正確');
  return body.data;
}

export function findModule(kit: Kit, slug: string): KitModule | null {
  return kit.modules.find((m) => m.slug === slug) ?? null;
}

export function findItem(mod: KitModule, itemId: string, type: KitItemType): KitItem | null {
  return mod.items.find((i) => i.id === itemId && i.type === type) ?? null;
}

/** 記一筆「開啟」；失敗不影響畫面（最多等 1.5 秒） */
export async function recordOpen(token: string, itemId: string): Promise<void> {
  try {
    await fetch(`${CRM_BASE}/api/sales-kit/public/kit/events`, {
      method: 'POST',
      headers: { ...crmHeaders(token), 'content-type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, event: 'open' }),
      cache: 'no-store',
      signal: AbortSignal.timeout(1500),
    });
  } catch {
    /* 紀錄是附帶的，不擋業務看簡報 */
  }
}

export const ITEM_TYPE_LABEL: Record<KitItemType, string> = {
  deck: '網頁簡報',
  qa: '客戶 QA',
  dm: '宣傳 DM',
  card: '分享圖卡',
};

/** 安全的外部檔案網址：只收 https（CRM 給的是 R2 公開網址；擋 javascript: 之類） */
export function safeHttpsUrl(u: string | undefined | null): string | null {
  if (!u) return null;
  try {
    const url = new URL(u);
    if (url.protocol === 'https:') return url.toString();
    // 本機開發（next dev）才放行 http://127.0.0.1／localhost，給本機假 R2 演練用；正式環境只收 https
    if (process.env.NODE_ENV === 'development' && url.protocol === 'http:' && (url.hostname === '127.0.0.1' || url.hostname === 'localhost')) {
      return url.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export type KitLoad = { state: 'ok'; kit: Kit } | { state: 'not_found' } | { state: 'unavailable' };

/** 頁面用：不在 try 裡呼叫 notFound()（它是靠丟例外運作的，包在 try 會被吃掉） */
export async function loadKit(token: string): Promise<KitLoad> {
  try {
    const kit = await fetchKit(token);
    return kit ? { state: 'ok', kit } : { state: 'not_found' };
  } catch (err) {
    if (err instanceof KitUnavailableError) return { state: 'unavailable' };
    throw err;
  }
}
