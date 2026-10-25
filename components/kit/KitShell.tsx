import Image from 'next/image';
import Link from 'next/link';
import { IconChevronLeft } from '@/components/kit/icons';

/**
 * 業務資源網站外框（2026-10-25 UI v2，純伺服器元件）。
 *
 * 版型：一條白色頂列（宇果標誌＋「業務資源」＋返回／路徑），底下是 1200px 置中欄、16px（手機）／32px（桌機）邊距。
 * 色彩：介面本身只用墨色（ink）與灰；品牌青只在小記號（連結、選取狀態），LINE 綠只在 LINE 按鈕。
 */
export function KitShell({
  backHref,
  backLabel,
  crumb,
  title,
  subtitle,
  note,
  aside,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  /** 頂列路徑最後一段（例如模組的分類） */
  crumb?: string;
  title?: string;
  subtitle?: string;
  /** 標題下的小字提醒（灰、13px） */
  note?: string;
  /** 標題列右側（桌機）／下方（手機）的內容 */
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <KitTopBar backHref={backHref} backLabel={backLabel} crumb={crumb} />
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-8">
        {title && (
          <header className="flex flex-col gap-4 pb-6 pt-6 sm:pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-3xl">
              <h1 className="text-[24px] font-bold leading-tight tracking-[-0.01em] text-ink-900 sm:text-[28px]">{title}</h1>
              {subtitle && <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-ink-500">{subtitle}</p>}
              {note && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{note}</p>}
            </div>
            {aside && <div className="shrink-0">{aside}</div>}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

export function KitTopBar({ backHref, backLabel, crumb }: { backHref?: string; backLabel?: string; crumb?: string }) {
  return (
    <div className="border-b border-mist-300 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-8">
        {backHref ? (
          <Link
            href={backHref}
            className="-ml-2 inline-flex h-10 min-w-0 items-center gap-1 rounded-md px-2 text-[15px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
          >
            <IconChevronLeft className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
            <span className="truncate">{backLabel || '返回'}</span>
          </Link>
        ) : (
          <span className="flex items-center gap-2.5">
            <Image src="/ugo-mark.png" alt="" width={30} height={25} className="h-[25px] w-[30px]" priority />
            <span className="text-[15px] font-bold text-ink-900">宇果國際行銷</span>
          </span>
        )}
        {crumb && <span className="hidden truncate text-[14px] text-ink-400 sm:inline">/ {crumb}</span>}
        <span className="ml-auto flex shrink-0 items-center gap-2 text-[13px] text-ink-400">
          {backHref && <Image src="/ugo-mark.png" alt="宇果國際行銷" width={24} height={20} className="h-5 w-6" />}
          業務資源
        </span>
      </div>
    </div>
  );
}

export function KitUnavailable() {
  return (
    <KitShell title="暫時無法讀取" subtitle="資料來源暫時連不上，請稍後重新整理。若一直無法開啟，請聯絡宇果國際行銷。">
      <span />
    </KitShell>
  );
}
