import type { ArticleSection } from '@/lib/data/articles';

/**
 * 渲染一篇文章的內文 sections
 */
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="space-y-6">
      {sections.map((s, i) => {
        switch (s.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                className="font-display font-extrabold text-2xl md:text-3xl text-ink-900 tracking-tight mt-12 first:mt-0"
              >
                {s.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="font-display font-bold text-lg md:text-xl text-ink-900 mt-8">
                {s.text}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-base md:text-lg leading-[1.85] text-ink-700">
                {s.text}
              </p>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-brand-500 pl-6 py-2 my-8 text-lg md:text-xl italic text-ink-800 leading-relaxed"
              >
                {s.text}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i} className="space-y-3 ml-1">
                {s.items.map((it, j) => (
                  <li key={j} className="flex items-start gap-3 text-base text-ink-700 leading-relaxed">
                    <span className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <aside
                key={i}
                className="my-8 rounded-2xl bg-brand-50 border border-brand-200 p-6"
              >
                <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-brand-700">
                  {s.title}
                </div>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-800">
                  {s.text}
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
