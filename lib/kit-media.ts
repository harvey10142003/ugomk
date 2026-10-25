/**
 * 業務資源網站的縮圖規則（2026-10-25 UI v2）—— 前後端都能 import（不碰 next/headers）。
 *
 * 圖卡（1080×1350 PNG）與 DM 預覽（1240×1754 PNG）原檔每張 300KB～1MB，首頁 21 個模組直接載會很重，
 * 所以縮圖走 next/image（/_next/image 在我們自己的伺服器轉成小尺寸 webp 並快取）。
 *
 * - 只有 next.config.js 的 images.remotePatterns 放行的 R2 網域才交給 next/image；
 *   其他網址（換 bucket、換自訂網域、本機假 R2）一律退回原生 <img>，畫面不會因此壞掉。
 * - 縮圖請求是瀏覽器 → ugomk.com/_next/image（同源），再由伺服器去 R2 抓原圖：
 *   含通行證的頁面網址不會被送到 R2（頁面本身也是 no-referrer）。
 * - 下載、放大預覽仍然用原圖網址。
 */

/** 要與 next.config.js 的 images.remotePatterns 一致（改一邊要改另一邊） */
export const KIT_IMAGE_HOSTS = ['pub-5f2592935ed445a8a9c1c543a6380c1d.r2.dev'];
export const KIT_IMAGE_PATH_PREFIX = '/sales-kit/';

export function isOptimizableKitImage(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && KIT_IMAGE_HOSTS.includes(u.hostname) && u.pathname.startsWith(KIT_IMAGE_PATH_PREFIX);
  } catch {
    return false;
  }
}

/** 模組分類（CRM sales_kit_modules.category）→ 首頁分區標題；順序就是首頁分區順序 */
export const KIT_CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'crm', label: '會員與 LINE 經營' },
  { id: 'restaurant', label: '餐飲' },
  { id: 'retail', label: '零售' },
  { id: 'beauty', label: '美業' },
  { id: 'erp', label: '營運、進銷存與財務' },
  { id: 'hr', label: '人事' },
  { id: 'website', label: '官網與電商' },
  { id: 'vertical', label: '產業方案' },
  { id: 'service', label: '顧問服務' },
];

export const KIT_CATEGORY_OTHER = { id: 'other', label: '其他' };

export function kitCategoryOf(category: string | null | undefined): { id: string; label: string } {
  return KIT_CATEGORIES.find((c) => c.id === category) ?? KIT_CATEGORY_OTHER;
}
