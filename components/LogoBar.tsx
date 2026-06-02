import { clientLogos } from '@/lib/data/cases';

export function LogoBar({ caption = '已在這些品牌的日常運轉' }: { caption?: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-ink-400">
        {caption}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {clientLogos.map((c) => (
          <div
            key={c.name}
            className="inline-flex items-center gap-2.5 text-ink-400 hover:text-ink-700 transition-colors grayscale hover:grayscale-0"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink-100 font-bold text-xs">
              {c.initial}
            </span>
            <span className="text-sm font-semibold">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
