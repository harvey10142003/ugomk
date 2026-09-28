import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Coins,
  MessagesSquare,
  Stamp,
  Store,
  Workflow,
  type LucideIcon
} from 'lucide-react';
import type { Article, ArticleCoverIcon } from '@/lib/data/articles';
import { cn } from '@/lib/utils';

/** 封面底色（2026-09-28：原本三種漸層，改成三個實色，都取自 logo 色系） */
export const coverBg: Record<Article['cover']['tone'], string> = {
  brand: 'bg-brand-800 text-white',
  ink: 'bg-brand-950 text-white',
  mint: 'bg-[#E3F0F4] text-brand-800'
};

/** 封面圖示對應表（介面不放 emoji） */
export const coverIcon: Record<ArticleCoverIcon, LucideIcon> = {
  checklist: ClipboardCheck,
  cost: Coins,
  reservation: CalendarCheck,
  loyalty: Stamp,
  conversation: MessagesSquare,
  branches: Store,
  automation: Workflow
};

export function ArticleCard({
  article,
  featured = false,
  headingLevel = 'h3'
}: {
  article: Article;
  featured?: boolean;
  /**
   * 卡片標題的階層。預設 h3 是給「已經有 h2 區塊標題」的地方用的（例如文章頁的相關文章）；
   * /blog 列表頁的卡片直接掛在 h1 底下，要傳 h2，不然 h1 → h3 中間少一階。
   */
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  const CoverIcon = coverIcon[article.cover.icon];
  const date = new Date(article.publishedAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        'group card-hover overflow-hidden flex flex-col',
        featured && 'md:grid md:grid-cols-2 md:gap-0'
      )}
    >
      <div
        className={cn(
          'relative aspect-[16/9] flex items-center justify-center overflow-hidden',
          coverBg[article.cover.tone],
          featured && 'md:aspect-auto md:h-full'
        )}
      >
        <CoverIcon className="h-14 w-14 opacity-90 md:h-[72px] md:w-[72px]" strokeWidth={1.25} aria-hidden />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink-800">
          {article.category}
        </span>
      </div>

      <div className={cn('p-6 md:p-8 flex flex-col', featured && 'md:p-10')}>
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <span>{date}</span>
          <span className="vertical-rule" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readingMinutes} 分鐘
          </span>
        </div>
        <Heading
          className={cn(
            'mt-3 font-bold text-ink-900 group-hover:text-brand-700 transition-colors',
            featured ? 'font-[family-name:var(--ug-serif)] text-2xl leading-snug md:text-3xl' : 'text-lg leading-snug'
          )}
        >
          {article.title}
        </Heading>
        <p
          className={cn(
            'mt-3 leading-relaxed text-ink-500 flex-1',
            featured ? 'text-base md:text-lg' : 'text-sm'
          )}
        >
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-white text-xs font-bold">
            {article.author.name[0]}
          </span>
          <div>
            <div className="text-xs font-semibold text-ink-800">{article.author.name}</div>
            <div className="text-[10px] text-ink-400">{article.author.role}</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:gap-2 transition-all">
            閱讀
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
