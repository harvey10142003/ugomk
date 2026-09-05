import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArticleCard } from '@/components/ArticleCard';
import { CtaBlock } from '@/components/CtaBlock';
import { articles } from '@/lib/data/articles';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  path: '/blog',
  title: 'LINE 經營知識',
  description:
    '給經營者的 LINE 會員經營筆記：會員制度規劃、行銷自動化實務、多分店營運，專注討論真正用得上的決策邏輯。'
});

export default function BlogPage() {
  const [first, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="LINE 經營知識"
        title="把 LINE 會員經營想清楚的地方"
        subtitle="不寫工具教學、不寫廣告話術。專注討論：會員經營策略、制度設計，與經營者要懂的決策邏輯。"
      />

      <section className="section">
        <div className="container-ug">
          {/* Featured (latest) */}
          {first ? (
            <div className="mb-10">
              <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-700 mb-4">
                最新一篇
              </div>
              {/* 卡片直接掛在 PageHero 的 h1 底下，所以標題是 h2 */}
              <ArticleCard article={first} featured headingLevel="h2" />
            </div>
          ) : null}

          {/* Grid —— 目前 rest 只有 2 篇，三欄會空掉第三格 */}
          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} headingLevel="h2" />
              ))}
            </div>
          ) : null}

          {/* 整個 main 裡原本 0 個連到 /contact 的連結，讀完就掉進 footer */}
          <div className="mt-14">
            <CtaBlock
              title="讀完想直接問問看自己的狀況？"
              description="把你現在的 LINE 好友數、產業與最想改善的問題講一遍，我們一起看哪一段先做比較有效。"
              secondary={{ label: '看實際案例', href: '/cases' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
