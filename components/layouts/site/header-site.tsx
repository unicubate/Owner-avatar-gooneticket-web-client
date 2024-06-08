import { TitleSite } from '@/components/ui-setting';
import Head from 'next/head';

interface IProps {
  title: string;
}

const HeaderSite = ({ title }: IProps) => {
  return (
    <Head>
      <TitleSite title={title} />
      <meta
        property="og:title"
        content={process.env.NEXT_PUBLIC_NAME_SITE}
        key="title"
      />
      <meta
        name="description"
        content={`Tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export { HeaderSite };
