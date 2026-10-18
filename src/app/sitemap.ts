export const revalidate = 3600;

import { MetadataRoute } from 'next';
import { getCompanies } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexoragroup.com';
  const companies = await getCompanies();

  const companyRoutes = companies
    .filter((c) => c.is_active)
    .map((c) => ({
      url: `${siteUrl}/companies/${c.slug}`,
      lastModified: new Date(c.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${siteUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3
    },
    ...companyRoutes
  ];
}
