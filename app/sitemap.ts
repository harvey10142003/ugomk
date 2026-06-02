import type { MetadataRoute } from 'next';
import { site } from '@/lib/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  return ['', '/features', '/pricing', '/cases', '/contact'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8
  }));
}
