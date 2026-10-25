import { KitShell } from '@/components/kit/KitShell';
import { KitPasswordForm } from '@/components/kit/KitPasswordForm';

/**
 * 業務資源密碼頁（2026-10-25，伺服器元件）：連結設了密碼、這台裝置還沒輸入過（或密碼剛被改掉）時顯示。
 * 首頁、模組頁、簡報、QA 都用這一頁；輸入正確後重新讀原本那一頁。
 */
export function KitPasswordGate({ token }: { token: string }) {
  return (
    <KitShell>
      <section className="mx-auto flex max-w-md flex-col items-center pt-16 text-center sm:pt-24">
        <h1 className="text-[24px] font-bold leading-tight tracking-[-0.01em] text-ink-900 sm:text-[28px]">請輸入密碼</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-500">這是宇果國際行銷的業務內部網站。密碼請向公司索取，同一台裝置輸入一次，30 天內不用再輸入。</p>
        <div className="flex w-full justify-center text-left">
          <KitPasswordForm token={token} />
        </div>
      </section>
    </KitShell>
  );
}
