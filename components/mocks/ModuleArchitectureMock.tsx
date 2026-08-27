import Link from 'next/link';
import { Check, Plus, ArrowUpRight } from 'lucide-react';
import { memberCoreFields, orbitModules } from '@/lib/data/modules';
import { cn } from '@/lib/utils';

/**
 * 多模組架構圖 —「一份會員資料在中間，模組像積木掛在外面」。
 *
 * 設計上要同時說明三件事，所以視覺分了三層：
 *   1. 中間是核心（發光、最亮）—— 所有模組共用的那份會員資料
 *   2. 已開通的模組：實心圖示 + 實線連到核心 + 資料流動動畫，看得出「正在往核心送資料」
 *   3. 沒開通的：虛線邊框與虛線連線，明確是「可以再加」而不是「壞掉」
 *
 * 卡片本身是連結，點了直接看該模組的說明頁 —— 這張圖不只是插圖，也是導覽。
 *
 * 桌機用 3x3 九宮格圍繞核心；手機改成核心置頂、模組兩欄排下來，連線隱藏
 * —— 窄螢幕硬擠環繞只會糊成一團。
 *
 * ⚠️ 格位一律用寫死的 class（不是動態拼字串），否則 Tailwind 掃不到、
 * 產不出 CSS，版面會靜默塌掉。
 */

// 九宮格：順時針從左上起，對應 orbitModules 的順序。
// x/y 是連線的端點（%），刻意落在卡片朝向核心的那一側，線才不會被卡片蓋住。
const SLOTS = [
  { cls: 'lg:col-start-1 lg:row-start-1', x: 30, y: 30 },
  { cls: 'lg:col-start-2 lg:row-start-1', x: 50, y: 27 },
  { cls: 'lg:col-start-3 lg:row-start-1', x: 70, y: 30 },
  { cls: 'lg:col-start-3 lg:row-start-2', x: 73, y: 50 },
  { cls: 'lg:col-start-3 lg:row-start-3', x: 70, y: 70 },
  { cls: 'lg:col-start-2 lg:row-start-3', x: 50, y: 73 },
  { cls: 'lg:col-start-1 lg:row-start-3', x: 30, y: 70 },
  { cls: 'lg:col-start-1 lg:row-start-2', x: 27, y: 50 }
];

export function ModuleArchitectureMock() {
  return (
    <div className="relative">
      {/* 連線層 —— 只在桌機的九宮格版顯示 */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="wire-on" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7CB6C6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#AED3DF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7CB6C6" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {SLOTS.map((s, i) => {
          const on = orbitModules[i]?.on;
          return on ? (
            <g key={i}>
              {/* 底線 */}
              <line x1="50" y1="50" x2={s.x} y2={s.y} stroke="#7CB6C6" strokeOpacity="0.45" strokeWidth="0.7" />
              {/* 流動的亮點：表示這個模組正在把資料寫回核心 */}
              <line
                x1="50"
                y1="50"
                x2={s.x}
                y2={s.y}
                stroke="url(#wire-on)"
                strokeWidth="1.2"
                strokeDasharray="5 12"
                strokeLinecap="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="20"
                  to="0"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </line>
            </g>
          ) : (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={s.x}
              y2={s.y}
              stroke="#AED3DF"
              strokeOpacity="0.22"
              strokeWidth="0.6"
              strokeDasharray="1.5 2.5"
            />
          );
        })}
      </svg>

      <div className="relative grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-9">
        {/* 核心：手機置頂橫幅，桌機回到正中央 */}
        <div className="order-first col-span-2 lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-2">
          <div className="relative">
            {/* 光暈：讓核心在九宮格裡一眼就是重心 */}
            <div
              className="absolute -inset-5 rounded-full bg-brand-400/25 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-brand-300/60 bg-gradient-to-br from-brand-500/70 to-brand-800/80 p-5 text-center shadow-brand">
              <div className="text-[0.68rem] font-semibold uppercase tracking-widest-2 text-brand-100">
                Core
              </div>
              <div className="mt-1.5 text-base font-extrabold text-white">同一份會員資料</div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {memberCoreFields.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-white/20 px-2 py-1 text-[0.66rem] font-medium text-white"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {orbitModules.map((m, i) => (
          <Link
            key={m.label}
            href={`/solutions/${m.id}`}
            className={cn(
              'group relative rounded-2xl border p-4 text-center transition-all duration-300',
              SLOTS[i].cls,
              m.on
                ? 'border-brand-300/50 bg-white/[0.10] hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white/[0.16]'
                : 'border-dashed border-brand-200/30 bg-white/[0.02] hover:border-brand-200/60 hover:bg-white/[0.06]'
            )}
          >
            <ArrowUpRight
              className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-brand-200/0 transition-colors duration-300 group-hover:text-brand-200/80"
              aria-hidden
            />
            <span
              className={cn(
                'mx-auto grid h-11 w-11 place-items-center rounded-xl text-sm font-extrabold transition-colors duration-300',
                m.on
                  ? 'bg-brand-100 text-brand-900 shadow-[0_0_20px_-4px_rgba(174,211,223,0.7)]'
                  : 'border border-dashed border-brand-200/40 text-brand-200/60 group-hover:text-brand-200'
              )}
            >
              {m.mark}
            </span>
            <div
              className={cn(
                'mt-2.5 text-[0.85rem] font-bold transition-colors duration-300',
                m.on ? 'text-white' : 'text-brand-200/70 group-hover:text-white'
              )}
            >
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
          </Link>
        ))}
      </div>

      {/* 圖例 —— 不解釋的話，虛線容易被讀成「壞掉」而不是「還沒開」 */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-brand-200">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-100" />
          這間店已開通
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-brand-200/60" />
          之後想加再開
        </span>
        <span className="inline-flex items-center gap-2 text-brand-300">
          <span className="h-px w-6 bg-brand-200/70" />
          資料寫回同一份會員
        </span>
      </div>
    </div>
  );
}
