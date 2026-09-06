/**
 * 站內 CTA 的來源標記。
 *
 * ## 為什麼要有這個檔
 *
 * 表單那一側早就準備好了：`components/LeadForm.tsx` 的 readUtm() 會把網址上所有
 * `utm_*` 收起來，`app/api/lead/route.ts` 原樣轉成 CRM 的 `utm_json`，CRM 後台的
 * 名單列表也讀得懂 utm_source / utm_medium / utm_campaign / utm_term / utm_content
 * 這五個標準鍵。缺的只是**沒有人在網址上放這些參數** —— 站內每一顆按鈕都指向乾淨的
 * `/contact`，所以每一張名單的來源欄位都是空的，回答不了「哪一個模組頁真的產出詢問」。
 *
 * ## 命名對齊
 *
 * 鍵名必須是小寫 `utm_` 開頭，這是 readUtm() 的過濾條件（`startsWith('utm_')`）；
 * 值會被 trim 後截到 200 字。這裡產生的四個鍵剛好落在 CRM 後台畫面看得到的那五個
 * 標準鍵裡面，所以名單一進來就有來源，不需要另外開報表。
 *
 * ## 邊界
 *
 *  - **只對站內 `/contact` 加**。外部連結（line.me）不加：LINE 不吃 UTM，加了只是
 *    把網址弄髒；而站內其他頁面（/pricing、/cases）沒有表單，標了也沒有東西會讀它。
 *  - **不影響 canonical**。canonical 由 `lib/seo.ts` 的 pageMeta 從 path 算出來，
 *    query string 完全不參與，所以 `/contact?utm_...` 不會生出 canonical 變體。
 *  - 已經自帶 query 的網址原樣回傳，不去猜要怎麼合併。
 */

export const UTM_SOURCE = 'site';
export const UTM_MEDIUM = 'cta';

/** 只有站內詢問表單那一頁需要標來源；其餘一律原樣放行 */
const TRACKED_PATH = '/contact';

/**
 * 路徑 → utm_campaign 值。
 * '/' → 'home'、'/solutions/pos_restaurant' → 'solutions_pos_restaurant'。
 * 之所以用路徑而不是人工取名，是因為新增頁面時不會有人記得回來加一條。
 */
export function campaignFromPath(path: string): string {
  const clean = path.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
  if (!clean) return 'home';
  return clean.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/\//g, '_').toLowerCase() || 'home';
}

/**
 * 給站內 CTA 用的 href。
 *
 * @param href     原本的目的地
 * @param campaign 來源頁（通常用 campaignFromPath 算）
 * @param content  這顆按鈕在頁面上的位置，例如 header / hero / cta_block。
 *                 utm_campaign 回答「從哪一頁來」，utm_content 回答「按了哪一顆」，
 *                 兩個問題不同，不要擠在同一個鍵裡。
 */
export function ctaHref(href: string, campaign: string, content?: string): string {
  if (!href.startsWith(TRACKED_PATH)) return href;
  if (href.includes('?')) return href;
  if (!campaign) return href;

  const params = new URLSearchParams({
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: campaign
  });
  if (content) params.set('utm_content', content);
  return `${href}?${params.toString()}`;
}
