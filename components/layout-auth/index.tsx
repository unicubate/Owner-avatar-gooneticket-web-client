import Head from 'next/head';
import { useAuth } from '../util/context-user';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutAuth: React.FC<IProps> = ({ children, title }) => {
  const { theme } = useAuth() as any;
  // const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="py-10 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-10xl mx-auto mt-6 md:mt-12">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export { LayoutAuth };
