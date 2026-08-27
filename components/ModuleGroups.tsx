import { siteModuleGroups } from '@/lib/data/modules';

/**
 * 官網展示的模組清單。
 *
 * 原本做成可切換的頁籤，但對外只剩兩組時，頁籤等於多一道操作才看得到內容 ——
 * 直接兩區塊攤開反而好懂，也讓「分店各自開」與「全品牌共用」的差別並排就看得出來。
 */
export function ModuleGroups() {
  return (
    <div className="space-y-14">
      {siteModuleGroups.map((g) => (
        <section key={g.key}>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
                {g.label}
                <span className="ml-2 font-mono text-sm font-bold text-brand-600">
                  {g.modules.length}
                </span>
              </h3>
              <p className="mt-1 text-sm text-ink-500">{g.caption}</p>
            </div>
            <p className="text-xs text-ink-400">{g.hint}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.modules.map((m) => (
              <article
                key={m.id}
                className="group flex gap-3.5 rounded-2xl border border-ink-100 bg-white p-[18px] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
              >
                <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-base font-extrabold text-brand-800 transition-colors duration-200 group-hover:border-brand-800 group-hover:bg-brand-800 group-hover:text-white">
                  {m.mark}
                </span>
                <div className="min-w-0">
                  <h4 className="text-[0.92rem] font-bold text-ink-900">{m.title}</h4>
                  <p className="mt-1 text-[0.79rem] leading-relaxed text-ink-400">{m.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
