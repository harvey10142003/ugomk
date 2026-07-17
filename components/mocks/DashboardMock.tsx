import {
  LayoutDashboard,
  Users,
  Ticket,
  BarChart3,
  Megaphone,
  Settings,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

/**
 * 後台 dashboard mock — Hero 主視覺
 * 純 CSS / HTML，無圖檔，響應式
 */
export function DashboardMock() {
  return (
    <div className="glass overflow-hidden p-1.5">
      {/* Browser frame */}
      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <div className="ml-3 flex-1 max-w-xs">
          <div className="flex items-center gap-1.5 rounded-md bg-mist-200 px-2.5 py-1 text-[10px] text-ink-500">
            <span className="text-brand-500">●</span>
            admin.ugomkcrm.com
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white overflow-hidden border border-ink-100">
        <div className="grid grid-cols-[160px_1fr]">
          {/* Sidebar */}
          <aside className="bg-mist-100 border-r border-ink-100 py-4 px-3">
            <div className="flex items-center gap-2 mb-5 px-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-brand text-white text-[10px] font-bold">
                U
              </span>
              <span className="text-xs font-bold text-ink-800">finnail</span>
            </div>
            <ul className="space-y-1">
              {[
                { icon: LayoutDashboard, label: '儀表板', active: true },
                { icon: Users, label: '會員' },
                { icon: Ticket, label: '票券' },
                { icon: Megaphone, label: '推播' },
                { icon: BarChart3, label: '報表' },
                { icon: Settings, label: '設定' }
              ].map(({ icon: Icon, label, active }) => (
                <li
                  key={label}
                  className={
                    active
                      ? 'flex items-center gap-2 rounded-md bg-white px-2 py-1.5 text-[11px] font-semibold text-ink-900 shadow-soft'
                      : 'flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-ink-500'
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] tracking-widest-2 uppercase text-ink-400 font-semibold">
                  Overview · 今日
                </div>
                <div className="mt-0.5 text-sm font-bold text-ink-900">營運儀表板</div>
              </div>
              <span className="chip-brand">
                <Sparkles className="h-3 w-3" />
                即時
              </span>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '今日新會員', value: '+24', delta: '+18%', accent: true },
                { label: '推播觸及', value: '1,386', delta: '+9%' },
                { label: '本月營收', value: 'NT$ 184k', delta: '+12%' }
              ].map((c) => (
                <div
                  key={c.label}
                  className={
                    c.accent
                      ? 'rounded-lg bg-brand-50 border border-brand-200 p-3'
                      : 'rounded-lg bg-mist-100 border border-ink-100 p-3'
                  }
                >
                  <div className="text-[9px] tracking-widest-2 uppercase text-ink-500 font-semibold">
                    {c.label}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-ink-900">{c.value}</span>
                    <span className="text-[10px] font-semibold text-brand-800 inline-flex items-center">
                      <ArrowUpRight className="h-3 w-3" />
                      {c.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-4 rounded-lg border border-ink-100 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-semibold text-ink-800">會員成長 · 近 14 天</div>
                <div className="flex items-center gap-2 text-[9px] text-ink-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    新增
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />
                    流失
                  </span>
                </div>
              </div>
              <svg viewBox="0 0 280 70" className="w-full h-16">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#06C755" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06C755" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,55 L20,48 L40,52 L60,42 L80,38 L100,40 L120,30 L140,26 L160,28 L180,20 L200,22 L220,14 L240,10 L260,12 L280,6 L280,70 L0,70 Z"
                  fill="url(#g)"
                />
                <path
                  d="M0,55 L20,48 L40,52 L60,42 L80,38 L100,40 L120,30 L140,26 L160,28 L180,20 L200,22 L220,14 L240,10 L260,12 L280,6"
                  fill="none"
                  stroke="#06C755"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,62 L20,60 L40,61 L60,58 L80,59 L100,56 L120,57 L140,54 L160,55 L180,52 L200,53 L220,50 L240,49 L260,50 L280,48"
                  fill="none"
                  stroke="#9CA5B4"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Activity row */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { name: '林小姐', action: '兌換 100 點 → 修甲券', time: '2 分鐘前' },
                { name: '陳先生', action: '完成預約 · 美甲師 Amy', time: '5 分鐘前' }
              ].map((a) => (
                <div key={a.name} className="rounded-md border border-ink-100 bg-white p-2">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-br from-brand-400 to-mint-400 inline-flex items-center justify-center text-white text-[8px] font-bold">
                      {a.name[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-ink-800">{a.name}</span>
                    <span className="text-[9px] text-ink-400 ml-auto">{a.time}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-ink-500 pl-7">{a.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
