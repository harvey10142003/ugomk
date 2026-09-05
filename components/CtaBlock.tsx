import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { site } from '@/lib/data/site';
import { cn } from '@/lib/utils';

type CtaLink = { label: string; href: string };

/**
 * 頁尾轉換卡。
 *
 * 這張卡原本在 7 個檔案裡逐字重複，抽出來的時候呼叫端**並不完全一樣**：
 *  - /solutions 多一行 eyebrow（所以標題要跟著改成 mt-4）
 *  - /cases 的內距是 p-10 md:p-16，而且它不在自己的 section 裡，是接在既有容器內
 *  - /services/smart-card 的主按鈕是外部 LINE 連結（btn-line），不是站內 btn-brand
 * 這些差異保留成 props / children，不要為了「長得一樣」把它們抹平。
 *
 * 注意 size 用列舉而不是讓呼叫端傳 className 疊 padding：
 * Tailwind 的 md:p-14 與 md:p-16 同時出現時，勝負由產生的 CSS 順序決定，
 * 不是由 class 字串的順序決定。
 */
export function CtaBlock({
  eyebrow,
  title,
  description,
  primary = site.cta.primary,
  secondary,
  size = 'md',
  className,
  children
}: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  /** 傳 null 代表主按鈕由 children 自己畫 */
  primary?: CtaLink | null;
  secondary?: CtaLink;
  size?: 'md' | 'lg';
  className?: string;
  /** 有值時整排按鈕改由呼叫端提供（外部連結、非站內導向等） */
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'card-glow bg-gradient-to-br from-brand-50 to-mint-100/40 text-center',
        size === 'lg' ? 'p-10 md:p-16' : 'p-10 md:p-14',
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className={cn('heading-3 text-balance', eyebrow && 'mt-4')}>{title}</h2>
      <p className="body-base mx-auto mt-4 max-w-xl">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {children ?? (
          <>
            {primary ? (
              <Link href={primary.href} className="btn-brand">
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {secondary ? (
              <Link href={secondary.href} className="btn-outline">
                {secondary.label}
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
