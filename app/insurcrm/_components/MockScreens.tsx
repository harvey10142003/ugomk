import {
  CalendarClock,
  Camera,
  Check,
  Gift,
  Heart,
  MessageCircle,
  MoonStar,
  Phone,
  ShieldCheck,
  Sunrise,
  UserRound
} from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * 功能分頁與手機輪播用的「示意畫面」。全部以 CSS 與圖示自繪，人名與數字皆為虛構。
 * 產品尚未上線，這些不是實際截圖 —— 頁面上有對應的說明文字。
 */

function Window({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card', className)}>
      <div className="flex items-center gap-2 border-b border-ink-100 bg-mist-200 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="ml-2 truncate text-xs font-semibold text-ink-500">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Person({ name, role, tone = 'brand' }: { name: string; role: string; tone?: 'brand' | 'mint' | 'lantern' }) {
  const ring =
    tone === 'brand' ? 'bg-brand-700 text-white' : tone === 'mint' ? 'bg-mint-200 text-brand-900' : 'bg-[#F6DFB5] text-[#6B4410]';
  return (
    <div className="flex w-20 flex-col items-center gap-1 text-center">
      <span className={cn('inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold', ring)}>
        {name.slice(0, 1)}
      </span>
      <span className="text-xs font-bold text-ink-900">{name}</span>
      <span className="text-[10px] text-ink-500">{role}</span>
    </div>
  );
}

export function FamilyMock() {
  const rows = [
    { k: '壽險', have: 60, need: 100 },
    { k: '醫療', have: 80, need: 100 },
    { k: '意外（小孩）', have: 0, need: 100 }
  ];
  return (
    <Window title="王家｜家庭總覽">
      {/* 家庭樹：父母在左右 1/4 處，連線從中間往下分到兩個小孩（Person 固定 w-20、gap-6 → 小孩中心在 ±52px） */}
      <div className="pb-2">
        <div className="grid grid-cols-2 justify-items-center">
          <Person name="王小明" role="本人．A 級" />
          <Person name="林雅婷" role="配偶" tone="mint" />
        </div>
        <svg className="mt-1 block h-5 w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <path d="M25 0 V9 H75 V0 M50 9 V20" fill="none" stroke="#AED3DF" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="mx-auto block h-3 w-[104px]" viewBox="0 0 104 12" aria-hidden>
          <path d="M1 12 V1 H103 V12" fill="none" stroke="#AED3DF" strokeWidth="2" />
        </svg>
        <div className="flex justify-center gap-6">
          <Person name="王小安" role="長子 12 歲" tone="lantern" />
          <Person name="王小樂" role="次女 8 歲" tone="lantern" />
        </div>
      </div>
      <div className="mt-5 space-y-3 border-t border-ink-100 pt-4">
        <div className="flex justify-between text-[11px] font-semibold text-ink-500">
          <span>保障缺口（規則式）</span>
          <span>已有 / 建議</span>
        </div>
        {rows.map((r) => (
          <div key={r.k}>
            <div className="flex justify-between text-xs text-ink-700">
              <span>{r.k}</span>
              <span className={r.have === 0 ? 'font-bold text-red-700' : r.have < r.need ? 'font-bold text-amber-700' : ''}>
                {r.have}%
              </span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-mist-300">
              <div
                className={cn('h-2 rounded-full', r.have === 0 ? 'bg-red-400' : r.have < r.need ? 'bg-amber-400' : 'bg-brand-500')}
                style={{ width: `${Math.max(r.have, 3)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}

export function PolicyMock() {
  const fields = [
    { k: '保險公司', v: '○○人壽', ok: true },
    { k: '險種', v: '醫療', ok: true },
    { k: '被保險人', v: '王小明', ok: true },
    { k: '生效日', v: '2021/03/15', ok: true },
    { k: '年繳保費', v: '待確認', ok: false }
  ];
  return (
    <Window title="保單整理｜拍照辨識首頁">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 sm:h-full">
          <Camera className="h-8 w-8 text-brand-600" aria-hidden />
          <span className="icrm-scan absolute inset-x-3 top-1/2 h-0.5 rounded-full bg-[#1AC6C8] shadow-[0_0_12px_2px_rgba(26,198,200,0.6)]" aria-hidden />
        </div>
        <ul className="space-y-2">
          {fields.map((f) => (
            <li key={f.k} className="flex items-center justify-between rounded-xl bg-mist-200 px-3 py-2 text-xs">
              <span className="text-ink-500">{f.k}</span>
              <span className={cn('flex items-center gap-1 font-bold', f.ok ? 'text-ink-900' : 'text-amber-700')}>
                {f.v}
                {f.ok ? <Check className="h-3.5 w-3.5 text-brand-600" aria-hidden /> : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
        低信心欄位不預填，請你確認後再存。只拍保單資料頁，請勿拍健康告知書。
      </p>
    </Window>
  );
}

export function CalendarMock() {
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  const events: Record<number, { t: string; c: string }[]> = {
    1: [{ t: '繳費 陳○', c: 'bg-brand-100 text-brand-800' }],
    2: [{ t: '約訪 王○明', c: 'bg-brand-700 text-white' }],
    3: [{ t: '生日 林○婷', c: 'bg-[#F6DFB5] text-[#6B4410]' }],
    4: [{ t: '週年 李○', c: 'bg-mint-200 text-brand-900' }],
    5: [
      { t: '中秋節', c: 'bg-[#F6DFB5] text-[#6B4410]' },
      { t: '久未聯絡 3', c: 'bg-mist-300 text-ink-700' }
    ]
  };
  return (
    <Window title="行事曆｜本週">
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {days.map((d, i) => (
          <div key={d} className="min-h-[112px] rounded-xl bg-mist-200 p-1.5">
            <div className={cn('text-[11px] font-bold', i === 1 ? 'text-brand-700' : 'text-ink-500')}>{d}</div>
            <div className="mt-1.5 space-y-1">
              {(events[i] || []).map((e) => (
                <div key={e.t} className={cn('rounded-md px-1 py-1 text-[9px] font-semibold leading-tight', e.c)}>
                  {e.t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-ink-600">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-800">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
          已同步到手機日曆
        </span>
        <span>事件標題預設遮罩客戶姓名</span>
      </div>
    </Window>
  );
}

export function CareMock() {
  return (
    <Window title="今日祝福｜待確認 3 則">
      <ul className="space-y-2.5">
        {[
          { who: '王大哥', o: '生日', icon: Gift },
          { who: '林媽媽', o: '中秋節（農曆）', icon: MoonStar },
          { who: '陳小姐', o: '保單週年', icon: ShieldCheck }
        ].map(({ who, o, icon: Icon }, i) => (
          <li key={who} className="flex items-center gap-3 rounded-2xl border border-ink-100 p-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FBEFD9] text-[#B7791F]">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-ink-900">{who}</div>
              <div className="text-xs text-ink-500">{o}</div>
            </div>
            <span
              className={cn(
                'inline-flex h-6 w-6 items-center justify-center rounded-full',
                i < 2 ? 'bg-brand-700 text-white' : 'border border-ink-200'
              )}
            >
              {i < 2 ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-2xl bg-brand-800 py-2.5 text-center text-sm font-bold text-white">確認，09:00 發出</div>
    </Window>
  );
}

export function ClientMock() {
  return (
    <Window title="客戶的 LINE｜我的保單">
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 p-4 text-white">
        <div className="text-xs text-brand-100">王小明 的保單總表</div>
        <div className="mt-1 text-2xl font-extrabold tabular-nums">4 張有效保單</div>
        <div className="mt-2 text-[11px] text-brand-100">下次繳費：10/15 醫療險（年繳）</div>
      </div>
      <ul className="mt-3 space-y-2 text-xs">
        {[
          ['壽險', '○○人壽', '有效'],
          ['醫療', '△△人壽', '有效'],
          ['意外', '□□產險', '有效']
        ].map(([k, c, s]) => (
          <li key={k} className="flex items-center justify-between rounded-xl bg-mist-200 px-3 py-2">
            <span className="font-bold text-ink-900">{k}</span>
            <span className="text-ink-500">{c}</span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 font-semibold text-brand-800">{s}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-2xl bg-line-700 py-2.5 text-sm font-bold text-white">
        <MessageCircle className="h-4 w-4" aria-hidden />
        聯絡我的服務人員
      </div>
    </Window>
  );
}

/* ── 手機輪播用畫面（放在 PhoneFrame 內） ─────────────────── */

function ScreenHead({ title }: { title: string }) {
  return (
    <div className="bg-brand-900 px-4 pb-3 pt-9 text-center text-[13px] font-bold text-white">{title}</div>
  );
}

export function BriefScreen() {
  return (
    <div className="flex h-full flex-col bg-[#DCE8EC]">
      <ScreenHead title="早報" />
      <div className="space-y-2.5 p-3">
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-brand-800">
            <Sunrise className="h-4 w-4" aria-hidden />
            早安，今天的重點
          </div>
          <ul className="mt-2 space-y-1.5 text-[11px] text-ink-700">
            <li>10:30 約訪 王○明（年度檢視）</li>
            <li>14:00 送件 李○華</li>
            <li>3 則祝福待確認</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="text-[12px] font-bold text-ink-900">到期提醒</div>
          <ul className="mt-2 space-y-1.5 text-[11px] text-ink-700">
            <li>陳小姐 保單週年剩 5 天</li>
            <li>張先生 繳費日 10/03</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="text-[12px] font-bold text-ink-900">久未聯絡</div>
          <div className="mt-2 flex -space-x-2">
            {['林', '黃', '吳', '蔡'].map((n) => (
              <span key={n} className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-mint-200 text-[10px] font-bold text-brand-900">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SummaryScreen() {
  const cols = ['王小明', '林雅婷', '王小安'];
  const rows: [string, string[]][] = [
    ['壽險', ['300 萬', '200 萬', '—']],
    ['醫療日額', ['3,000', '2,000', '1,000']],
    ['意外', ['500 萬', '300 萬', '—']],
    ['年繳保費', ['6.2 萬', '4.1 萬', '0.8 萬']]
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHead title="家庭保障總表" />
      <div className="p-3">
        <table className="w-full table-fixed text-[10px]">
          <thead>
            <tr className="text-ink-500">
              <th className="w-[26%] py-1.5 text-left font-semibold">險種</th>
              {cols.map((c) => (
                <th key={c} className="py-1.5 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, vs]) => (
              <tr key={k} className="border-t border-ink-100">
                <td className="py-2 font-bold text-ink-900">{k}</td>
                {vs.map((v, i) => (
                  <td key={i} className={cn('py-2 text-center tabular-nums', v === '—' ? 'text-red-600 font-bold' : 'text-ink-700')}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 rounded-xl bg-mist-200 p-2 text-[9px] leading-relaxed text-ink-500">
          本表由服務人員依保單資料整理，實際權益以保險公司保單條款為準。
        </p>
      </div>
    </div>
  );
}

export function MyPolicyScreen() {
  return (
    <div className="flex h-full flex-col bg-[#F3F7F8]">
      <ScreenHead title="我的保單" />
      <div className="space-y-2.5 p-3">
        {[
          { k: '醫療險', c: '△△人壽', d: '下次繳費 10/15' },
          { k: '壽險', c: '○○人壽', d: '保單週年 11/02' },
          { k: '意外險', c: '□□產險', d: '有效' }
        ].map((p) => (
          <div key={p.k} className="flex items-center gap-2.5 rounded-2xl bg-white p-3 shadow-sm">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-bold text-ink-900">{p.k}</div>
              <div className="text-[10px] text-ink-500">
                {p.c}．{p.d}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-1.5 rounded-2xl bg-line-700 py-2.5 text-[12px] font-bold text-white">
          <MessageCircle className="h-4 w-4" aria-hidden />
          聯絡我的服務人員
        </div>
      </div>
    </div>
  );
}

export function CardScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-brand-900 to-brand-700">
      <div className="px-5 pb-4 pt-12 text-center text-white">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold ring-2 ring-white/40">
          <UserRound className="h-8 w-8" aria-hidden />
        </span>
        <div className="mt-3 text-lg font-extrabold">林業務</div>
        <div className="text-[11px] text-brand-100">○○保險經紀人．登錄字號 000000</div>
      </div>
      <div className="mx-3 space-y-2 rounded-2xl bg-white p-3 text-[11px] text-ink-700">
        <div className="flex items-center gap-2">
          <Heart className="h-3.5 w-3.5 text-brand-600" aria-hidden />
          家庭保障規劃、保單整理
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-brand-600" aria-hidden />
          服務區域：高雄、台南
        </div>
      </div>
      <div className="mx-3 mt-3 grid grid-cols-2 gap-2 text-[11px] font-bold">
        <span className="rounded-xl bg-line-700 py-2 text-center text-white">加入好友</span>
        <span className="rounded-xl bg-white/15 py-2 text-center text-white">分享名片</span>
      </div>
    </div>
  );
}
