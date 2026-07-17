import { CreditCard, Plus, Minus, Wallet, Receipt } from 'lucide-react';

/**
 * POS 收銀 mock — 給 POS 區段當主視覺
 */
export function POSMock() {
  return (
    <div className="glass p-4 max-w-[440px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] tracking-widest-2 uppercase text-ink-400 font-semibold">
            POS · 美業
          </div>
          <div className="mt-0.5 text-sm font-bold text-ink-900">結帳 · 林小姐</div>
        </div>
        <span className="chip-brand">
          <Wallet className="h-3 w-3" />
          儲值金 1,800
        </span>
      </div>

      <div className="space-y-2 mb-3">
        {[
          { name: '光療美甲 · 設計款', staff: 'Amy', price: 1200 },
          { name: '指定設計師加價', staff: '+ Amy', price: 200 }
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-ink-100 bg-white px-3 py-2.5"
          >
            <div>
              <div className="text-xs font-semibold text-ink-900">{item.name}</div>
              <div className="text-[10px] text-ink-500 mt-0.5">{item.staff}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="減少數量"
                  className="h-5 w-5 rounded-full bg-mist-200 inline-flex items-center justify-center text-ink-600"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs font-semibold text-ink-800 w-3 text-center">1</span>
                <button
                  aria-label="增加數量"
                  className="h-5 w-5 rounded-full bg-mist-200 inline-flex items-center justify-center text-ink-600"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <span className="text-xs font-bold text-ink-900 w-14 text-right">
                ${item.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-mist-100 border border-ink-100 p-3 mb-3 space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-ink-500">
          <span>小計</span>
          <span>$1,400</span>
        </div>
        <div className="flex items-center justify-between text-ink-500">
          <span>會員 9 折</span>
          <span className="text-brand-700">- $140</span>
        </div>
        <div className="border-t border-ink-200 pt-1.5 flex items-center justify-between">
          <span className="font-bold text-ink-900">應收</span>
          <span className="font-extrabold text-base text-ink-900">$1,260</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: '現金', icon: '💵' },
          { label: '信用卡', icon: '💳', active: true },
          { label: '儲值金', icon: '🪙' }
        ].map((m) => (
          <button
            key={m.label}
            className={
              m.active
                ? 'rounded-lg border-2 border-brand-500 bg-brand-50 px-2 py-2 text-xs font-semibold text-ink-900'
                : 'rounded-lg border border-ink-100 bg-white px-2 py-2 text-xs font-medium text-ink-600'
            }
          >
            <div className="text-base mb-0.5">{m.icon}</div>
            {m.label}
          </button>
        ))}
      </div>

      <button className="w-full rounded-full bg-ink-900 text-white py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors">
        <Receipt className="h-4 w-4" />
        確認結帳 · $1,260
      </button>
    </div>
  );
}
