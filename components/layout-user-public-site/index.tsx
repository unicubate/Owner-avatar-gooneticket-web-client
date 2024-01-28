import { UserModel } from '@/types/user.type';
import Head from 'next/head';
import { useAuth } from '../util/context-user';
import { HorizontalNavUserPublicSite } from './horizontal-nav-user-public-site';

interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

const LayoutUserPublicSite: React.FC<IProps> = ({ children, title, user }) => {
  const { theme } = useAuth() as any;
  // const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      {user?.id ? <HorizontalNavUserPublicSite user={user} /> : null}

      <main>
        <div className="mx-auto mb-10 lg:flex">
          {user?.profile?.id && theme ? (
            <div
              className={`flex flex-1 flex-col bg-gray-100 dark:bg-[#232325]`}
            >
              {children}
            </div>
          ) : null}
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };
