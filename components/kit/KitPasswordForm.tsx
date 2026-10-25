'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { unlockKitAction } from '@/app/kit/actions';

/**
 * 業務資源密碼頁的表單（2026-10-25）：一個輸入框＋「進入」。送出走 server action（伺服器端打 CRM、設 httpOnly cookie），
 * 成功後 router.refresh() 重新讀同一頁。按鈕樣式字串在這裡直接寫（不從 styles.ts 以外的 'use client' 檔拿常數）。
 */
const btnPrimary =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-5 text-[15px] font-medium transition-[background-color,transform] duration-150 active:scale-[0.98] motion-reduce:transition-none bg-ink-900 text-white hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60';

export function KitPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    if (!password.trim()) {
      setError('請輸入密碼');
      return;
    }
    setError('');
    startTransition(async () => {
      const r = await unlockKitAction(token, password).catch(() => ({ ok: false, message: '暫時無法驗證，請稍後再試' }));
      if (r.ok) {
        router.refresh();
        return;
      }
      setError(r.message);
      setPassword('');
    });
  }

  return (
    <form onSubmit={submit} className="mt-6 flex w-full max-w-sm flex-col gap-3" noValidate>
      <label htmlFor="kit-password" className="text-[14px] font-medium text-ink-700">
        密碼
      </label>
      <input
        id="kit-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        maxLength={64}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'kit-password-error' : undefined}
        className="h-11 w-full rounded-md border border-mist-400 bg-white px-3 text-[16px] text-ink-900 outline-none transition-colors focus:border-ink-500 focus:ring-2 focus:ring-ink-900/10"
      />
      {error && (
        <p id="kit-password-error" role="alert" className="text-[14px] text-red-700">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? '驗證中…' : '進入'}
      </button>
    </form>
  );
}
