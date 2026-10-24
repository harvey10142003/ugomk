'use client';

import { useState } from 'react';
import { Check, Copy, Download, Link2, MessageCircle } from 'lucide-react';

/**
 * 業務資源網站的動作按鈕（2026-10-24 第二期）。
 * 「用 LINE 分享」一律走 line.me/R/share?text=…（手機開 LINE 選聊天室；電腦開 LINE 網頁版）。
 * 分享出去的只有：簡報的客戶分享連結（ugomk.com/d/…）、圖卡圖片網址與文案 —— 業務資源網站本身的網址不會出現在任何分享內容裡。
 */

const btn = 'inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors';
const primary = `${btn} border-brand-700 bg-brand-700 text-white hover:bg-brand-800`;
const secondary = `${btn} border-mist-400 bg-white text-ink-700 hover:border-brand-300`;
const lineBtn = `${btn} border-line-700 bg-line-700 text-white hover:bg-line-800`;

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
    const res = await fetch(url, { mode: 'cors' });
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

/** 簡報：複製客戶分享連結／用 LINE 分享 */
export function DeckShareActions({ title, shareUrl }: { title: string; shareUrl: string | null }) {
  const { copied, failed, copy } = useCopy();
  if (!shareUrl) return <p className="text-xs text-ink-400">這份簡報目前沒有開放客戶分享。</p>;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => copy('link', shareUrl)} className={secondary}>
          {copied === 'link' ? <Check className="h-4 w-4 text-brand-700" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
          {copied === 'link' ? '已複製' : '複製客戶分享連結'}
        </button>
        <a href={lineShareUrl(`${title}\n${shareUrl}`)} target="_blank" rel="noopener noreferrer" className={lineBtn}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          用 LINE 分享
        </a>
      </div>
      {failed && <p className="mt-2 break-all text-xs text-ink-500">無法自動複製，請長按複製：{shareUrl}</p>}
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
        <button type="button" onClick={() => downloadFile(imageUrl, filename)} className={secondary}>
          <Download className="h-4 w-4" aria-hidden="true" />
          下載
        </button>
        {shareText && (
          <button type="button" onClick={() => copy('text', shareText)} className={secondary}>
            {copied === 'text' ? <Check className="h-4 w-4 text-brand-700" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied === 'text' ? '已複製' : '複製文案'}
          </button>
        )}
        <a href={lineShareUrl(lineText)} target="_blank" rel="noopener noreferrer" className={lineBtn}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          LINE 分享
        </a>
      </div>
      <p className="mt-2 text-xs text-ink-400">LINE 分享會帶文案與連結；圖片請先「下載」再一起傳。</p>
      {failed && <p className="mt-1 text-xs text-ink-500">無法自動複製，請長按上面的文字自行複製。</p>}
    </div>
  );
}

/** DM：下載 PDF／PNG */
export function DmActions({ pdfUrl, pngUrl, baseName }: { pdfUrl: string | null; pngUrl: string | null; baseName: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {pdfUrl && (
        <button type="button" onClick={() => downloadFile(pdfUrl, `${baseName}.pdf`)} className={primary}>
          <Download className="h-4 w-4" aria-hidden="true" />
          下載 PDF
        </button>
      )}
      {pngUrl && (
        <button type="button" onClick={() => downloadFile(pngUrl, `${baseName}.png`)} className={secondary}>
          <Download className="h-4 w-4" aria-hidden="true" />
          下載 PNG
        </button>
      )}
    </div>
  );
}
