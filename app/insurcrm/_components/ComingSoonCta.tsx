import { cn } from '@/lib/utils';

export const COMING_SOON_LABEL = '搶先預約';

/**
 * 「搶先預約」按鈕位置（2026-09-27 Shark：先不做連結；2026-09-28 Shark：拿掉「即將開放」字樣）。
 *
 * 刻意用 <span> 而不是 <a href="#"> 或 disabled <button>：沒有目的地的東西就不該可以點、
 * 也不該在 Tab 順序裡。外觀保留按鈕的形狀（讓版面不塌）。
 * 字樣拿掉「即將開放」後，原本表達「還沒到」的虛線框與時鐘圖示也一起拿掉（兩者本身就在說「即將」）；
 * 改成實線框、淺底、沒有 hover 與游標變化的靜態樣式，看起來是穩定的標示而不是壞掉的按鈕。
 * 預約開放時，把呼叫端換回 ctaHref('/contact', …) 的連結即可。
 */
export function ComingSoonCta({
  tone = 'light',
  label,
  className
}: {
  tone?: 'light' | 'dark';
  /** 方案用：前面加方案名，例如「個人版．搶先預約」 */
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-disabled="true"
      className={cn(
        'inline-flex min-h-[48px] cursor-default select-none items-center justify-center whitespace-nowrap rounded-lg border-[1.5px] px-6 text-[15px] font-bold tracking-[0.04em]',
        tone === 'light'
          ? 'border-[color:var(--icrm-teal)] bg-[color:var(--icrm-tint)] text-[color:var(--icrm-teal-2)]'
          : 'border-white/50 bg-white/10 text-white',
        className
      )}
    >
      {label ? `${label}．${COMING_SOON_LABEL}` : COMING_SOON_LABEL}
    </span>
  );
}
