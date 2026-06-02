import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('hero-bg pt-28 pb-16 md:pt-36 md:pb-24 border-b border-ink-100', className)}>
      <div className="container-ug max-w-4xl text-center">
        {eyebrow ? <span className="eyebrow justify-center">{eyebrow}</span> : null}
        <h1 className="heading-1 mt-5 text-balance whitespace-pre-line">{title}</h1>
        {subtitle ? <p className="body-lg mt-6 text-balance">{subtitle}</p> : null}
      </div>
    </section>
  );
}
