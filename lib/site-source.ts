/**
 * 站內 CTA 的來源標記。
 *
 * ## 🚫 這裡的參數不可以叫 `utm_*` —— 這是本檔存在的唯一理由，先讀完再改
 *
 * 這個檔案 2026-09-07 原本產出的是 `utm_source=site&utm_medium=cta&utm_campaign=…`，
 * 那是錯的，2026-09-08 改掉。原因：
 *
 *   GA4 看到網址上有 `utm_source` / `utm_medium`（或 gclid 這類點擊 id）就會判定
 *   「這是一次新的 campaign」，**開一個新 session 並覆寫該訪客原本的流量來源**。
 *   於是「從 Google 自然搜尋進站 → 逛了兩頁 → 點站內 CTA 到 /contact → 送出表單」
 *   這條再正常不過的動線，`generate_lead` 會被歸因給 `site / cta`，而不是
 *   `google / organic`。站上裝 GA4 就是為了回答「客人從哪來」，用 UTM 標站內連結
 *   等於親手把答案洗掉；洗掉的還剛好是最有價值的那一批（有互動才會點 CTA 的人）。
 *   Google 官方對站內連結的建議也是同一句：不要加 UTM。
 *
 *   ⚠️ 所以：**任何 `utm_` 開頭的鍵只准出現在站外連結上**（Google 商家檔案設的
 *   `https://ugomk.com/?utm_source=gbp&utm_medium=organic`、日後的廣告 landing page）。
 *   那些是真的「別的地方把人送過來」，該覆寫就是要覆寫。站內按鈕不是流量來源，
 *   它只是同一次造訪裡的一步。
 *
 * ## 那站內來源怎麼記
 *
 * 用兩個不以 `utm_` 開頭的自訂參數，GA4 不認得它們，所以不會動到歸因；
 * 它們只是原封不動待在 `page_location` 裡，需要時自己拆：
 *
 *   - `src` = 來源頁（按鈕所在的那一頁，由 sourceFromPath 從路徑推導）
 *   - `pos` = 按鈕位置（header / hero / cta_block / article_cta …）
 *
 * 讀取端有兩個，改參數名要一起改：
 *   - `components/LeadForm.tsx` 的 readSourceParams()：轉成 site_src / site_pos
 *     送進 CRM 的 utm_json，並讓 `app/api/lead/route.ts` 把它寫進 message 的來源摘要。
 *   - GA4：探索報表裡對「頁面路徑 + 查詢字串」做包含比對。
 *
 * ## 邊界
 *
 *  - **只標「下一步是轉換動作」的站內目的地**（見 TRACKED_PREFIXES）。/cases、/blog
 *    這類讀完就沒有下一步的頁面不標 —— 沒有人會拿那個數字做決定，標了只是把網址弄髒。
 *  - **外部連結一律不標**（line.me 等）。LINE 不吃這些參數，加了只是噪音。
 *  - **不影響 canonical**。canonical 由 `lib/seo.ts` 的 pageMeta 從 path 算，query
 *    完全不參與，所以 `/contact?src=…` 不會生出 canonical 變體。
 *  - 已經自帶 query 的網址原樣回傳，不去猜要怎麼合併；帶 #hash 的會把 hash 留在最後面。
 */

/** 來源頁參數名 —— 刻意不叫 utm_campaign，理由見檔頭 */
export const SRC_PARAM = 'src';
/** 按鈕位置參數名 —— 刻意不叫 utm_content，理由見檔頭 */
export const POS_PARAM = 'pos';

/**
 * 會被標記的站內目的地。判準是「這一頁的下一步是轉換動作嗎」：
 *   /contact   → 表單，答案會落到 CRM 名單上
 *   /solutions → 能力頁（含 /solutions/{slug}），是詢問前的最後一站
 *   /pricing   → 方案頁，同上
 * 這三個之外的站內頁面標了也沒有人讀。
 */
const TRACKED_PREFIXES = ['/contact', '/solutions', '/pricing'];

function isTracked(path: string): boolean {
  return TRACKED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/**
 * 路徑 → `src` 值。
 * '/' → 'home'、'/solutions/pos_restaurant' → 'solutions_pos_restaurant'。
 * 之所以用路徑而不是人工取名，是因為新增頁面時不會有人記得回來加一條。
 */
export function sourceFromPath(path: string): string {
  const clean = path.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
  if (!clean) return 'home';
  return clean.replace(/[^a-zA-Z0-9/_-]/g, '').replace(/\//g, '_').toLowerCase() || 'home';
}

/**
 * 給站內 CTA 用的 href。
 *
 * @param href     原本的目的地
 * @param source   來源頁（通常用 sourceFromPath 算）
 * @param position 這顆按鈕在頁面上的位置，例如 header / hero / cta_block。
 *                 `src` 回答「從哪一頁來」，`pos` 回答「按了哪一顆」，
 *                 兩個問題不同，不要擠在同一個鍵裡。
 */
export function ctaHref(href: string, source: string, position?: string): string {
  if (!source) return href;

  const hashAt = href.indexOf('#');
  const base = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const hash = hashAt >= 0 ? href.slice(hashAt) : '';

  if (!isTracked(base)) return href;
  if (base.includes('?')) return href;

  const params = new URLSearchParams({ [SRC_PARAM]: source });
  if (position) params.set(POS_PARAM, position);
  return `${base}?${params.toString()}${hash}`;
}
