import Head from 'next/head';
import { ReactNode } from 'react';
import { useCanonicalUrl } from '../hooks';

interface IProps {
  title: string;
  metas?: ReactNode;
  isHomePage?: boolean;
}

const getDomain = (domain: string) => domain + `.gooneticket.com`;

const HeaderSite = ({ title, metas, isHomePage = false }: IProps) => {
  const siteDomain = getDomain('www');

  const spacer = title ? ' | ' : '';
  const titleOutput = `${title}${spacer}GooneTicket`;

  const canonicalUrl = useCanonicalUrl();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {title != null && <title key="title">{titleOutput}</title>}

      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        href={canonicalUrl.replace(siteDomain, getDomain('www'))}
        hrefLang="x-default"
      />
      {title != null && (
        <meta property="og:title" content={titleOutput} key="og:title" />
      )}
      <meta
        name="twitter:card"
        key="twitter:card"
        content="summary_large_image"
      />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:url" key="og:url" content={canonicalUrl} />
      {metas}
      {/* <meta
          name="google-site-verification"
          content="sIlAGs48RulR4DdP95YSWNKZIEtCqQmRjzn-Zq-CcD0"
        /> */}
    </Head>
  );
};

export { HeaderSite };
