/**
 * 詢問表單的選項與欄位契約 —— client（LeadForm）與 server（app/api/lead）共用。
 *
 * 為什麼選項要放這裡而不是寫死在元件裡：送進 CRM 的 `message` 是由這些
 * label 組出來的，後台看到的字面就是這裡的字。改選項時只有一個地方要改，
 * 也不會發生「畫面顯示 A、存進資料庫是 B」。
 */

/** 產業選項 —— 對齊 lib/data/site.ts 的適用產業與 /solutions 的模組分類 */
export const INDUSTRY_OPTIONS = [
  { value: 'restaurant', label: '餐飲' },
  { value: 'beauty', label: '美業 / 美髮 / 醫美' },
  { value: 'retail', label: '零售 / 電商' },
  { value: 'education', label: '教育 / 課程' },
  { value: 'event', label: '活動 / 展會' },
  { value: 'service', label: '服務業 / 專業顧問' },
  { value: 'other', label: '其他' }
] as const;

/** 分店數量 —— 這個數字直接決定要不要談多分店權限與跨店會員 */
export const STORE_COUNT_OPTIONS = [
  { value: '1', label: '單店' },
  { value: '2-5', label: '2 – 5 間' },
  { value: '6-20', label: '6 – 20 間' },
  { value: '20+', label: '20 間以上' },
  { value: 'none', label: '沒有實體門市' }
] as const;

export type LeadFormPayload = {
  /** 稱呼（必填） */
  name: string;
  /** 電話或 Email，擇一即可（必填）—— 由後端判斷是哪一種 */
  contact: string;
  /** INDUSTRY_OPTIONS 的 value，未選為空字串 */
  industry?: string;
  /** STORE_COUNT_OPTIONS 的 value，未選為空字串 */
  storeCount?: string;
  /** 想解決的問題（選填） */
  message?: string;
  /** 訪客送出表單時所在的頁面路徑（例如 /solutions/website） */
  sourcePath?: string;
  /** document.referrer —— 判斷是搜尋、社群還是站內導流過來的 */
  referrer?: string;
  /** 網址上的 utm_* 參數（沒有就是空物件） */
  utm?: Record<string, string>;
  /** 表單「開始填」的時間戳（ms epoch）—— CRM 端用來擋 0ms 送出的機器人 */
  formStartedAt?: number;
  /** honeypot：畫面上看不到，真人永遠是空的 */
  hpUrl?: string;
};

export function industryLabel(value?: string): string | null {
  return INDUSTRY_OPTIONS.find((o) => o.value === value)?.label ?? null;
}

export function storeCountLabel(value?: string): string | null {
  return STORE_COUNT_OPTIONS.find((o) => o.value === value)?.label ?? null;
}

/**
 * 判斷使用者填在「聯絡方式」那一格的是 Email 還是電話。
 *
 * 只用一格的理由：多一個必填欄位就多一份放棄率，而 CRM 端本來就接受
 * name / phone / email 三者有其一。這裡把「使用者最順手的那一種」轉成
 * CRM 要的欄位，判斷不出來時才回 null 讓前端提示。
 */
export function classifyContact(raw: string): { phone?: string; email?: string } | null {
  const v = (raw || '').trim();
  if (!v) return null;

  if (v.includes('@')) {
    // 不做嚴格 RFC 驗證（會誤殺合法信箱），只確認「@ 後面有網域且有點」
    return /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(v) ? { email: v.slice(0, 200) } : null;
  }

  // 電話：允許 +886 / 括號 / 空白 / dash，取出數字判長度
  const digits = v.replace(/\D/g, '');
  if (digits.length >= 8 && digits.length <= 15) return { phone: v.slice(0, 50) };

  return null;
}
