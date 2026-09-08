import { CircleAlert } from 'lucide-react';
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
          case 'checklist':
            return (
              <ol key={i} className="my-8 space-y-4">
                {s.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 md:p-6"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-800 text-xs font-bold text-white">
                      {j + 1}
                    </span>
                    {/* min-w-0：長中文句子在 flex 子項裡不縮，會把卡片撐出容器 */}
                    <div className="min-w-0">
                      <div className="text-base font-bold text-ink-900">{it.label}</div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600 md:text-base">
                        {it.detail}
                      </p>
                      {it.watch ? (
                        <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-500">
                          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          <span>{it.watch}</span>
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            );
          case 'compare':
            return (
              <div key={i} className="my-8">
                {/* 桌機：三欄對照表 */}
                <div className="hidden overflow-x-auto rounded-2xl border border-ink-100 md:block">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-mist-300">
                        <th scope="col" className="w-36 px-5 py-4 font-semibold text-ink-500">
                          維度
                        </th>
                        <th scope="col" className="px-5 py-4 font-bold text-ink-900">
                          {s.columns[0]}
                        </th>
                        <th scope="col" className="px-5 py-4 font-bold text-brand-800">
                          {s.columns[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.map((r) => (
                        <tr key={r.label} className="border-t border-ink-100 align-top">
                          <th
                            scope="row"
                            className="px-5 py-4 text-left font-semibold text-ink-800"
                          >
                            {r.label}
                          </th>
                          <td className="px-5 py-4 leading-relaxed text-ink-600">{r.a}</td>
                          <td className="px-5 py-4 leading-relaxed text-ink-700">{r.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/*
                  手機：一列拆成一張卡。
                  390px 放不下三欄表格，硬塞的話不是字擠成一行一字，就是整篇文章跟著橫向捲動。
                */}
                <div className="space-y-4 md:hidden">
                  {s.rows.map((r) => (
                    <div key={r.label} className="rounded-2xl border border-ink-100 bg-white p-5">
                      <div className="text-sm font-bold text-ink-900">{r.label}</div>
                      <div className="mt-3">
                        <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-ink-400">
                          {s.columns[0]}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">{r.a}</p>
                      </div>
                      <div className="mt-4 border-t border-ink-100 pt-4">
                        <div className="text-[11px] font-semibold uppercase tracking-widest-2 text-brand-700">
                          {s.columns[1]}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-ink-700">{r.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
