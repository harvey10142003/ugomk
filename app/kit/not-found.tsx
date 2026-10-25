import { KitTopBar } from '@/components/kit/KitShell';

/** /kit 底下所有「找不到」共用這一頁：token 錯、停用、過期、模組或素材不存在都長一樣（不透露哪一種） */
export default function KitNotFound() {
  return (
    <div className="min-h-screen">
      <KitTopBar />
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-16 sm:px-8">
        <h1 className="text-[24px] font-bold text-ink-900">找不到這個頁面</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-500">網址可能打錯，或這個連結已經失效。需要協助請聯絡宇果國際行銷。</p>
      </div>
    </div>
  );
}
