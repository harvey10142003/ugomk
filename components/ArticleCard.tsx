import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/data/articles';
import { cn } from '@/lib/utils';

const coverBg: Record<Article['cover']['tone'], string> = {
  brand: 'bg-gradient-to-br from-brand-400 to-brand-600',
  ink: 'bg-gradient-to-br from-ink-800 to-ink-900',
  mint: 'bg-gradient-to-br from-mint-400 to-brand-500'
};

export function ArticleCard({
  article,
  featured = false
}: {
  article: Article;
  featured?: boolean;
}) {
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
        <span className="text-[64px] md:text-[88px] drop-shadow-lg select-none">
          {article.cover.emoji}
        </span>
        <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-ink-800">
          {article.category}
        </span>
      </div>

      <div className={cn('p-6 md:p-8 flex flex-col', featured && 'md:p-10')}>
        <div className="flex items-center gap-2 text-[11px] text-ink-400">
          <span>{date}</span>
          <span className="vertical-rule" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readingMinutes} 分鐘
          </span>
        </div>
        <h3
          className={cn(
            'mt-3 font-display font-bold text-ink-900 tracking-tight group-hover:text-brand-700 transition-colors',
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          )}
        >
          {article.title}
        </h3>
        <p
          className={cn(
            'mt-3 leading-relaxed text-ink-500 flex-1',
            featured ? 'text-base md:text-lg' : 'text-sm'
          )}
        >
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-white text-xs font-bold">
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
