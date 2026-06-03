import type { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';
import { articles } from '@/lib/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const staticPages = ['', '/features', '/pricing', '/cases', '/blog', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8
  }));
  const blogPages = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));
  return [...staticPages, ...blogPages];
}
