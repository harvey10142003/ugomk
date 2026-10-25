'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconChevronLeft, IconMaximize, IconMessage } from '@/components/kit/icons';

/**
 * 網頁簡報播放器（2026-10-24；2026-10-25 UI v2 改外觀：品牌頂列、載入畫面、客戶頁加「LINE 洽詢」）。
 *
 * ## 安全（簡報是外部產出的 HTML）—— 改外觀時這段不可動
 * - iframe 載的是 R2 公開網址（跟 ugomk.com 不同來源），而且 `sandbox="allow-scripts"`：
 *   **不給 allow-same-origin** ⇒ 簡報在獨立的 opaque origin 裡跑，碰不到這頁、ugomk.com 的 cookie／storage、也碰不到 parent；
 *   沒有 allow-top-navigation ⇒ 不能把整頁導走；沒有 allow-popups／allow-forms ⇒ 不能開視窗、送表單。
 *   （sandbox 沒有 allow-fullscreen 這個關鍵字；全螢幕用 `allow="fullscreen"`＋外層按鈕。）
 * - `referrerPolicy="no-referrer"`：載簡報時不把含通行證的網址送給 R2。
 * 參考 [[reference_web_redirect_and_micro_page_sandbox]]：allow-scripts 與 allow-same-origin 不可同時給。
 *
 * backHref 不給 ＝ 客戶分享頁（/d/<code>）：左上只放公司標誌，不連回業務資源網站；contactUrl 有給就顯示「LINE 洽詢」。
 */
export function DeckPlayer({ src, title, backHref, contactUrl }: { src: string; title: string; backHref?: string; contactUrl?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [fsError, setFsError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 載入畫面的保險：iframe 的 load 事件沒來（網路慢、被擋）也在 8 秒後拿掉，不讓簡報被蓋住
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, []);

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

  const isShare = !backHref;

  return (
    <div className="flex h-[100dvh] flex-col bg-ink-900">
      <header className="flex h-14 shrink-0 items-center gap-3 px-3 text-white sm:px-5">
        {backHref ? (
          <Link href={backHref} className="-ml-1 inline-flex h-10 shrink-0 items-center gap-1 rounded-md px-2 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white">
            <IconChevronLeft className="h-4 w-4" aria-hidden="true" />
            返回
          </Link>
        ) : (
          <span className="flex shrink-0 items-center">
            <Image src="/ugo-logo-white.png" alt="宇果國際行銷" width={77} height={26} priority className="h-[26px] w-[77px]" />
          </span>
        )}
        <p className={`min-w-0 flex-1 truncate text-[14px] font-medium text-white/90 ${isShare ? 'hidden text-center sm:block' : 'text-center'}`}>{title}</p>
        {isShare && <span className="flex-1 sm:hidden" />}
        <div className="flex shrink-0 items-center gap-2">
          {contactUrl && (
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-md bg-line-700 px-3 text-[14px] font-medium text-white transition-colors hover:bg-line-800"
            >
              <IconMessage className="h-4 w-4" aria-hidden="true" />
              LINE 洽詢
            </a>
          )}
          <button
            type="button"
            onClick={fullscreen}
            aria-label="全螢幕播放"
            className="inline-flex h-10 items-center gap-1.5 rounded-md px-2.5 text-[14px] font-medium text-white/85 ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconMaximize className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">全螢幕</span>
          </button>
        </div>
      </header>
      {fsError && <p className="px-4 pb-2 text-center text-[13px] text-white/75">這台裝置不支援全螢幕，可以把手機轉橫向觀看。</p>}
      <div ref={wrap} className="relative min-h-0 flex-1 bg-black">
        <iframe
          src={src}
          title={title}
          sandbox="allow-scripts"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
        <div
          aria-hidden={loaded}
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-ink-900 px-6 text-center transition-opacity duration-500 motion-reduce:transition-none ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image src="/ugo-logo-white.png" alt="" width={142} height={48} className="h-12 w-[142px]" />
          <p className="mt-6 max-w-md text-[17px] font-semibold leading-snug text-white">{title}</p>
          <span className="mt-5 block h-0.5 w-32 overflow-hidden rounded-full bg-white/15" role="presentation">
            <span className="block h-full w-1/3 animate-kitload rounded-full bg-mint-400 motion-reduce:animate-none" />
          </span>
          <p className="mt-3 text-[13px] text-white/60">簡報載入中</p>
        </div>
      </div>
    </div>
  );
}
