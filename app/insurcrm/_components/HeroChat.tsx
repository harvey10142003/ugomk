'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CalendarClock, Gift, NotebookPen, Sunrise, UserRound } from 'lucide-react';
import { LOGO_MARK, PRODUCT_SHORT } from '../_data/content';

/*
 * 首屏右欄：業務在 LINE 跟助理的對話（2026-09-28 Shark：首屏換回改版前的這個畫面）。
 * 內容與互動沿用 7a35422 的 HeroChat，配色、字體、圓角改用新版 token（insurcrm.css 的 --icrm-*），
 * 手機外框與下方 LINE 示意畫面（Mocks.tsx）同一套：墨色外框、#E8EEF2 對話底、#C4EFA4 自己的氣泡。
 */

type Msg = { kind: 'brief' } | { kind: 'me'; text: string } | { kind: 'task' } | { kind: 'note' };

/** 對話腳本：業務在 LINE 對助理說話、收到早報與確認卡。每步等待毫秒數寫在 wait。 */
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
      <div
        className="icrm-hero-phone"
        role="img"
        aria-label="示意畫面：業務在 LINE 收到早報，接著說「下週二下午三點約王小明」，助理回覆待確認的待辦草稿，再把房貸保障的需求記成筆記。"
      >
        <div className="icrm-hero-screen" aria-hidden>
          <div className="icrm-hero-notch" />
          <div className="icrm-chat-bar" style={{ paddingTop: 36 }}>
            <Image src={LOGO_MARK.src} width={28} height={28} alt="" sizes="28px" />
            <div className="min-w-0 leading-tight">
              <div className="truncate">{PRODUCT_SHORT} 助理</div>
              <div className="truncate text-[11px] font-medium text-[color:var(--icrm-ink-3)]">只有你看得到的業務助理</div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-3">
            {SCRIPT.slice(0, shown).map((s, i) => (
              <Bubble key={i} msg={s.msg} />
            ))}
            {typing ? (
              <div className="icrm-bubble flex items-end gap-1.5">
                <Avatar />
                <div className="icrm-typing rounded-2xl rounded-bl-md bg-white px-3 py-2.5 text-[color:var(--icrm-teal)]">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>
          {/* 輸入列（裝飾） */}
          <div className="flex items-center gap-2 border-t border-[color:var(--icrm-rule-2)] bg-white px-3 py-2.5">
            <div className="h-8 flex-1 rounded-full bg-[color:var(--icrm-paper)] px-3 text-[11px] leading-8 text-[color:var(--icrm-ink-3)]">輸入訊息</div>
            <span className="h-8 w-8 rounded-full bg-[color:var(--icrm-line)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="mb-0.5 inline-flex h-6 w-6 shrink-0 overflow-hidden rounded-full bg-white">
      <Image src={LOGO_MARK.src} width={24} height={24} alt="" sizes="24px" />
    </span>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.kind === 'me') {
    return (
      <div className="icrm-bubble flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#c4efa4] px-3 py-2 text-[12px] leading-snug text-[#13240c]">{msg.text}</div>
      </div>
    );
  }
  if (msg.kind === 'brief') {
    return (
      <div className="icrm-bubble flex items-end gap-1.5">
        <Avatar />
        <div className="w-[86%] overflow-hidden rounded-2xl rounded-bl-md bg-white">
          <div className="flex items-center gap-1.5 bg-[color:var(--icrm-teal)] px-3 py-2 text-[11px] font-bold text-white">
            <Sunrise className="h-3.5 w-3.5" aria-hidden />
            早報｜今天有 3 件事
          </div>
          <ul className="space-y-1.5 px-3 py-2.5 text-[11px] text-[color:var(--icrm-ink-2)]">
            <li className="flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5 text-[color:var(--icrm-teal)]" aria-hidden />
              10:30 約訪 王○明
            </li>
            <li className="flex items-center gap-1.5">
              <Gift className="h-3.5 w-3.5 text-[color:var(--icrm-red)]" aria-hidden />3 則祝福待確認
            </li>
            <li className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5 text-[color:var(--icrm-teal)]" aria-hidden />
              陳小姐 保單週年剩 5 天
            </li>
          </ul>
          <div className="border-t border-[color:var(--icrm-rule-2)] py-1.5 text-center text-[11px] font-bold text-[color:var(--icrm-teal-2)]">
            開啟今日清單
          </div>
        </div>
      </div>
    );
  }
  if (msg.kind === 'task') {
    return (
      <div className="icrm-bubble flex items-end gap-1.5">
        <Avatar />
        <div className="w-[80%] rounded-2xl rounded-bl-md bg-white p-3">
          <span className="icrm-draft-tag">AI 草稿．請確認</span>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] font-bold text-[color:var(--icrm-ink)]">
            <CalendarClock className="h-4 w-4 text-[color:var(--icrm-teal)]" aria-hidden />
            下週二 15:00 約訪王小明
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] font-bold">
            <span className="rounded-lg bg-[color:var(--icrm-teal)] py-1.5 text-center text-white">確認建立</span>
            <span className="rounded-lg bg-[color:var(--icrm-tint)] py-1.5 text-center text-[color:var(--icrm-teal-2)]">修改</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="icrm-bubble flex items-end gap-1.5">
      <Avatar />
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12px] leading-snug text-[color:var(--icrm-ink-2)]">
        <span className="inline-flex items-center gap-1 font-bold text-[color:var(--icrm-teal-2)]">
          <NotebookPen className="h-3.5 w-3.5" aria-hidden />
          已存成筆記
        </span>
        <br />
        放進王小明的客戶歷程，時間軸上看得到。
      </div>
    </div>
  );
}
