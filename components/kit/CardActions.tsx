'use client';

import { useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';

/**
 * 分享圖卡的動作列：複製文案、分享（手機呼叫系統分享，能帶圖就帶圖）、開啟原圖。
 * 圖片網址是 R2 公開網址（圖卡本來就要給客戶）；連結本身不帶出去。
 */
export function CardActions({ title, shareText, imageUrl }: { title: string; shareText: string; imageUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMsg('無法自動複製，請長按文字自行複製');
    }
  }

  async function share() {
    setMsg('');
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (!nav.share) {
      await copy();
      setMsg('這個瀏覽器不支援直接分享，已改為複製文案；圖片請長按儲存');
      return;
    }
    try {
      // 能帶圖檔就帶（手機 LINE 分享會直接是圖）；抓不到圖（跨網域限制）就退回文字＋圖片網址
      let files: File[] | undefined;
      try {
        const res = await fetch(imageUrl, { mode: 'cors' });
        if (res.ok) {
          const blob = await res.blob();
          const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
          const f = new File([blob], `card.${ext}`, { type: blob.type });
          if (nav.canShare?.({ files: [f] })) files = [f];
        }
      } catch {
        files = undefined;
      }
      if (files) await nav.share({ title, text: shareText, files });
      else await nav.share({ title, text: shareText ? `${shareText}\n${imageUrl}` : imageUrl });
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') setMsg('分享沒有完成，可以改用複製文案');
    }
  }

  const btn = 'inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors';
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={share} className={`${btn} border-brand-700 bg-brand-700 text-white hover:bg-brand-800`}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          分享
        </button>
        {shareText && (
          <button type="button" onClick={copy} className={`${btn} border-mist-400 bg-white text-ink-700 hover:border-brand-300`}>
            {copied ? <Check className="h-4 w-4 text-brand-700" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? '已複製' : '複製文案'}
          </button>
        )}
        <a href={imageUrl} target="_blank" rel="noopener noreferrer" className={`${btn} border-mist-400 bg-white text-ink-700 hover:border-brand-300`}>
          <Download className="h-4 w-4" aria-hidden="true" />
          開啟原圖
        </a>
      </div>
      {msg && <p className="mt-2 text-xs text-ink-500">{msg}</p>}
    </div>
  );
}
