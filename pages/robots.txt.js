const NEXT_PUBLIC_SITE = 'https://www.gooneticket.com';

function generateRobots() {
  return `User-agent: *
Allow: /
Disallow: /orders/

Sitemap: ${NEXT_PUBLIC_SITE}/sitemap.xml`;
}

function Robots() {}

export async function getServerSideProps({ res }) {
  if (process.env.NEXT_ENV !== 'prod') return { notFound: true };

  const robots = generateRobots();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default Robots;
