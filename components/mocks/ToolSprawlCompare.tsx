import { Unlink, Link2 } from 'lucide-react';

/**
 * 「現在」對照「改成一套之後」。
 *
 * 這頁最需要被看懂的一件事是「資料散在各處」有什麼壞處。
 * 講「單一會員真實來源」老闆不會有感，畫成左邊五份互不相通的名單、
 * 右邊一份共用的名單，不用讀完文字就懂了。
 */

const SCATTERED = [
  { name: 'POS 系統', note: '一份客人名單' },
  { name: '預約網站', note: '另一份名單' },
  { name: '紙本集點卡', note: '沒進系統' },
  { name: 'Excel 名冊', note: '手動維護' },
  { name: 'LINE 群發', note: '只能全體發' }
];

const UNIFIED = ['餐飲 POS', '線上預約', '點數票券', '自動推播'];

export function ToolSprawlCompare() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 現在 */}
      <div className="card p-7 md:p-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-100 text-ink-500">
            <Unlink className="h-4 w-4" />
          </span>
          <div>
            <div className="text-base font-bold text-ink-900">現在多數店家的樣子</div>
            <div className="text-xs text-ink-400">工具各買各的，客人資料對不起來</div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SCATTERED.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-dashed border-ink-200 bg-mist-200 p-3 text-center"
            >
              <div className="text-[0.8rem] font-bold text-ink-600">{t.name}</div>
              <div className="mt-1 text-[0.68rem] text-ink-400">{t.note}</div>
            </div>
          ))}
          <div className="grid place-items-center rounded-xl border border-dashed border-ink-200 p-3 text-center">
            <span className="text-[0.68rem] text-ink-400">還有下一套…</span>
          </div>
        </div>

        <p className="mt-6 border-t border-ink-100 pt-5 text-sm leading-relaxed text-ink-500">
          同一位林小姐，在 POS 是「林小姐」、在預約系統是電話號碼、在 Excel 又是另一列。
          想知道她多久沒來、總共消費多少，只能人工比對。
        </p>
      </div>

      {/* 改成一套 */}
      <div className="card border-brand-200 bg-gradient-to-br from-brand-50 to-white p-7 shadow-brand md:p-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-800 text-white">
            <Link2 className="h-4 w-4" />
          </span>
          <div>
            <div className="text-base font-bold text-ink-900">改成一套系統之後</div>
            <div className="text-xs text-brand-700">模組不同，客人資料只有一份</div>
          </div>
        </div>

        <div className="mt-7">
          <div className="rounded-xl border border-brand-200 bg-white p-4 text-center shadow-soft">
            <div className="text-[0.68rem] font-semibold uppercase tracking-widest-2 text-brand-600">
              同一份會員資料
            </div>
            <div className="mt-1 text-sm font-bold text-ink-900">林小姐 · 鑽石會員 · 1,240 點</div>
          </div>

          <div className="mx-auto h-5 w-px bg-brand-300" aria-hidden />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {UNIFIED.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-brand-200 bg-white px-2 py-3 text-center text-[0.78rem] font-bold text-brand-800"
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 border-t border-brand-100 pt-5 text-sm leading-relaxed text-ink-500">
          她在店裡結帳、在 LINE 預約、用點數換券，全部記在同一筆資料上。
          店員查得到，老闆也看得到。
        </p>
      </div>
    </div>
  );
}
