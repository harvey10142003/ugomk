import { crmModules } from '@/lib/data/modules';

/*
 * 功能索引區的模組跑馬燈（兩列、反方向、跟著捲動移動、左右邊緣淡出）。純 CSS，不需要 JS。
 *
 * 名稱直接讀 lib/data/modules.ts（與系統模組清單同源）。排除的：
 *   - 後台基礎設定類（參數設定、系統管理、資料匯出、媒體櫃）：對外列出只會稀釋重點
 *   - 學院三個（category 'ext'）：是宇果自己的內容產品，不是給店家的模組
 *
 * 無障礙：整條是裝飾（真正的功能清單在下方的索引連結），所以 aria-hidden；
 * 每列內容重複兩次，捲動位移時右側不會露白；不支援捲動時間軸或減少動態時，重複的那份隱藏、改成靜態換行排列（見 app/home.css）。
 */
const HIDE = new Set(['settings', 'system_management', 'export', 'media_library']);
const names = crmModules.filter((m) => m.category !== 'ext' && !HIDE.has(m.id)).map((m) => m.title);
const half = Math.ceil(names.length / 2);
const ROWS = [names.slice(0, half), names.slice(half)];

export function ModuleMarquee() {
  return (
    <div className="ug-marquee" aria-hidden>
      {ROWS.map((row, r) => (
        <div key={r} className="ug-marquee-row" data-dir={r % 2 ? 'rev' : undefined}>
          <div className="ug-marquee-track">
            {[...row, ...row].map((t, i) => (
              <span key={i} className="ug-marquee-item" data-dup={i >= row.length ? '' : undefined}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
