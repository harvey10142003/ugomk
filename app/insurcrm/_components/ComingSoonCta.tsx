import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export const COMING_SOON_LABEL = '搶先預約即將開放';

/**
 * 「搶先預約」還沒開放時的按鈕位置（2026-09-27 Shark：先不做連結）。
 *
 * 刻意用 <span> 而不是 <a href="#"> 或 disabled <button>：沒有目的地的東西就不該可以點、
 * 也不該在 Tab 順序裡。外觀保留按鈕的形狀（讓版面不塌），但用虛線框與時鐘圖示表達「還沒到」，
 * 全頁一致用同一句 COMING_SOON_LABEL。預約開放時，把呼叫端換回 ctaHref('/contact', …) 的連結即可。
 */
export function ComingSoonCta({
  tone = 'light',
  size = 'md',
  label,
  className
}: {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** 方案卡用：前面加方案名，例如「個人版．搶先預約即將開放」 */
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-disabled="true"
      className={cn(
        'inline-flex cursor-default select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border border-dashed font-semibold',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-7 py-3.5 text-base',
        tone === 'light'
          ? 'border-brand-300 bg-brand-50 text-brand-800'
          : 'border-white/40 bg-white/10 text-white',
        className
      )}
    >
      <Clock className="h-4 w-4 shrink-0" aria-hidden />
      {label ? `${label}．${COMING_SOON_LABEL}` : COMING_SOON_LABEL}
    </span>
  );
}
