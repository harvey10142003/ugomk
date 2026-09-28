import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/**
 * 內頁頁首（2026-09-28 改版）：靠左、襯線標題、下方一條 logo 漸層細線收尾。
 * 原本是置中＋光暈背景；docs/design/site-direction.md 規定標題預設靠左，置中只留給最後的行動區塊。
 */
export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('hero-bg pt-28 pb-14 md:pt-36 md:pb-20', className)}>
      <div className="container-ug">
        <div className="max-w-3xl">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="heading-1 mt-5 whitespace-pre-line">{title}</h1>
          {subtitle ? <p className="body-lg mt-6 max-w-2xl">{subtitle}</p> : null}
        </div>
      </div>
    </section>
  );
}
