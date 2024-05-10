import Head from 'next/head';
import { useAuth } from '../util/context-user';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutCheckoutSite: React.FC<IProps> = ({ children, title }) => {
  const { theme } = useAuth() as any;
  // const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="bg-gray-50 py-8 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         
        </div>
      </div> */}
      <div className="flex flex-1 dark:bg-black/15">
        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export { LayoutCheckoutSite };
