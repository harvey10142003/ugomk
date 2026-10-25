/**
 * 業務資源網站的按鈕樣式（2026-10-25 UI v2）。放在一般模組（不是 'use client'）：
 * 伺服器元件 import 'use client' 檔裡的字串常數會拿到 client reference 物件而不是字串，樣式會整個不見。
 */
const btn =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-3.5 text-[14px] font-medium transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 sm:h-10';
/** 主要動作：近黑墨色（不用品牌色塊） */
export const btnPrimary = `${btn} bg-ink-900 text-white hover:bg-ink-700`;
export const btnSecondary = `${btn} border border-mist-400 bg-white text-ink-900 hover:border-ink-300 hover:bg-mist-100`;
/** LINE 綠只給 LINE 動作；#038638 白字 4.70:1 */
export const btnLine = `${btn} bg-line-700 text-white hover:bg-line-800`;

