import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { articles, articleBySlug, relatedArticles } from '@/lib/data/articles';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleCard } from '@/components/ArticleCard';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/data/site';
import { breadcrumbLd } from '@/lib/jsonld';
import { pageMeta, OG_IMAGE } from '@/lib/seo';
import { sourceFromPath, ctaHref } from '@/lib/site-source';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleBySlug(params.slug);
  if (!a) return { title: '文章不存在' };
  return pageMeta({
    path: `/blog/${a.slug}`,
    title: a.title,
    description: a.excerpt,
    ogType: 'article',
    // 文章沒有自己的社群圖，退回全站 og.jpg —— 原本連 images 都沒給，
    // 宣告了 summary_large_image 卻分享出純文字卡
    ogImage: OG_IMAGE,
    article: { publishedTime: a.publishedAt, authors: [a.author.name] }
  });
}


export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articleBySlug(params.slug);
  if (!a) return notFound();
  const related = relatedArticles(a.slug, 2);
  // source 帶到單篇 —— 「部落格有效」與「哪一篇有效」是兩個問題
  const source = sourceFromPath(`/blog/${a.slug}`);
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

  const breadcrumb = breadcrumbLd([
    { name: '首頁', path: '/' },
    { name: 'LINE 經營知識', path: '/blog' },
    { name: a.title, path: `/blog/${a.slug}` }
  ]);

  return (
    <>
      <JsonLd data={[articleLd, breadcrumb]} />

      {/* Hero / Cover */}
      {/*
        2026-09-28：原本是整片漸層色塊＋白字，改成淺底＋襯線標題（與全站頁首一致）；
        「回到專欄列表」原本是 inline-flex、和分類標籤擠在同一行而重疊，改成獨立一行。
      */}
      <section className="hero-bg pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="container-ug relative max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 flex w-fit items-center gap-2 text-sm font-bold text-ink-500 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            回到專欄列表
          </Link>
          <span className="eyebrow">{a.category}</span>
          <h1 className="heading-1 mt-5">{a.title}</h1>
          <p className="body-lg mt-6">{a.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white font-bold">
              {a.author.name[0]}
            </span>
            <div>
              <div className="font-bold text-ink-900">{a.author.name}</div>
              <div className="text-xs text-ink-400">{a.author.role}</div>
            </div>
            <span className="mx-1 h-3 w-px bg-ink-200" />
            <span>{date}</span>
            <span className="mx-1 h-3 w-px bg-ink-200" />
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

          {/*
            文末的題目出口。
            作者區塊那顆固定指向 /contact，回答的是「要不要聯絡我們」；這一塊回答的是
            「這個題目的下一頁在哪」—— 買方視角的文章讀完，下一步通常不是留資料，
            是去看那件事實際長什麼樣。兩顆按鈕都走 ctaHref，source 用文章 slug，
            所以名單進來時看得出是哪一篇帶來的。
            兩顆都會被標記：指向 /contact 那顆的答案落在 CRM 名單上，指向能力頁
            （/solutions/*、/pricing）那顆的答案落在 GA4 的 page_location 上 ——
            回答「哪一篇文章把人送去哪一個能力頁」。能標是因為參數不是 utm_*，
            不會污染 GA4 歸因，理由見 lib/site-source.ts 檔頭。
          */}
          {a.cta ? (
            <aside className="mt-14 rounded-2xl border border-brand-200 bg-brand-50 p-6 md:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
                下一步
              </div>
              <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                {a.cta.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-700 md:text-base">
                {a.cta.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={ctaHref(a.cta.href, source, 'article_cta')}
                  className="btn-brand"
                >
                  {a.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={ctaHref(site.cta.primary.href, source, 'article_cta_contact')}
                  className="btn-outline"
                >
                  {site.cta.primary.label}
                </Link>
              </div>
            </aside>
          ) : null}

          {/* Author + CTA */}
          <div className="mt-16 pt-10 border-t border-ink-100">
            <div className="card p-6 md:p-8 bg-mist-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white text-2xl font-bold shrink-0">
                {a.author.name[0]}
              </span>
              <div className="flex-1">
                <div className="text-sm font-bold text-brand-700">
                  關於作者
                </div>
                <div className="mt-1 text-lg font-bold text-ink-900">
                  {a.author.name} · {a.author.role}
                </div>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                  Shark 親自操作過 100+ 企業內部工具與 LINE 行銷流程，協助企業把會員經營、行銷自動化與門市營運整理成真正能執行的系統。
                </p>
              </div>
              {/*
                這頁的 main 裡原本沒有任何連到 /contact 的連結 ——
                唯一的出口是外部 LINE，讀完文章想進一步了解的人在站內就斷了。
              */}
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={site.contact.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-line"
                >
                  <MessageCircle className="h-4 w-4" />
                  加 LINE 聊
                </a>
                <Link
                  href={ctaHref(site.cta.primary.href, source, 'article_footer')}
                  className="btn-outline"
                >
                  {site.cta.primary.label}
                </Link>
              </div>
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
