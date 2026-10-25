import { ShareMessage } from '@/components/kit/ShareMessage';

/** /d 底下所有「找不到」共用這一頁：分享碼錯、停用、模組下架、未發布都長一樣 */
export default function ShareNotFound() {
  return <ShareMessage title="找不到這份簡報" body="連結可能已經失效。需要最新資料，請聯絡提供連結的業務，或用 LINE 洽詢宇果國際行銷。" />;
}
