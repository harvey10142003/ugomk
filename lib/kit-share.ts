/**
 * 業務資源網站「傳給 LINE 好友」網址（2026-10-26）。
 *
 * 按下去開 LIFF：https://liff.line.me/<LIFF id>/m/kit-share/<簡報分享碼>[?c=<圖卡 id>]
 *   - LIFF 用宇果（ugomk 租戶）的 LINE Login channel 2006665280 底下既有的 LIFF app（endpoint
 *     https://ugomk.ugomkcrm.com/lindex、scope 含 chat_message.write）；頁面在 CRM web /m/kit-share。
 *   - 網址只帶簡報的公開分享碼（客戶看的 ugomk.com/d/<碼> 那一段）與圖卡 id，**不帶業務通行 token**。
 *   - 換 LIFF：設環境變數 KIT_SHARE_LIFF_ID（伺服器端讀），不用改程式。
 */
export const DEFAULT_KIT_SHARE_LIFF_ID = '2006665280-7m5Q5Sce';
const LIFF_ID_RE = /^\d{6,}-[A-Za-z0-9]{4,}$/;
const SHARE_CODE_RE = /^[A-Za-z0-9_-]{16,64}$/;
const CARD_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function kitShareLiffId(): string {
  const v = (process.env.KIT_SHARE_LIFF_ID || '').trim();
  return LIFF_ID_RE.test(v) ? v : DEFAULT_KIT_SHARE_LIFF_ID;
}

/** 從簡報客戶分享網址（https://ugomk.com/d/<碼>）取出分享碼；不是這個形狀就 null */
export function shareCodeOf(shareUrl: string | null | undefined): string | null {
  if (!shareUrl) return null;
  try {
    const u = new URL(shareUrl);
    if (u.protocol !== 'https:') return null;
    const m = u.pathname.match(/^\/d\/([A-Za-z0-9_-]{16,64})\/?$/);
    return m && SHARE_CODE_RE.test(m[1]) ? m[1] : null;
  } catch {
    return null;
  }
}

/** 「傳給 LINE 好友」的 LIFF 網址；簡報沒開放分享（沒有分享碼）就 null（呼叫端退回文字分享） */
export function kitPickerUrl(shareUrl: string | null | undefined, cardId?: string | null): string | null {
  const code = shareCodeOf(shareUrl);
  if (!code) return null;
  const card = cardId && CARD_ID_RE.test(cardId) ? `?c=${cardId}` : '';
  return `https://liff.line.me/${kitShareLiffId()}/m/kit-share/${code}${card}`;
}
