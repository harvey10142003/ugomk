/** /kit 底下所有「找不到」共用這一頁：token 錯、停用、過期、模組或素材不存在都長一樣（不透露哪一種） */
export default function KitNotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-xl font-bold text-ink-900">找不到這個頁面</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">網址可能打錯，或這個連結已經失效。需要協助請聯絡宇果國際行銷。</p>
    </div>
  );
}
