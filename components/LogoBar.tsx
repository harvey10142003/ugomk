import { clientLogos } from '@/lib/data/cases';

// caption 要說得出這些品牌與宇果的關係。「已在這些品牌的日常運轉」語意太寬，
// 會把顧問服務、自家站都算進「客戶」；這裡限定成「正在用這套系統營運」。
export function LogoBar({ caption = '正在用 UGO AI CRM 營運的品牌' }: { caption?: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-[11px] tracking-widest-2 uppercase font-semibold text-ink-400">
        {caption}
      </div>
      {/* 縮寫方塊是 bg-ink-100，字色 ink-400 在它上面只有 3.97:1；ink-500 是 6.21:1 */}
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {clientLogos.map((c) => (
          <div
            key={c.name}
            className="inline-flex items-center gap-2.5 text-ink-500 hover:text-ink-700 transition-colors grayscale hover:grayscale-0"
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
