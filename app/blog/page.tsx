import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ArticleCard } from '@/components/ArticleCard';
import { articles } from '@/lib/data/articles';

export const metadata: Metadata = {
  title: '行銷專欄',
  description:
    '宇果國際行銷的 LINE × CRM 思維筆記：把 LINE@ 變成 CRM 的策略、多分店架構設計、行銷自動化實戰，給經營者讀的內容。'
};

export default function BlogPage() {
  const [first, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Marketing Column"
        title="把 LINE × CRM 想清楚的地方"
        subtitle="不寫工具教學、不寫廣告話術。專注討論：行銷策略、CRM 架構、店家經營者要懂的決策邏輯。"
      />

      <section className="section">
        <div className="container-ug">
          {/* Featured (latest) */}
          {first ? (
            <div className="mb-10">
              <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-600 mb-4">
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
