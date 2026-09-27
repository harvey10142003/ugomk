import { cn } from '@/lib/utils';

/**
 * 純 CSS 手機外框（不用任何外部圖片）。內容由呼叫端決定。
 * 畫面上是示意用的 UI，不是實際產品截圖 —— 產品還沒上線。
 */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  label
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  /** 給螢幕報讀器的畫面說明；有給就把內部標成裝飾 */
  label?: string;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[260px] sm:w-[280px] rounded-[2.6rem] bg-ink-900 p-2.5 shadow-[0_40px_80px_-30px_rgba(2,42,54,0.55)] ring-1 ring-white/10',
        className
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <div
        aria-hidden={label ? true : undefined}
        className={cn('relative overflow-hidden rounded-[2.1rem] bg-mist-200', screenClassName)}
      >
        {/* 瀏海 */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-900" />
        {children}
      </div>
    </div>
  );
}

/** LINE 風格的對話頂欄 */
export function ChatTopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative z-10 flex items-center gap-2.5 bg-brand-900 px-4 pb-3 pt-9 text-white">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1AC6C8] to-[#0B7DB4] text-[11px] font-bold">
        AI
      </span>
      <div className="min-w-0">
        <div className="truncate text-[13px] font-bold leading-tight">{title}</div>
        {subtitle ? <div className="truncate text-[10px] text-brand-200">{subtitle}</div> : null}
      </div>
    </div>
  );
}
