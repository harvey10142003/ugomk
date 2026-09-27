'use client';

import { Fragment, useState } from 'react';
import { AlertTriangle, Baby, Briefcase, Check, CheckCircle2, Clock, FastForward, Home, Radar, RotateCcw, ScanSearch, Share2, UserRound, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * 「更多功能」區的互動小示範。全部是純前端狀態：不送出任何資料、不呼叫任何 API。
 * 規則與內容皆為示範用的簡化版，人名一律遮罩。
 */

function DemoFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    // 上方留 pt-10 給「互動示範」標籤，避免窄螢幕時與第一行文字重疊
    <div className={cn('relative rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-mint-50 px-4 pb-4 pt-10 sm:px-5 sm:pb-5', className)}>
      <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-ink-500 ring-1 ring-ink-100">
        互動示範
      </span>
      {children}
    </div>
  );
}

/* ── 送件／照會進度 ─────────────────────────────────── */
const STEPS = ['送件', '照會中', '補件', '承保'];

export function SubmissionDemo() {
  const [step, setStep] = useState(1);
  const [late, setLate] = useState(false);
  const pending = step === 1 || step === 2;
  const overdue = pending && late;

  return (
    <DemoFrame>
      <div className="text-xs font-semibold text-brand-700">王○明．醫療險．○○人壽</div>
      <ol className="mt-4 grid grid-cols-4 gap-1" aria-label="送件進度">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-col items-center gap-1.5 text-center" aria-current={i === step ? 'step' : undefined}>
            <span
              className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                i < step && 'bg-brand-700 text-white',
                i === step && (overdue ? 'bg-red-600 text-white ring-4 ring-red-100' : 'bg-brand-800 text-white ring-4 ring-brand-100'),
                i > step && 'bg-white text-ink-400 ring-1 ring-ink-200'
              )}
            >
              {i < step ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
            </span>
            <span className={cn('text-[11px] font-semibold', i === step ? 'text-ink-900' : 'text-ink-500')}>{s}</span>
          </li>
        ))}
      </ol>

      <div
        aria-live="polite"
        className={cn(
          'mt-4 flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs leading-relaxed transition-colors duration-300',
          step === 3 ? 'bg-emerald-50 text-emerald-800' : overdue ? 'bg-red-50 text-red-800' : 'bg-white text-ink-700 ring-1 ring-ink-100'
        )}
      >
        {step === 3 ? (
          <>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            已承保，時間軸自動記下這一筆。
          </>
        ) : overdue ? (
          <>
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {STEPS[step]}回覆已逾期 1 天，已列入明天早報的優先處理。
          </>
        ) : step === 0 ? (
          <>
            <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            已送件，等待保險公司回覆。
          </>
        ) : (
          <>
            <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {STEPS[step]}回覆期限：後天。期限前 3 天會出現在早報。
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setStep((s) => Math.min(3, s + 1));
            setLate(false);
          }}
          disabled={step === 3}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          <Check className="h-3.5 w-3.5" aria-hidden />
          推進到下一步
        </button>
        <button
          type="button"
          onClick={() => setLate((v) => !v)}
          disabled={!pending}
          aria-pressed={late}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition hover:border-brand-300 disabled:opacity-50"
        >
          <FastForward className="h-3.5 w-3.5" aria-hidden />
          {late ? '回到今天' : '快轉 3 天'}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setLate(false);
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-ink-500 transition hover:text-brand-800"
          aria-label="重設送件示範"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-[11px] text-ink-500">只記狀態與期限，不記照會原因。</p>
    </DemoFrame>
  );
}

/* ── 合規副駕 ──────────────────────────────────────── */
/** 示範用的簡化規則；實際清單由主管維護 */
const RULES: { word: string; reason: string; fix: string }[] = [
  { word: '保證', reason: '承諾結果，容易被認為誇大不實', fix: '改寫為「依保單條款約定」' },
  { word: '穩賺', reason: '保險不應以收益承諾招攬', fix: '刪除收益相關描述' },
  { word: '比存款好', reason: '與其他金融商品比較，屬不當比較', fix: '刪除比較，改談客戶的需求' },
  { word: '最划算', reason: '絕對性用語，缺乏客觀依據', fix: '改寫為「是否適合，依你的需求一起評估」' }
];
const DEMO_TEXT = '這張保單保證穩賺，比存款好，現在買最划算！';
const SUGGESTED = '這張保單的保障內容依保單條款約定，是否適合你，我們可以依你的需求一起評估。';

