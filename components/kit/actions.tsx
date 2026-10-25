'use client';

import { useState } from 'react';
import { IconCheck, IconCopy, IconDownload, IconLink, IconMessage } from '@/components/kit/icons';
import { btnLine, btnPrimary, btnSecondary } from '@/components/kit/styles';

/**
 * 業務資源網站的動作按鈕（2026-10-24 第二期；2026-10-25 UI v2 改外觀、加首頁快速分享與複製回答）。
 * 「用 LINE 分享」一律走 line.me/R/share?text=…（手機開 LINE 選聊天室；電腦開 LINE 網頁版）。
 * 分享出去的只有：簡報的客戶分享連結（ugomk.com/d/…）、圖卡圖片網址與文案、QA 回答文字 ——
 * 業務資源網站本身的網址不會出現在任何分享內容裡。
 */

function lineShareUrl(text: string): string {
  return `https://line.me/R/share?text=${encodeURIComponent(text)}`;
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  async function copy(key: string, text: string) {
    setFailed(false);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
    } catch {
      setFailed(true);
    }
  }
  return { copied, failed, copy };
}

/** 跨網域的檔案 <a download> 會被瀏覽器忽略 ⇒ 先抓成 blob 再存；抓不到（R2 沒開 CORS）就開新分頁讓使用者自己存 */
async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: 'cors', referrerPolicy: 'no-referrer' });
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 5000);
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

function CopiedLabel({ on, idle, done = '已複製' }: { on: boolean; idle: string; done?: string }) {
  return (
    <span aria-live="polite" className="inline-flex items-center gap-1.5">
      {on ? <IconCheck className="h-4 w-4" aria-hidden="true" /> : <IconLink className="h-4 w-4" aria-hidden="true" />}
      {on ? done : idle}
    </span>
  );
}

/** 簡報：複製客戶分享連結／用 LINE 分享 */
export function DeckShareActions({ title, shareUrl }: { title: string; shareUrl: string | null }) {
  const { copied, failed, copy } = useCopy();
  if (!shareUrl) return <p className="text-[13px] text-ink-400">這份簡報目前沒有開放客戶分享。</p>;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => copy('link', shareUrl)} className={btnSecondary}>
          <CopiedLabel on={copied === 'link'} idle="複製客戶連結" />
        </button>
        <a href={lineShareUrl(`${title}\n${shareUrl}`)} target="_blank" rel="noopener noreferrer" className={btnLine}>
          <IconMessage className="h-4 w-4" aria-hidden="true" />
          用 LINE 傳給客戶
        </a>
      </div>
      {failed && <p className="mt-2 break-all text-[13px] text-ink-500">無法自動複製，請長按複製：{shareUrl}</p>}
    </div>
  );
}

/**
 * 首頁模組卡片上的快速分享（最常做的事：把簡報傳給客戶，一下就到）。
 * 窄版：兩顆等寬按鈕；沒有可分享的簡報就說一句，不留空白按鈕。
 */
export function QuickShare({ title, shareUrl }: { title: string; shareUrl: string | null }) {
  const { copied, failed, copy } = useCopy();
  if (!shareUrl) return <p className="text-[13px] text-ink-400">簡報尚未開放客戶分享</p>;
  const small =
    'inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-2 text-[13px] font-medium transition-[background-color,border-color,transform] duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100';
  return (
    <div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => copy('link', shareUrl)}
          className={`${small} border border-mist-400 bg-white text-ink-900 hover:border-ink-300 hover:bg-mist-100`}
          aria-label={`複製「${title}」的客戶連結`}
        >
          <CopiedLabel on={copied === 'link'} idle="複製連結" />
        </button>
        <a
          href={lineShareUrl(`${title}\n${shareUrl}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${small} bg-line-700 text-white hover:bg-line-800`}
          aria-label={`用 LINE 傳「${title}」給客戶`}
        >
          <IconMessage className="h-4 w-4 shrink-0" aria-hidden="true" />
          LINE 傳送
        </a>
      </div>
      {failed && <p className="mt-2 break-all text-[12px] text-ink-500">請長按複製：{shareUrl}</p>}
    </div>
  );
}

/** 圖卡：下載／複製文案／LINE 分享（文案裡的 {deck_link} 已在伺服器端換成簡報分享網址） */
export function CardActions({ title, shareText, imageUrl, filename }: { title: string; shareText: string; imageUrl: string; filename: string }) {
  const { copied, failed, copy } = useCopy();
  const lineText = shareText || title;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => downloadFile(imageUrl, filename)} className={btnSecondary}>
          <IconDownload className="h-4 w-4" aria-hidden="true" />
          下載圖卡
        </button>
        {shareText && (
          <button type="button" onClick={() => copy('text', shareText)} className={btnSecondary}>
            <span aria-live="polite" className="inline-flex items-center gap-1.5">
              {copied === 'text' ? <IconCheck className="h-4 w-4" aria-hidden="true" /> : <IconCopy className="h-4 w-4" aria-hidden="true" />}
              {copied === 'text' ? '已複製' : '複製文案'}
            </span>
          </button>
        )}
        <a href={lineShareUrl(lineText)} target="_blank" rel="noopener noreferrer" className={btnLine}>
          <IconMessage className="h-4 w-4" aria-hidden="true" />
          LINE 分享
        </a>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-400">LINE 分享會帶文案與連結；圖片請先下載再一起傳。</p>
      {failed && <p className="mt-1 text-[13px] text-ink-500">無法自動複製，請長按上面的文字自行複製。</p>}
    </div>
  );
}

/** DM：下載 PDF／PNG */
export function DmActions({ pdfUrl, pngUrl, baseName }: { pdfUrl: string | null; pngUrl: string | null; baseName: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {pdfUrl && (
        <button type="button" onClick={() => downloadFile(pdfUrl, `${baseName}.pdf`)} className={btnPrimary}>
          <IconDownload className="h-4 w-4" aria-hidden="true" />
          下載 PDF
        </button>
      )}
      {pngUrl && (
        <button type="button" onClick={() => downloadFile(pngUrl, `${baseName}.png`)} className={btnSecondary}>
          <IconDownload className="h-4 w-4" aria-hidden="true" />
          下載圖片
        </button>
      )}
    </div>
  );
}

/** QA：複製建議回答（業務要貼給客戶時用） */
export function CopyTextButton({ text, label = '複製回答' }: { text: string; label?: string }) {
  const { copied, failed, copy } = useCopy();
  if (!text) return null;
  return (
    <span className="inline-flex flex-col">
      <button
        type="button"
        onClick={() => copy('t', text)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-mist-400 bg-white px-3 text-[13px] font-medium text-ink-900 transition-colors hover:border-ink-300 hover:bg-mist-100"
      >
        <span aria-live="polite" className="inline-flex items-center gap-1.5">
          {copied === 't' ? <IconCheck className="h-4 w-4" aria-hidden="true" /> : <IconCopy className="h-4 w-4" aria-hidden="true" />}
          {copied === 't' ? '已複製' : label}
        </span>
      </button>
      {failed && <span className="mt-1 text-[12px] text-ink-500">無法自動複製，請長按文字複製。</span>}
    </span>
  );
}
