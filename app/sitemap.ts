import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ledgerknox.nullcove.com';

// Build date — update this when major content changes happen
const SITE_BUILD_DATE = new Date('2026-04-20T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/help`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/security`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.55,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: SITE_BUILD_DATE,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}

