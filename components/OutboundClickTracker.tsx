'use client';

import { useEffect } from 'react';
import { pushEvent, type GtmEvent } from '@/lib/gtm';

/**
 * 全站外連點擊追蹤 —— 一個掛在 document 上的事件委派。
 *
 * ## 為什麼是委派而不是逐頁包元件
 *
 * 站上有 18 個 CTA、7 處 LINE 連結，散在首頁、部落格、智慧名片頁與 footer。
 * 逐頁改的問題不在於這一次改幾個檔案，而在於**下一次新增頁面時沒有人會記得**：
 * 漏掉的那顆鈕不會報錯、不會少一個畫面，只會在報表上安靜地不存在。
 *
 * 委派則是「只要是連到 LINE / tel: / mailto: 的連結就會被算到」，
 * 新頁面自動涵蓋，這是結構保證而不是紀律要求。
 *
 * ## 幾個實作上的取捨
 *
 * - **capture 階段**：有些元件會在自己的 handler 裡 `stopPropagation()`，
 *   冒泡階段就收不到了。capture 從 document 往下走，一定先經過我們。
 * - **監聽 click 而不是 pointerdown**：鍵盤按 Enter 觸發連結也會發 click，
 *   pointerdown 收不到，等於漏掉所有用鍵盤操作的人。
 * - **不 preventDefault、不做任何非同步等待**：追蹤絕不可以延後或攔截使用者要去的地方。
 *   離站前送出的事件可能會掉幾筆，這是刻意接受的取捨 —— 拿準確度換使用者體驗不划算。
 */

/** 這個連結算哪一種事件；不是要追蹤的就回 null */
function classifyLink(anchor: HTMLAnchorElement): GtmEvent | null {
  // 用 anchor.href（瀏覽器解析過的絕對網址），不要用 getAttribute('href')：
  // 後者可能是相對路徑或空字串，解析 protocol 會不準。
  const raw = anchor.href || '';
  if (!raw) return null;

  if (raw.startsWith('tel:')) return 'click_tel';
  if (raw.startsWith('mailto:')) return 'click_mailto';

  try {
    const url = new URL(raw);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    // line.me（官方帳號加好友連結）與 lin.ee（LINE 自己的短網址）都要算
    if (host === 'line.me' || host.endsWith('.line.me') || host === 'lin.ee') {
      return 'click_line';
    }
  } catch {
    /* 解析不了的 href 就不追蹤 */
  }
  return null;
}

export function OutboundClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // 只算「會真的前往」的點擊：右鍵選單與已被其他人取消的事件不算
      if (e.defaultPrevented) return;
      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const event = classifyLink(anchor);
      if (!event) return;

      pushEvent(event, {
        link_url: anchor.href,
        // 連結文字讓 GTM 那邊分得出是哪一顆鈕（例如「直接加入 LINE 諮詢」vs footer 的）
        link_text: (anchor.textContent || '').trim().slice(0, 100),
        // 哪一頁帶來的點擊 —— 與名單的 landing_page 用同一種寫法才對得起來
        page_path: window.location.pathname
      });
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
