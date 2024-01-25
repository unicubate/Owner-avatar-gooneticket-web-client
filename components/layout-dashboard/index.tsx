import Head from 'next/head';
import { useAuth } from '../util/context-user';
import { HeaderHorizontalNavDashboard } from './header-horizontal-nav-dashboard';
import { HeaderVerticalNavDashboard } from './header-vertical-nav-dashboard';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutDashboard = ({ children, title }: IProps) => {
  const { profile, username, theme } = useAuth() as any;
  const user = { profile, username };

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="flex flex-col">
        <HeaderHorizontalNavDashboard user={user} />

        <div className="flex flex-1">
          {profile?.id ? <HeaderVerticalNavDashboard user={user} /> : null}

          <div className={`flex flex-1 flex-col bg-gray-100 dark:bg-[#232325]`}>
            <main>{children}</main>
          </div>

          {/* {profile?.id && theme ?
            <div className={`flex flex-col flex-1 ${theme === "light" ? "bg-gray-100" : ""}`}>
              <main>
                {children}
              </main>
            </div>
            : null} */}
        </div>
      </div>
    </>
  );
};

export { LayoutDashboard };
