import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { articles, articleBySlug, relatedArticles } from '@/lib/data/articles';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleCard } from '@/components/ArticleCard';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/data/site';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleBySlug(params.slug);
  if (!a) return { title: '文章不存在' };
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.excerpt,
      publishedTime: a.publishedAt,
      authors: [a.author.name]
    },
    alternates: { canonical: `${site.url}/blog/${a.slug}` }
  };
}

const coverBg: Record<'brand' | 'ink' | 'mint', string> = {
  brand: 'bg-gradient-to-br from-brand-400 to-brand-600',
  ink: 'bg-gradient-to-br from-ink-800 to-ink-900',
  mint: 'bg-gradient-to-br from-mint-400 to-brand-500'
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articleBySlug(params.slug);
  if (!a) return notFound();
  const related = relatedArticles(a.slug, 2);
  const date = new Date(a.publishedAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.excerpt,
    datePublished: a.publishedAt,
    author: { '@type': 'Person', name: a.author.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url
    },
    mainEntityOfPage: `${site.url}/blog/${a.slug}`,
    inLanguage: 'zh-TW'
  };

  return (
    <>
      <JsonLd data={articleLd} />

      {/* Hero / Cover */}
      <section className={`${coverBg[a.cover.tone]} pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden`}>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="container-ug relative max-w-3xl text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            回到專欄列表
          </Link>
          <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-semibold tracking-widest-2 uppercase text-white">
            {a.category}
          </span>
          <h1 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl mt-5 text-balance leading-tight">
            {a.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed text-balance">
            {a.excerpt}
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-white/85">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-900 font-bold">
              {a.author.name[0]}
            </span>
            <div>
              <div className="font-semibold text-white">{a.author.name}</div>
              <div className="text-xs text-white/70">{a.author.role}</div>
            </div>
            <span className="mx-1 h-3 w-px bg-white/40" />
            <span>{date}</span>
            <span className="mx-1 h-3 w-px bg-white/40" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {a.readingMinutes} 分鐘
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="section">
        <div className="container-ug max-w-3xl">
          <ArticleBody sections={a.sections} />

          {/* Author + CTA */}
          <div className="mt-16 pt-10 border-t border-ink-100">
            <div className="card p-6 md:p-8 bg-mist-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white text-2xl font-extrabold shadow-brand shrink-0">
                {a.author.name[0]}
              </span>
              <div className="flex-1">
                <div className="text-xs tracking-widest-2 uppercase font-semibold text-brand-700">
                  關於作者
                </div>
                <div className="mt-1 text-lg font-bold text-ink-900">
                  {a.author.name} · {a.author.role}
                </div>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                  Shark 親自操作過 100+ 企業內部工具與 LINE 行銷流程，協助企業把會員經營、行銷自動化與門市營運整理成真正能執行的系統。
                </p>
              </div>
              <a
                href={site.contact.lineUrl}
                target="_blank"
                rel="noopener"
                className="btn-line shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
                加 LINE 聊
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 ? (
        <section className="section-tight bg-mist-100 border-t border-ink-100">
          <div className="container-ug">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-3">繼續讀</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                所有文章
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
