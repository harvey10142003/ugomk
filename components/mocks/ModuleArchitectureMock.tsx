import { Check, Plus } from 'lucide-react';
import { memberCoreFields, orbitModules } from '@/lib/data/modules';
import { cn } from '@/lib/utils';

/**
 * 多模組架構圖 —「一份會員資料在中間，模組像積木掛在外面」。
 *
 * 用開通 / 未開通兩種狀態呈現，是為了讓「不用全部買」不必靠文字說明就看得懂：
 * 亮起來的是這間店開的，灰的是隨時可以加。
 *
 * 桌機是 3x3 九宮格圍繞核心；手機改成核心在上、模組兩欄排下來，連線隱藏
 * —— 窄螢幕硬擠環繞只會糊成一團。
 *
 * ⚠️ 格位一律用寫死的 class（不是動態拼字串），否則 Tailwind 掃不到、
 * 產不出 CSS，版面會靜默塌掉。
 */

// 九宮格：順時針從左上起，對應 orbitModules 的順序。x/y 是格中心（%），給連線層用。
const SLOTS = [
  { cls: 'lg:col-start-1 lg:row-start-1', x: 16.7, y: 16.7 },
  { cls: 'lg:col-start-2 lg:row-start-1', x: 50, y: 16.7 },
  { cls: 'lg:col-start-3 lg:row-start-1', x: 83.3, y: 16.7 },
  { cls: 'lg:col-start-3 lg:row-start-2', x: 83.3, y: 50 },
  { cls: 'lg:col-start-3 lg:row-start-3', x: 83.3, y: 83.3 },
  { cls: 'lg:col-start-2 lg:row-start-3', x: 50, y: 83.3 },
  { cls: 'lg:col-start-1 lg:row-start-3', x: 16.7, y: 83.3 },
  { cls: 'lg:col-start-1 lg:row-start-2', x: 16.7, y: 50 }
];

export function ModuleArchitectureMock() {
  return (
    <div className="relative">
      {/* 連線層 — 只在桌機九宮格顯示 */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {SLOTS.map((s, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={s.x}
            y2={s.y}
            stroke={orbitModules[i]?.on ? 'rgba(124,182,198,0.5)' : 'rgba(174,211,223,0.16)'}
            strokeWidth="0.35"
            strokeDasharray={orbitModules[i]?.on ? undefined : '1.5 1.5'}
          />
        ))}
      </svg>

      <div className="relative grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
        {/* 核心：手機置頂橫幅，桌機回到正中央 */}
        <div className="order-first col-span-2 rounded-2xl border border-brand-300/50 bg-gradient-to-br from-brand-600/60 to-brand-800/50 p-5 text-center lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-2">
          <div className="text-[0.68rem] font-semibold uppercase tracking-widest-2 text-brand-200">
            Core
          </div>
          <div className="mt-1.5 text-base font-extrabold text-white">同一份會員資料</div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {memberCoreFields.map((f) => (
              <span
                key={f}
                className="rounded-full bg-white/15 px-2 py-1 text-[0.66rem] font-medium text-white"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {orbitModules.map((m, i) => (
          <div
            key={m.label}
            className={cn(
              'rounded-2xl border p-4 text-center transition-colors duration-300',
              SLOTS[i].cls,
              m.on
                ? 'border-brand-300/45 bg-white/[0.09]'
                : 'border-dashed border-brand-200/25 bg-white/[0.02]'
            )}
          >
            <span
              className={cn(
                'mx-auto grid h-10 w-10 place-items-center rounded-xl text-sm font-extrabold',
                m.on ? 'bg-brand-100 text-brand-900' : 'border border-brand-200/25 text-brand-300/70'
              )}
            >
              {m.mark}
            </span>
            <div className={cn('mt-2.5 text-[0.82rem] font-bold', m.on ? 'text-white' : 'text-brand-200/60')}>
              {m.label}
            </div>
            <div
              className={cn(
                'mt-1 inline-flex items-center gap-1 text-[0.68rem]',
                m.on ? 'text-brand-200' : 'text-brand-300/50'
              )}
            >
              {m.on ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {m.on ? '已開通' : '可再加'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
