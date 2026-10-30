import Image from 'next/image';
import type { ScenePhoto as ScenePhotoData } from '@/lib/data/scene-photos';
import { cn } from '@/lib/utils';

/**
 * 情境照（lib/data/scene-photos.ts）。
 * - 一律帶 width／height（next/image 依此保留版位，CLS 維持 0），預設 lazy。
 * - 右上角固定標「情境示意」：這些都是生成的行業情境，不是客戶實景，訪客要看得到。
 * - 圓角與框線跟全站卡片一致（小圓角、不加陰影）。
 */
export function ScenePhoto({
  photo,
  sizes,
  className,
  imgClassName,
  priority = false,
  caption,
  note = '情境示意'
}: {
  photo: ScenePhotoData;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** 圖下的小字說明；不給就只有角標 */
  caption?: string;
  /** 右上角角標；成功案例相關用「行業情境示意」 */
  note?: string;
}) {
  return (
    <figure className={cn('relative', className)}>
      <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-mist-200">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn('h-auto w-full object-cover', imgClassName)}
        />
        <span className="photo-note" aria-hidden="true">
          {note}
        </span>
      </div>
      {caption ? <figcaption className="mt-3 text-xs leading-relaxed text-ink-500">{caption}</figcaption> : null}
    </figure>
  );
}
