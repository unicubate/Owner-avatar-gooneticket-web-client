const NEXT_PUBLIC_SITE = 'https://www.gooneticket.com';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/orders'],
    },
    sitemap: `${NEXT_PUBLIC_SITE}/sitemap.xml`,
  };
}
