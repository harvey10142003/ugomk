import { Bot, CalendarCheck, Check, FileText, MessageCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * 「更多功能」區的靜態示意圖（伺服器輸出，不增加前端 JS）。
 * 全部以 CSS／SVG 自繪；人名一律遮罩（王○明），數字皆為虛構。
 */

function Canvas({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-mint-50 p-4',
        className
      )}
    >
      {children}
    </div>
  );
}

/** 停效與流失燈號：三位客戶、紅黃綠燈與亮燈原因 */
export function LapseArt() {
  const rows = [
    { n: '陳○華', why: '繳費日已過 5 天未標已繳', c: 'bg-red-500', ring: 'ring-red-200' },
    { n: '林○婷', why: '90 天沒有互動', c: 'bg-amber-400', ring: 'ring-amber-200' },
    { n: '張○誠', why: '一切正常', c: 'bg-emerald-500', ring: 'ring-emerald-200' }
  ];
  return (
    <Canvas>
      <ul className="w-full max-w-[280px] space-y-2">
        {rows.map((r, i) => (
          <li key={r.n} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-sm">
            <span className={cn('relative inline-flex h-2.5 w-2.5 shrink-0 rounded-full ring-4', r.c, r.ring)}>
              {i === 0 ? <span className={cn('icrm-pulse-ring absolute inset-0 rounded-full', r.c)} /> : null}
            </span>
            <span className="text-xs font-bold text-ink-900">{r.n}</span>
            <span className="ml-auto truncate text-[10px] text-ink-500">{r.why}</span>
          </li>
        ))}
      </ul>
    </Canvas>
  );
}

/** 年度檢視邀約：邀約訊息＋客戶選時段 */
export function ReviewArt() {
  return (
    <Canvas>
      <div className="w-full max-w-[260px]">
        <div className="rounded-2xl rounded-bl-md bg-white p-3 text-[11px] leading-relaxed text-ink-700 shadow-sm">
          王先生您好，保單即將滿週年，想約您一起看看目前的保障是否還合適。
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[10px] font-semibold">
          {['週二 10:00', '週三 14:00', '週四 19:00'].map((t, i) => (
            <span
              key={t}
              className={cn('rounded-lg px-1 py-1.5', i === 1 ? 'bg-brand-800 text-white' : 'border border-brand-200 bg-white text-brand-800')}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-brand-800">
          <CalendarCheck className="h-3.5 w-3.5" />
          已排進你的行事曆
        </div>
      </div>
    </Canvas>
  );
}

/** 保單辨識進階版：多頁疊放＋掃描線＋逐欄信心 */
export function ScanArt() {
  return (
    <Canvas>
      <div className="relative h-28 w-24">
        <div className="absolute left-3 top-0 h-28 w-20 -rotate-6 rounded-lg border border-brand-100 bg-white shadow-sm" />
        <div className="absolute left-1.5 top-0 h-28 w-20 rotate-3 rounded-lg border border-brand-100 bg-white shadow-sm" />
        <div className="absolute left-0 top-0 h-28 w-20 overflow-hidden rounded-lg border border-brand-200 bg-white p-2 shadow-card">
          {[80, 60, 70, 50, 65].map((w, i) => (
            <div key={i} className="mb-2 h-1.5 rounded-full bg-mist-400" style={{ width: `${w}%` }} />
          ))}
          <span className="icrm-scan absolute inset-x-1 top-1/2 h-0.5 rounded-full bg-[#1AC6C8] shadow-[0_0_10px_2px_rgba(26,198,200,0.6)]" />
        </div>
      </div>
      <ul className="ml-4 space-y-1.5 text-[10px]">
        {[
          ['保險公司', 96],
          ['保單號碼', 91],
          ['年繳保費', 64]
        ].map(([k, v]) => (
          <li key={k as string} className="flex items-center gap-2 rounded-md bg-white px-2 py-1 shadow-sm">
            <span className="text-ink-600">{k}</span>
            <span className={cn('ml-auto font-bold tabular-nums', (v as number) < 80 ? 'text-amber-700' : 'text-brand-700')}>{v}%</span>
          </li>
        ))}
      </ul>
    </Canvas>
  );
}

/** 主管 AI 週報：長條圖＋一句摘要（只含統計） */
export function WeeklyArt() {
  const bars = [62, 80, 45, 90, 70];
  return (
    <Canvas>
      <div className="w-full max-w-[260px]">
        <div className="flex h-20 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand-700 to-[#1AC6C8]" style={{ height: `${h}%`, opacity: i === 2 ? 0.45 : 1 }} />
          ))}
        </div>
        <div className="mt-2 flex items-start gap-1.5 rounded-xl bg-white p-2 text-[10px] leading-relaxed text-ink-700 shadow-sm">
          <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />
          本週約訪量比過去四週平均少 2 成，提醒完成率 92%。
        </div>
      </div>
    </Canvas>
  );
}

/** 面談需求摘要：摘要卡＋客戶按「內容正確」 */
export function SummaryArt() {
  return (
    <Canvas>
      <div className="w-full max-w-[250px] rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
          <FileText className="h-3.5 w-3.5 text-brand-700" />
          面談需求摘要
        </div>
        <ul className="mt-2 space-y-1 text-[10px] text-ink-600">
          <li>・希望小孩的教育金有準備</li>
          <li>・擔心房貸期間的家庭保障</li>
          <li>・預算以每月固定支出為上限</li>
        </ul>
        <div className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-brand-800 py-1.5 text-[10px] font-bold text-white">
          <Check className="h-3 w-3" />
          客戶已確認內容正確
        </div>
      </div>
    </Canvas>
  );
}

/** 客戶在 LINE 問保單：一問一答＋條款提醒與轉真人 */
export function AskArt() {
  return (
    <Canvas className="bg-[#DCE8EC]">
      <div className="w-full max-w-[260px] space-y-2">
        <div className="flex justify-end">
          <span className="rounded-2xl rounded-br-md bg-[#A8E6A0] px-3 py-1.5 text-[11px] text-ink-900 shadow-sm">下次什麼時候繳費？</span>
        </div>
        <div className="flex items-end gap-1.5">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-800 text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <div className="rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[11px] leading-relaxed text-ink-800 shadow-sm">
            醫療險下次繳費日是 10/15（年繳）。
            <span className="mt-1 block text-[9px] text-ink-500">實際權益以保單條款為準</span>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-brand-200 px-2 py-0.5 text-[9px] font-semibold text-brand-800">
              <MessageCircle className="h-3 w-3" />
              轉給我的服務人員
            </span>
          </div>
        </div>
      </div>
    </Canvas>
  );
}
