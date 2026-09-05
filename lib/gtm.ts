/**
 * GTM dataLayer 推送 —— 全站唯一的事件入口。
 *
 * 為什麼要包一層而不是各處直接 `window.dataLayer.push`：
 *   1. GTM 沒載入時（未設容器 ID、被廣告阻擋器擋掉、SSR）要安靜地什麼都不做，
 *      不可以讓追蹤程式碼把畫面弄壞 —— 追蹤壞掉是小事，表單送不出去是大事。
 *   2. 事件名稱與參數的形狀只在這裡定義，改一次全站一致。
 */

/** 站上追蹤的四個事件 —— 新增前先想清楚 GTM 容器那邊要怎麼用 */
export type GtmEvent = 'generate_lead' | 'click_line' | 'click_tel' | 'click_mailto';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * 推一個事件進 dataLayer。
 *
 * dataLayer 在 GTM 載入前只是一個普通陣列（GTM 的 snippet 是 `w[l]=w[l]||[]`），
 * 所以早於 GTM 送出的事件會排隊等它載入後再處理，不會掉。
 */
export function pushEvent(event: GtmEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* dataLayer 被第三方擴充覆寫成怪東西時，寧可不追蹤也不要中斷使用者的動作 */
  }
}
