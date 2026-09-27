'use client';

import { useRef, useState } from 'react';
import { CalendarDays, CheckCircle2, HeartHandshake, ScanText, Smartphone, UsersRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PHASE_LABEL, featureTabs, type TabIcon } from '../_data/content';
import { CalendarMock, CareMock, ClientMock, FamilyMock, PolicyMock } from './MockScreens';

const ICONS: Record<TabIcon, typeof UsersRound> = {
  users: UsersRound,
  scan: ScanText,
  calendar: CalendarDays,
  heart: HeartHandshake,
  phone: Smartphone
};

const MOCKS = {
  family: FamilyMock,
  policy: PolicyMock,
  calendar: CalendarMock,
  care: CareMock,
  client: ClientMock
};

/**
 * 核心功能分頁（WAI-ARIA tabs pattern）：
 * 左右鍵／Home／End 切換並移動焦點，Tab 鍵進入面板。
 * 所有面板都輸出在 HTML 裡（非作用中的用 hidden），搜尋引擎與無 JS 環境都讀得到全部功能。
 */
export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + featureTabs.length) % featureTabs.length;
    setActive(n);
    tabRefs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusTab(i + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusTab(i - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTab(featureTabs.length - 1);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="核心功能"
        className="icrm-scroll-x -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0"
      >
        {featureTabs.map((t, i) => {
          const Icon = ICONS[t.icon];
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`icrm-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`icrm-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
                selected
                  ? 'border-brand-800 bg-brand-800 text-white shadow-brand'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-800'
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 桌機固定最小高度：切換分頁時頁面不會上下跳 */}
      <div className="mt-10 lg:min-h-[500px]">
        {featureTabs.map((t, i) => {
          const Mock = MOCKS[t.mock];
          const selected = i === active;
          return (
            <div
              key={t.id}
              role="tabpanel"
              id={`icrm-panel-${t.id}`}
              aria-labelledby={`icrm-tab-${t.id}`}
              hidden={!selected}
              tabIndex={0}
              className="focus:outline-none"
            >
              {selected ? (
                <div className="icrm-panel-in grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                  <div>
                    <span className="chip-brand">{PHASE_LABEL[t.phase]}．即將推出</span>
                    <h3 className="heading-3 mt-4 text-balance">{t.title}</h3>
                    <p className="body-base mt-4">{t.lead}</p>
                    <ul className="mt-6 space-y-3">
                      {t.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative isolate">
                    <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-100 via-white to-[#FBEFD9] opacity-80" aria-hidden />
                    <Mock />
                    <p className="mt-3 text-center text-xs text-ink-400">示意畫面，人名與數字皆為虛構</p>
                  </div>
                </div>
              ) : (
                // 非作用中面板仍輸出文字內容給搜尋引擎（hidden 屬性會讓它不顯示、也不進無障礙樹）
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.lead}</p>
                  <ul>
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
