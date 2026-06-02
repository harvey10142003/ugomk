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
    theme_color: '#06C755',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }
    ]
  };
}
