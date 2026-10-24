'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Maximize } from 'lucide-react';

/**
 * 網頁簡報播放器。
 *
 * ## 安全（簡報是外部產出的 HTML）
 * - iframe 載的是 R2 公開網址（跟 ugomk.com 不同來源），而且 `sandbox="allow-scripts"`：
 *   **不給 allow-same-origin** ⇒ 簡報在獨立的 opaque origin 裡跑，碰不到這頁、ugomk.com 的 cookie／storage、也碰不到 parent；
 *   沒有 allow-top-navigation ⇒ 不能把整頁導走；沒有 allow-popups／allow-forms ⇒ 不能開視窗、送表單。
 *   （sandbox 沒有 allow-fullscreen 這個關鍵字；全螢幕用 `allow="fullscreen"`＋外層按鈕。）
 * - `referrerPolicy="no-referrer"`：載簡報時不把含通行證的網址送給 R2。
 * 參考 [[reference_web_redirect_and_micro_page_sandbox]]：allow-scripts 與 allow-same-origin 不可同時給。
 */
export function DeckPlayer({ src, title, backHref }: { src: string; title: string; backHref: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [fsError, setFsError] = useState(false);

  async function fullscreen() {
    setFsError(false);
    const el = wrap.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    try {
      if (el?.requestFullscreen) await el.requestFullscreen();
      else if (el?.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else setFsError(true);
    } catch {
      setFsError(true);
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-ink-900">
      <div className="flex items-center justify-between gap-2 px-3 py-2 text-white sm:px-4">
        <Link href={backHref} className="inline-flex min-h-[40px] items-center gap-1 text-sm font-medium text-white/85 hover:text-white">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          返回
        </Link>
        <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold">{title}</p>
        <button
          type="button"
          onClick={fullscreen}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/25 px-3 text-sm font-medium text-white hover:bg-white/10"
        >
          <Maximize className="h-4 w-4" aria-hidden="true" />
          全螢幕
        </button>
      </div>
      {fsError && <p className="px-4 pb-2 text-center text-xs text-white/70">這台裝置不支援全螢幕，可以把手機轉橫向觀看。</p>}
      <div ref={wrap} className="relative min-h-0 flex-1 bg-black">
        <iframe
          src={src}
          title={title}
          sandbox="allow-scripts"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
      </div>
    </div>
  );
}
