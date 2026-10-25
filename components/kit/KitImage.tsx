/* eslint-disable @next/next/no-img-element -- 不在白名單的網址退回原生 img（見 lib/kit-media.ts） */
import Image from 'next/image';
import { isOptimizableKitImage } from '@/lib/kit-media';

/**
 * 模組縮圖／圖卡／DM 預覽（2026-10-25 UI v2）。
 *
 * 外框決定比例（呼叫端給 aspect-* 與寬度），圖片 object-cover 填滿、預設對齊上方：
 * 圖卡的主視覺在上半部，裁切以上方為主；圖卡之後改版也一樣成立（不依賴目前圖卡長相）。
 * 白名單內的 R2 圖走 next/image（小尺寸 webp、lazy）；其他網址用原生 img，仍是 lazy＋no-referrer。
 * 沒有圖時顯示模組名稱字塊，不放假圖。
 */
export function KitImage({
  src,
  alt,
  sizes,
  className = '',
  position = 'top',
  fit = 'cover',
  priority = false,
  fallbackLabel,
}: {
  src: string | null;
  alt: string;
  /** next/image 的 sizes：照實際顯示寬度給，才不會抓過大的圖 */
  sizes: string;
  className?: string;
  position?: 'top' | 'center';
  fit?: 'cover' | 'contain';
  priority?: boolean;
  fallbackLabel?: string;
}) {
  const objectCls = `${fit === 'cover' ? 'object-cover' : 'object-contain'} ${position === 'top' ? 'object-top' : 'object-center'}`;
  return (
    <div className={`relative overflow-hidden bg-mist-300 ${className}`}>
      {!src ? (
        <div className="absolute inset-0 flex items-end bg-ink-900 p-4">
          <span className="text-[17px] font-bold leading-snug text-white">{fallbackLabel || alt}</span>
        </div>
      ) : isOptimizableKitImage(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} quality={70} priority={priority} className={objectCls} referrerPolicy="no-referrer" />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 h-full w-full ${objectCls}`}
        />
      )}
    </div>
  );
}
