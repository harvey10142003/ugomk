import Image from 'next/image';
import { site } from '@/lib/data/site';
import { IconMessage } from '@/components/kit/icons';

/**
 * 客戶分享頁（/d）的訊息畫面：找不到、暫時無法讀取（2026-10-25 UI v2）。
 * 客戶看到的唯一一頁，所以也要有品牌：深青底、白色標誌、一句話、一顆「LINE 洽詢」。
 * 找不到的各種原因（碼錯、停用、下架、未發布）一律同一句，不透露是哪一種。
 */
export function ShareMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-ink-900 px-6 text-white">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-start justify-center py-16">
        <Image src="/ugo-logo-white.png" alt="宇果國際行銷" width={119} height={40} priority className="h-10 w-[119px]" />
        <h1 className="mt-10 text-[24px] font-bold leading-snug">{title}</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-white/80">{body}</p>
        <a
          href={site.contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-line-700 px-4 text-[15px] font-medium text-white transition-colors hover:bg-line-800"
        >
          <IconMessage className="h-4 w-4" aria-hidden="true" />
          LINE 洽詢 {site.contact.lineId}
        </a>
      </div>
      <p className="mx-auto w-full max-w-md pb-8 text-[13px] text-white/55">
        {site.legalName}・ugomk.com
      </p>
    </div>
  );
}
