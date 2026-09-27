import {
  CalendarCheck,
  ClipboardCheck,
  Contact,
  FileCheck,
  Gauge,
  MessagesSquare,
  Radar,
  ScanText,
  ShieldCheck,
  TrafficCone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { roadmap, type MoreFeatureId, type RoadmapIcon } from '../_data/content';
import { AskArt, LapseArt, ReviewArt, ScanArt, SummaryArt, WeeklyArt } from './FeatureArt';
import { CardFlipDemo, ComplianceDemo, LifeEventDemo, SubmissionDemo } from './FeatureDemos';

const ICONS: Record<RoadmapIcon, typeof Radar> = {
  'file-check': FileCheck,
  traffic: TrafficCone,
  shield: ShieldCheck,
  'calendar-check': CalendarCheck,
  radar: Radar,
  card: Contact,
  share: Contact,
  gauge: Gauge,
  chat: MessagesSquare,
  scan: ScanText,
  clipboard: ClipboardCheck
};

/**
 * 每張卡的版面：bento 格狀混排，大小與圖文方向交錯，避免十張一樣的卡。
 *  - layout 'split'：左文右圖（大卡）
 *  - layout 'stack'：上圖下文
 *  - layout 'textTop'：上文下互動（互動示範較高時用）
 * 互動示範（'use client'）只有 4 個；其餘示意圖是伺服器輸出的靜態圖，不增加前端 JS。
 */
const TILES: Record<MoreFeatureId, { span: string; layout: 'split' | 'stack' | 'textTop'; Visual: () => JSX.Element }> = {
  compliance: { span: 'md:col-span-2 lg:col-span-4', layout: 'split', Visual: ComplianceDemo },
  lapse: { span: 'lg:col-span-2', layout: 'stack', Visual: LapseArt },
  submission: { span: 'lg:col-span-3', layout: 'textTop', Visual: SubmissionDemo },
  lifeevent: { span: 'lg:col-span-3', layout: 'textTop', Visual: LifeEventDemo },
  review: { span: 'lg:col-span-2', layout: 'stack', Visual: ReviewArt },
  scan: { span: 'lg:col-span-2', layout: 'stack', Visual: ScanArt },
  // 名片卡跨兩列：翻面示範較高，與左側兩列靜態圖對齊
  card: { span: 'lg:col-span-2 lg:row-span-2', layout: 'stack', Visual: CardFlipDemo },
  weekly: { span: 'lg:col-span-2', layout: 'stack', Visual: WeeklyArt },
  summary: { span: 'lg:col-span-2', layout: 'stack', Visual: SummaryArt },
  // 最後一張改成滿版左右圖文，收尾換個節奏
  ask: { span: 'md:col-span-2 lg:col-span-6', layout: 'split', Visual: AskArt }
};

/** 顯示順序：先放大卡與互動，靜態圖穿插在中間 */
const ORDER: MoreFeatureId[] = ['compliance', 'lapse', 'submission', 'lifeevent', 'review', 'scan', 'card', 'weekly', 'summary', 'ask'];

export function MoreFeatures() {
  const byId = Object.fromEntries(roadmap.map((r) => [r.id, r]));
  return (
    <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {ORDER.map((id, k) => {
        const f = byId[id];
        if (!f) return null;
        const t = TILES[id];
        const Icon = ICONS[f.icon];
        const Visual = t.Visual;
        const text = (
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-800 group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-ink-900">{f.title}</h3>
              {f.team ? <span className="chip-ink ml-auto">團隊版</span> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.body}</p>
          </div>
        );
        return (
          <li
            key={id}
            className={cn(
              'group rounded-3xl border border-ink-100 bg-white p-5 transition-all duration-300 hover:border-brand-200 hover:shadow-card sm:p-6',
              t.span,
              t.layout === 'split' && 'grid items-start gap-6 md:grid-cols-[0.85fr_1.15fr]'
            )}
            data-reveal
            style={{ '--d': `${(k % 3) * 90}ms` } as React.CSSProperties}
          >
            {t.layout === 'stack' ? (
              <>
                <Visual />
                <div className="mt-5">{text}</div>
              </>
            ) : (
              <>
                {text}
                <div className={t.layout === 'textTop' ? 'mt-5' : ''}>
                  <Visual />
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
