import type { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFBFD',
    theme_color: '#04566B',
    // ⚠️ 這裡只能指向實際存在的檔案。原本唯一一筆指向 /favicon.ico，
    // 那個檔從來沒有進過 repo，等於整份 manifest 的 icon 都是 404。
    // 素材由 public/ugo-mark.png 產出（app/icon.png 與 app/apple-icon.png 同源）。
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
