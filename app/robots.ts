import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://snpi.edu.kh';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/document', '/document/design-system', '/login'],
      disallow: ['/api/', '/dashboard/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
