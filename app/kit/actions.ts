'use server';

import { cookies } from 'next/headers';
import { KIT_SESSION_COOKIE, unlockKit, type UnlockFailReason } from '@/lib/kit';

/**
 * 業務資源密碼頁送出（2026-10-25）：伺服器端向 CRM 換登入憑證，成功存成 httpOnly cookie（path=/kit、30 天）。
 * 密碼只在這次請求裡轉給 CRM，不存、不寫 log；cookie 裡只有 CRM 簽的 session（不含密碼）。
 */
export type UnlockState = { ok: boolean; message: string };

const MESSAGES: Record<UnlockFailReason, string> = {
  empty: '請輸入密碼',
  wrong: '密碼錯誤',
  locked: '嘗試太多次，請 15 分鐘後再試',
  not_found: '找不到這個頁面',
  unavailable: '暫時無法驗證，請稍後再試',
  no_password: '',
};

export async function unlockKitAction(token: string, password: string): Promise<UnlockState> {
  if (typeof token !== 'string' || typeof password !== 'string') return { ok: false, message: MESSAGES.empty };
  const r = await unlockKit(token, password);
  if (r.ok) {
    cookies().set(KIT_SESSION_COOKIE, r.session, {
      httpOnly: true,
      // 本機 next dev 是 http，Secure cookie 在部分瀏覽器（Safari）存不進去；正式站一律 Secure
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/kit',
      maxAge: r.maxAgeSec,
    });
    return { ok: true, message: '' };
  }
  // 連結其實沒設密碼（剛被清掉）⇒ 直接重新整理就進得去
  if (r.reason === 'no_password') return { ok: true, message: '' };
  return { ok: false, message: MESSAGES[r.reason] };
}
