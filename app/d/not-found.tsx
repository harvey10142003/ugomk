/** /d 底下所有「找不到」共用這一頁：分享碼錯、停用、模組下架、未發布都長一樣 */
export default function ShareNotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold text-mint-300">404</p>
      <h1 className="mt-2 text-xl font-bold text-white">找不到這份簡報</h1>
      <p className="mt-2 text-sm leading-relaxed text-white/70">連結可能已經失效。需要最新資料請聯絡提供連結的業務，或洽宇果國際行銷 ugomk.com。</p>
    </div>
  );
}
