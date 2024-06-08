import Head from 'next/head';
import { ReactNode } from 'react';
import { useCanonicalUrl } from '../hooks';

interface IProps {
  title: string;
  metas?: ReactNode;
}

const HeaderSite = ({ title, metas }: IProps) => {
  const spacer = title ? ' | ' : '';
  const titleOutput = `${title}${spacer}GoOneTicket`;

  const canonicalUrl = useCanonicalUrl();

  return (
    <Head>
      <title>{titleOutput}</title>
      {metas}
      {process.env.NEXT_ENV === 'prod' && (
        <link rel="canonical" href={canonicalUrl} />
      )}
      <meta property="og:title" content={titleOutput} key="title" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export { HeaderSite };
