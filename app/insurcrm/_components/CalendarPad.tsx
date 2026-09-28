import { MessageCircle } from 'lucide-react';
import { calendarSheet as c } from '../_data/content';

/**
 * 首屏的撕日曆：今天這張（中秋節，數字印朱紅，跟傳統日曆的假日一樣）＋前一天那張在載入後撕掉。
 * 純 CSS 動畫（insurcrm.css 的 .icrm-sheet-prev），減少動態時前一天那張直接不顯示；不需要 JS。
 * 整塊是示意圖，報讀器讀一句摘要就好。
 */
export function CalendarPad() {
  return (
    <figure
      className="icrm-pad"
      role="img"
      aria-label={`日曆示意：${c.year} 年${c.month} ${c.day} 日${c.weekday}，${c.lunar}${c.festival}。宜：${c.yi.join('、')}。忌：${c.ji.join('、')}。${c.footer}。`}
    >
      <div className="icrm-pad-binding" aria-hidden />
      <div className="icrm-pad-stack" aria-hidden />

      <div className="icrm-sheet" aria-hidden>
        <div className="icrm-sheet-top">
          <span className="icrm-num">
            {c.year}
            <span className="ml-2 font-bold">{c.month}</span>
          </span>
          <span>{c.weekday}</span>
        </div>
        <div className="icrm-sheet-body">
          <div className="icrm-sheet-day">{c.day}</div>
          <div className="icrm-sheet-lunar">
            {c.lunar}
            <b>{c.festival}</b>
          </div>
        </div>
        <ul className="icrm-sheet-yiji">
          <li>
            <span className="icrm-seal">宜</span>
            <span>{c.yi.join('．')}</span>
          </li>
          <li>
            <span className="icrm-seal" data-kind="ji">
              忌
            </span>
            <span>{c.ji.join('．')}</span>
          </li>
        </ul>
        <div className="icrm-sheet-perf" />
        <div className="icrm-sheet-foot">
          <span className="icrm-line-dot">
            <MessageCircle className="h-4 w-4" />
          </span>
          {c.footer}
        </div>
      </div>

      {/* 前一天：載入後撕掉 */}
      <div className="icrm-sheet-prev" aria-hidden>
        <div className="icrm-sheet-top">
          <span className="icrm-num">
            {c.year}
            <span className="ml-2 font-bold">{c.month}</span>
          </span>
          <span>{c.prevWeekday}</span>
        </div>
        <div className="icrm-sheet-body">
          <div className="icrm-sheet-day">{c.prevDay}</div>
        </div>
      </div>
    </figure>
  );
}
