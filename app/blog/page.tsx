import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArticleCard } from '@/components/ArticleCard';
import { articles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: 'LINE 經營知識',
  description:
    '給經營者的 LINE 會員經營筆記：會員制度規劃、行銷自動化實務、多分店營運，專注討論真正用得上的決策邏輯。'
};

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
              <ArticleCard article={first} featured />
            </div>
          ) : null}

          {/* Grid */}
          {rest.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
