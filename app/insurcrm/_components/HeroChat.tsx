'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarClock, Gift, NotebookPen, Sunrise, UserRound } from 'lucide-react';
import { ChatTopBar, PhoneFrame } from './PhoneFrame';
import { PRODUCT_SHORT } from '../_data/content';

type Msg =
  | { kind: 'brief' }
  | { kind: 'me'; text: string }
  | { kind: 'task' }
  | { kind: 'note' };

/** 對話腳本：業務在 LINE 對 AI 助理說話、收到早報與確認卡。每步等待毫秒數寫在 wait。 */
const SCRIPT: { msg: Msg; wait: number; typing?: boolean }[] = [
  { msg: { kind: 'brief' }, wait: 900, typing: true },
  { msg: { kind: 'me', text: '下週二下午三點約王小明' }, wait: 2600 },
  { msg: { kind: 'task' }, wait: 1300, typing: true },
  { msg: { kind: 'me', text: '記：王小明想了解房貸保障' }, wait: 2600 },
  { msg: { kind: 'note' }, wait: 1200, typing: true }
];
const LOOP_PAUSE = 5200;

export function HeroChat() {
  // 伺服器端先畫「早報已送達」這一格：沒有 JS 也有完整的一則畫面，播放時也不會先閃成空白
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(SCRIPT.length); // 減少動態：直接顯示完整對話，不播放
      return;
    }

    let timers: number[] = [];
    let running = false;
    const clear = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };

    // 第一次播放從「早報已送達」接著演，不把伺服器端已經畫好的那一格清掉重來
    let first = true;
    const play = () => {
      clear();
      running = true;
      const from = first ? 1 : 0;
      first = false;
      setShown(from);
      setTyping(false);
      let at = 400;
      SCRIPT.forEach((step, i) => {
        if (i < from) return;
        if (step.typing) {
          timers.push(window.setTimeout(() => setTyping(true), at));
          at += step.wait;
          timers.push(
            window.setTimeout(() => {
              setTyping(false);
              setShown(i + 1);
            }, at)
          );
        } else {
          at += step.wait;
          timers.push(window.setTimeout(() => setShown(i + 1), at));
        }
      });
      timers.push(window.setTimeout(play, at + LOOP_PAUSE));
    };

    // 只在畫面上看得到時播放，捲走就停在完整狀態，節省電力
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      play();
      return clear;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) play();
        if (!entry.isIntersecting && running) {
          running = false;
          clear();
          setTyping(false);
          setShown(SCRIPT.length);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <PhoneFrame
        label="示意畫面：業務在 LINE 收到 AI 助理的早報，接著說「下週二下午三點約王小明」，助理回覆已建立待辦的確認卡，再把房貸保障的需求記成筆記。"
        screenClassName="h-[540px] sm:h-[560px] flex flex-col bg-[#DCE8EC]"
      >
        <ChatTopBar title={`${PRODUCT_SHORT} 助理`} subtitle="只有你看得到的業務助理" />
        <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-3">
          {SCRIPT.slice(0, shown).map((s, i) => (
            <Bubble key={i} msg={s.msg} />
          ))}
          {typing ? (
            <div className="icrm-bubble flex items-end gap-1.5">
              <Avatar />
              <div className="icrm-typing rounded-2xl rounded-bl-md bg-white px-3 py-2.5 text-brand-700 shadow-sm">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}
        </div>
        {/* 輸入列（裝飾） */}
        <div className="flex items-center gap-2 border-t border-ink-100 bg-white px-3 py-2.5">
          <div className="h-8 flex-1 rounded-full bg-mist-300 px-3 text-[11px] leading-8 text-ink-400">輸入訊息</div>
          <span className="h-8 w-8 rounded-full bg-line-500" />
        </div>
      </PhoneFrame>
    </div>
  );
}

function Avatar() {
  return (
    <span className="mb-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1AC6C8] to-[#0B7DB4] text-[8px] font-bold text-white">
      AI
    </span>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.kind === 'me') {
    return (
      <div className="icrm-bubble flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#A8E6A0] px-3 py-2 text-[12px] leading-snug text-ink-900 shadow-sm">
          {msg.text}
        </div>
      </div>
    );
  }
  if (msg.kind === 'brief') {
    return (
      <div className="icrm-bubble flex items-end gap-1.5">
        <Avatar />
        <div className="w-[86%] overflow-hidden rounded-2xl rounded-bl-md bg-white shadow-sm">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-brand-800 to-brand-600 px-3 py-2 text-[11px] font-bold text-white">
            <Sunrise className="h-3.5 w-3.5" aria-hidden />
            早報｜今天有 3 件事
          </div>
          <ul className="space-y-1.5 px-3 py-2.5 text-[11px] text-ink-700">
            <li className="flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5 text-brand-600" aria-hidden />
              10:30 約訪 王○明
            </li>
            <li className="flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5 text-[#E9A23B]" aria-hidden />3 則祝福待確認
            </li>
            <li className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 text-brand-600" aria-hidden />
              陳小姐 保單週年剩 5 天
            </li>
          </ul>
          <div className="border-t border-ink-100 py-1.5 text-center text-[11px] font-bold text-brand-700">開啟今日清單</div>
        </div>
      </div>
    );
  }
  if (msg.kind === 'task') {
    return (
      <div className="icrm-bubble flex items-end gap-1.5">
        <Avatar />
        <div className="w-[80%] rounded-2xl rounded-bl-md bg-white p-3 shadow-sm">
          <div className="text-[10px] font-semibold text-brand-600">AI 草稿｜請確認</div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] font-bold text-ink-900">
            <CalendarClock className="h-4 w-4 text-brand-700" aria-hidden />
            下週二 15:00 約訪王小明
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] font-bold">
            <span className="rounded-lg bg-brand-800 py-1.5 text-center text-white">確認建立</span>
            <span className="rounded-lg border border-ink-200 py-1.5 text-center text-ink-700">修改</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="icrm-bubble flex items-end gap-1.5">
      <Avatar />
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12px] leading-snug text-ink-800 shadow-sm">
        <span className="inline-flex items-center gap-1 font-bold text-brand-700">
          <NotebookPen className="h-3.5 w-3.5" aria-hidden />
          已存成筆記
        </span>
        <br />
        放進王小明的客戶歷程，時間軸上看得到。
      </div>
    </div>
  );
}
