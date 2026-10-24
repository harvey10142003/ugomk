import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

/** 業務資源網站的頁首（品牌名＋返回）＋內容寬度。純伺服器元件。 */
export function KitShell({
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-5 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        {backHref ? (
          <Link href={backHref} className="inline-flex min-h-[40px] items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {backLabel || '返回'}
          </Link>
        ) : (
          <span className="text-sm font-semibold tracking-wide text-brand-800">宇果國際行銷｜業務資源</span>
        )}
        {backHref && <span className="hidden text-xs text-ink-400 sm:inline">宇果國際行銷｜業務資源</span>}
      </div>
      <header className="mb-6">
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-widest-2 text-brand-600">{eyebrow}</p>}
        <h1 className="text-2xl font-bold leading-snug text-ink-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-ink-500">{subtitle}</p>}
      </header>
      {children}
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
