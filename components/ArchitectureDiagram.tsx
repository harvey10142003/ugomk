import { ArrowDown } from 'lucide-react';
import { architectureLayers } from '@/lib/data/modules';
import { cn } from '@/lib/utils';

/**
 * 四層架構圖 — 全頁的視覺高點。
 * 用 CSS 疊層而非插畫：層與層之間的箭頭代表「資料往下走、模組掛在核心上」，
 * 第 02 層（核心）用實心漸層 pill 拉開層級，讓「所有東西都掛在這一層」看得出來。
 */
export function ArchitectureDiagram() {
  return (
    <div className="grid gap-3.5">
      {architectureLayers.map((layer, i) => (
        <div key={layer.no}>
          <div
            className={cn(
              'rounded-2xl border p-5 md:p-6 transition-colors duration-300',
              layer.core
                ? 'border-brand-300/50 bg-gradient-to-br from-brand-600/50 to-brand-800/30'
                : 'border-brand-200/20 bg-white/[0.035] hover:border-brand-200/45 hover:bg-white/[0.06]'
            )}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-brand-300/35 px-1.5 py-0.5 font-mono text-[11px] text-brand-300">
                {layer.no}
              </span>
              <span className="text-base font-bold text-white">{layer.title}</span>
              <span className="ml-auto text-xs text-brand-300">{layer.caption}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span
                  key={item.label}
                  className={cn(
                    'rounded-full border px-3.5 py-[7px] text-[0.82rem]',
                    layer.core
                      ? 'border-transparent bg-gradient-to-br from-brand-600 to-brand-800 font-bold text-white'
                      : 'line' in item && item.line
                        ? 'border-line-500/35 bg-line-500/[0.14] font-medium text-line-300'
                        : 'border-brand-200/20 bg-white/[0.07] font-medium text-brand-100'
                  )}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          {i < architectureLayers.length - 1 ? (
            <div className="flex h-6 items-center justify-center text-brand-400" aria-hidden>
              <ArrowDown className="h-4 w-4" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
