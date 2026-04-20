import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers — allow public, block private
        userAgent: '*',
        allow: [
          '/',
          '/features',
          '/support',
          '/about',
          '/faq',
          '/help',
          '/contact',
          '/security',
          '/privacy',
          '/terms',
          '/sitemap.xml',
          '/manifest.json',
        ],
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/auth/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      {
        // Googlebot-specific — grant extra allowances
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/features',
          '/support',
          '/about',
          '/faq',
          '/help',
          '/contact',
          '/security',
          '/privacy',
          '/terms',
          '/opengraph-image',
        ],
        disallow: ['/dashboard/', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://ledgerknox.nullcove.com/sitemap.xml',
    host: 'https://ledgerknox.nullcove.com',
  };
}
