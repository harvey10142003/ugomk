import type { MetadataRoute } from 'next';
import { site, pageUpdatedAt } from '@/lib/data/site';
import { articles } from '@/lib/data/articles';
import { moduleDetails } from '@/lib/data/module-details';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  /**
   * lastmod 只在真的沒宣告時才退回今天。
   * 原本每一筆都用 new Date()，等於每次部署都對 Google 說「全站今天更新」——
   * 幾次之後這個站的 lastmod 就不會再被採信，真的更新的那次也一起失效。
   */
  const fallback = new Date();
  const at = (declared?: string) => (declared ? new Date(declared) : fallback);

  const staticPages = [
    '', '/solutions', '/about', '/pricing', '/cases', '/blog', '/contact',
    '/services/line-marketing', '/services/smart-card', '/services/custom-modules',
    '/privacy'
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: at(pageUpdatedAt[p]),
    changeFrequency: 'weekly' as const,
    // 隱私權說明是義務性頁面，不該和內容頁搶排名權重
    priority: p === '' ? 1 : p === '/privacy' ? 0.2 : 0.8
  }));
  // 每個模組說明頁都要進 sitemap —— 這些頁面是長尾搜尋的主要入口
  const modulePages = Object.values(moduleDetails).map((m) => ({
    url: `${base}/solutions/${m.slug}`,
    lastModified: at(m.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));
  const blogPages = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));
  return [...staticPages, ...modulePages, ...blogPages];
}
