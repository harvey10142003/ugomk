import { CheckCircle2, Bot, MousePointer2 } from 'lucide-react';

/**
 * LINE 自動化對話 mock — 行銷自動化 section 主視覺
 */
export function ChatFlowMock() {
  const messages: Array<{ from: 'user' | 'bot'; text: string; time: string }> = [
    { from: 'bot', text: '🎉 林小姐 歡迎回來菲韻美甲！\n你的會員等級已升等為「鑽石」', time: '14:02' },
    { from: 'user', text: '太棒了！我的點數還剩多少？', time: '14:03' },
    {
      from: 'bot',
      text: '目前點數：📍 1,240 點\n可兌換：免費修甲券（300 點）',
      time: '14:03'
    }
  ];

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] rounded-[36px] bg-ink-900 p-2 shadow-card">
        <div className="rounded-[28px] bg-mist-100 overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-ink-700">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              ●●●●
            </span>
          </div>

          {/* LINE header */}
          <div className="bg-white border-b border-ink-100 px-4 py-2.5 flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-white font-extrabold text-sm">
              U
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-ink-900 truncate">菲韻美甲</div>
              <div className="text-[9px] text-brand-700 inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                線上
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-3 py-4 space-y-2.5 min-h-[280px] bg-[#7B95A8]/10">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.from === 'bot' ? 'flex items-end gap-1.5' : 'flex items-end gap-1.5 justify-end'}
              >
                {m.from === 'bot' ? (
                  <span className="h-6 w-6 rounded-full bg-gradient-brand inline-flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    U
                  </span>
                ) : null}
                <div
                  className={
                    m.from === 'bot'
                      ? 'max-w-[200px] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[11px] leading-relaxed text-ink-800 whitespace-pre-line shadow-soft'
                      : 'max-w-[200px] rounded-2xl rounded-br-sm bg-brand-700 px-3 py-2 text-[11px] leading-relaxed text-white whitespace-pre-line'
                  }
                >
                  {m.text}
                </div>
                <span className="text-[8px] text-ink-400 mb-1 shrink-0">{m.time}</span>
              </div>
            ))}
            {/* Typing indicator */}
            <div className="flex items-end gap-1.5">
              <span className="h-6 w-6 rounded-full bg-gradient-brand inline-flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                U
              </span>
              <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-soft">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-pulse-soft" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-pulse-soft [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-pulse-soft [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          </div>

          {/* Rich menu hint */}
          <div className="border-t border-ink-100 bg-white grid grid-cols-3 text-[9px] font-semibold text-ink-700">
            <div className="p-2 text-center border-r border-ink-100">會員專區</div>
            <div className="p-2 text-center border-r border-ink-100 text-brand-700">兌換點數</div>
            <div className="p-2 text-center">線上預約</div>
          </div>
        </div>
      </div>

      {/* Floating annotation */}
      <div className="absolute -right-2 top-16 hidden md:block">
        <div className="glass px-3 py-2 max-w-[180px]">
          <div className="flex items-start gap-2">
            <Bot className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-ink-900">行銷自動化觸發</div>
              <div className="text-[9px] text-ink-500 mt-0.5">升等 → 自動推播 + 點數查詢</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-2 bottom-20 hidden md:block">
        <div className="glass px-3 py-2 max-w-[170px]">
          <div className="flex items-start gap-2">
            <MousePointer2 className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-ink-900">圖文選單動態切換</div>
              <div className="text-[9px] text-ink-500 mt-0.5">依會員等級顯示不同入口</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
