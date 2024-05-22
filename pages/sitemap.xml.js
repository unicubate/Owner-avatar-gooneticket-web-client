const NEXT_PUBLIC_SITE = 'https://www.gooneticket.com';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/`}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/projects`}</loc>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>

      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/login`}</loc>
        <changefreq>never</changefreq>
        <priority>0.4</priority>
      </url>
      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/register`}</loc>
        <changefreq>never</changefreq>
        <priority>0.4</priority>
      </url>

      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/about-us`}</loc>
        <changefreq>never</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/contact-us`}</loc>
        <changefreq>never</changefreq>
        <priority>0.4</priority>
      </url>
      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/faqs`}</loc>
        <changefreq>yearly</changefreq>
        <priority>0.2</priority>
      </url>

      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/policies/cookie-policy`}</loc>
        <changefreq>never</changefreq>
        <priority>0.1</priority>
      </url>
      <url>
        <loc>${`${NEXT_PUBLIC_SITE}/policies/privacy-policy`}</loc>
        <changefreq>never</changefreq>
        <priority>0.1</priority>
      </url>

    </urlset>`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  if (process.env.NEXT_ENV !== 'prod') return { notFound: true };

  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