export function ComplianceDemo() {
  const [text, setText] = useState(DEMO_TEXT);
  const [checked, setChecked] = useState(false);
  const hits = RULES.filter((r) => text.includes(r.word));

  const pattern = new RegExp(`(${RULES.map((r) => r.word).join('|')})`, 'g');
  const parts = text.split(pattern);

  return (
    <DemoFrame>
      <label htmlFor="icrm-compliance-input" className="block text-xs font-semibold text-brand-700">
        一對一訊息草稿（示範：以下是不當用語的範例）
      </label>
      <textarea
        id="icrm-compliance-input"
        value={text}
        onChange={(e) => {
          setText(e.target.value.slice(0, 120));
          setChecked(false);
        }}
        rows={2}
        className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm leading-relaxed text-ink-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
        >
          <ScanSearch className="h-3.5 w-3.5" aria-hidden />
          送出前檢查
        </button>
        <button
          type="button"
          onClick={() => {
            setText(DEMO_TEXT);
            setChecked(false);
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-ink-500 transition hover:text-brand-800"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          還原範例
        </button>
      </div>

      <div aria-live="polite">
        {checked ? (
          hits.length ? (
            <div className="icrm-panel-in mt-4 space-y-3">
              <p className="rounded-xl bg-white p-3 text-sm leading-relaxed text-ink-800 ring-1 ring-ink-100">
                {parts.map((p, i) =>
                  RULES.some((r) => r.word === p) ? (
                    <mark key={i} className="rounded bg-amber-200 px-0.5 text-ink-900">
                      {p}
                    </mark>
                  ) : (
                    <Fragment key={i}>{p}</Fragment>
                  )
                )}
              </p>
              <ul className="space-y-1.5">
                {hits.map((h) => (
                  <li key={h.word} className="flex items-start gap-2 text-xs leading-relaxed text-ink-700">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden />
                    <span>
                      <b className="text-ink-900">「{h.word}」</b>：{h.reason}；{h.fix}。
                    </span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-brand-800 p-3 text-xs leading-relaxed text-white">
                <div className="font-semibold text-brand-100">建議改寫</div>
                <p className="mt-1">{SUGGESTED}</p>
                <button
                  type="button"
                  onClick={() => {
                    setText(SUGGESTED);
                    setChecked(false);
                  }}
                  className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-900 transition hover:bg-brand-50"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  套用建議
                </button>
              </div>
              <p className="text-[11px] text-ink-500">只提醒、不阻擋，也不代替公司核可。</p>
            </div>
          ) : (
            <p className="icrm-panel-in mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              沒有發現示範規則裡的風險用語。實際仍以所屬公司的規定與核可為準。
            </p>
          )
        ) : null}
      </div>
    </DemoFrame>
  );
}

/* ── 生命事件雷達 ───────────────────────────────────── */
const EVENTS = [
  { id: 'job', label: '換工作', icon: Briefcase, tip: '確認原公司的團體保險是否隨離職結束，約時間一起看保障有沒有缺口。' },
  { id: 'baby', label: '新生兒', icon: Baby, tip: '家裡多了一位成員，家庭保障總表可以一起更新。' },
  { id: 'house', label: '買房', icon: Home, tip: '房貸期間的家庭保障，是值得聊一聊的話題。' }
] as const;
type EventState = 'new' | 'saved' | 'ignored';

export function LifeEventDemo() {
  const [scanned, setScanned] = useState(false);
  const [state, setState] = useState<Record<string, EventState>>({});

  return (
    <DemoFrame>
      <div className="text-xs font-semibold text-brand-700">客戶在 LINE 傳來的訊息</div>
      <div className="mt-2 max-w-[92%] rounded-2xl rounded-bl-md bg-white p-3 text-sm leading-relaxed text-ink-800 shadow-sm">
        這陣子<span className={cn(scanned && 'rounded bg-mint-200 px-0.5')}>換了新工作</span>，家裡上個月也
        <span className={cn(scanned && 'rounded bg-mint-200 px-0.5')}>多了一個寶寶</span>，也開始在
        <span className={cn(scanned && 'rounded bg-mint-200 px-0.5')}>看房子</span>。
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setScanned(true)}
          disabled={scanned}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          <Radar className="h-3.5 w-3.5" aria-hidden />
          {scanned ? '已找出 3 件人生大事' : '讓雷達讀一次'}
        </button>
        {scanned ? (
          <button
            type="button"
            onClick={() => {
              setScanned(false);
              setState({});
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold text-ink-500 transition hover:text-brand-800"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            重來
          </button>
        ) : null}
      </div>

      <ul className="mt-3 space-y-2" aria-live="polite">
        {scanned
          ? EVENTS.map((ev, i) => {
              const s = state[ev.id] ?? 'new';
              const Icon = ev.icon;
              return (
                <li
                  key={ev.id}
                  className={cn('icrm-bubble rounded-xl bg-white p-3 ring-1 transition-all', s === 'ignored' ? 'opacity-50 ring-ink-100' : 'ring-brand-100')}
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-sm font-bold text-ink-900">{ev.label}</span>
                    {s === 'saved' ? <span className="chip-brand ml-auto">已寫入客戶資料</span> : null}
                    {s === 'ignored' ? <span className="chip-ink ml-auto">已忽略（留有紀錄）</span> : null}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{ev.tip}</p>
                  {s === 'new' ? (
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setState((m) => ({ ...m, [ev.id]: 'saved' }))}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-800 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-brand-700"
                        aria-label={`確認「${ev.label}」並寫入客戶資料`}
                      >
                        <Check className="h-3 w-3" aria-hidden />
                        確認
                      </button>
                      <button
                        type="button"
                        onClick={() => setState((m) => ({ ...m, [ev.id]: 'ignored' }))}
                        className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] font-semibold text-ink-600 hover:border-brand-300"
                        aria-label={`忽略「${ev.label}」`}
                      >
                        <X className="h-3 w-3" aria-hidden />
                        忽略
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })
          : null}
      </ul>
      <p className="mt-3 text-[11px] text-ink-500">懷孕、住院、生病等健康相關內容一律不萃取，並會提醒你不要記錄。</p>
    </DemoFrame>
  );
}

/* ── 數位名片（翻面） ──────────────────────────────── */
export function CardFlipDemo() {
  const [back, setBack] = useState(false);
  return (
    <DemoFrame className="flex flex-col items-center justify-center lg:min-h-[500px]">
      <div className="icrm-flip mt-4 h-44 w-full max-w-[280px] lg:h-56">
        <div className={cn('icrm-flip-inner h-full w-full', back && 'is-flipped')}>
          {/* 正面 */}
          <div className="icrm-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-brand-900 to-[#0B7DB4] p-4 text-white shadow-card" aria-hidden={back}>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/40">
              <UserRound className="h-6 w-6" aria-hidden />
            </span>
            <div className="mt-2 text-base font-extrabold">林○業務</div>
            <div className="text-[11px] text-brand-100">○○保險經紀人．登錄字號 000000</div>
          </div>
          {/* 背面 */}
          <div className="icrm-face icrm-back absolute inset-0 rounded-2xl bg-white p-4 text-ink-800 shadow-card ring-1 ring-brand-100" aria-hidden={!back}>
            <div className="text-xs font-bold text-ink-900">服務項目</div>
            <div className="mt-1 text-[11px] text-ink-600">家庭保障規劃、保單整理、年度檢視</div>
            <div className="mt-2 text-xs font-bold text-ink-900">服務區域</div>
            <div className="mt-1 text-[11px] text-ink-600">高雄、台南</div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-2.5 py-1.5 text-[11px] font-semibold text-brand-800">
              <Share2 className="h-3.5 w-3.5" aria-hidden />
              由王○明分享，加好友後自動記下介紹人
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setBack((v) => !v)}
        aria-pressed={back}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden />
        {back ? '翻回正面' : '翻到背面'}
      </button>
      <p className="mt-2 text-center text-[11px] text-ink-500">名片自動標示所屬公司或機構，欄位固定。</p>
    </DemoFrame>
  );
}
