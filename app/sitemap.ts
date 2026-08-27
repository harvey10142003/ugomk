import type { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';
import { articles } from '@/lib/data/articles';
import { moduleDetails } from '@/lib/data/module-details';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const staticPages = [
    '', '/solutions', '/about', '/pricing', '/cases', '/blog', '/contact',
    '/services/line-marketing', '/services/smart-card', '/services/custom-modules'
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8
  }));
  // 每個模組說明頁都要進 sitemap —— 這些頁面是長尾搜尋的主要入口
  const modulePages = Object.keys(moduleDetails).map((slug) => ({
    url: `${base}/solutions/${slug}`,
    lastModified: now,
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
