import Head from 'next/head';
import { ReactNode } from 'react';
import { useCanonicalUrl } from '../hooks';

interface IProps {
  title: string;
  metas?: ReactNode;
}

const HeaderSite = ({ title, metas }: IProps) => {
  const spacer = title ? ' | ' : '';
  const titleOutput = `${title}${spacer}GooneTicket`;

  const canonicalUrl = useCanonicalUrl();

  return (
    <Head>
      <title>{titleOutput}</title>
      {metas}
      {process.env.NEXT_ENV === 'prod' && (
        <link rel="canonical" href={canonicalUrl} />
      )}
      <meta property="og:title" content={titleOutput} key="title" />
      <meta property="og:site_name" content={titleOutput} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:description"
        content="The most easy way to organize the booking process"
      />
    </Head>
  );
};

export { HeaderSite };
