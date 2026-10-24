'use client';

import { usePathname } from 'next/navigation';

/**
 * 全站外框（頁首、頁尾、GTM、外連點擊追蹤）在「不公開頁」不顯示。
 *
 * 業務資源網站 /kit/<token> 與簡報客戶分享頁 /d/<code>：
 *   - 網址裡就是通行證，GTM／GA 會把整條網址（含 token）送到 Google，所以這些頁不載追蹤。
 *   - 這是給業務用的內部工具，不該出現官網選單與「預約需求討論」按鈕。
 * 判斷放在 client（usePathname），因為 root layout 是靜態產生、看不到路徑。
 */
export function isPrivatePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === '/kit' || pathname.startsWith('/kit/') || pathname === '/d' || pathname.startsWith('/d/');
}

export function HideOnPrivatePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isPrivatePath(pathname)) return null;
  return <>{children}</>;
}
