import { cn } from '@/lib/utils';
import {
  Dice6Icon,
  ExternalLinkIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  ListIcon,
  LockKeyholeIcon,
  LogOutIcon,
  MenuSquareIcon,
  SearchIcon,
  SettingsIcon,
  StoreIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { logoutUser } from '../util/context-user';

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  count?: number;
  icon?: any;
};
const classIcon = 'flex-shrink-0 size-5 mr-4';

interface Props {
  user?: any;
}

const VerticalNavDashboard: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const t = useTranslations('menu-site');
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: `${t('home')}`,
      href: '/dashboard',
      icon: <HomeIcon className={classIcon} />,
    },
    {
      title: `${t('your_page')}`,
      href: `/${user?.username}`,
      icon: <ExternalLinkIcon className={classIcon} />,
    },
    {
      title: `${t('feed')}`,
      href: '/home',
      icon: <Dice6Icon className={classIcon} />,
    },
    {
      title: 'Explore',
      href: '/explore',
      icon: <SearchIcon className={classIcon} />,
    },
  ]);

  const [monetizeItems] = useState<NavbarProps[]>([
    {
      title: `${t('donations')}`,
      href: '/donations',
      icon: <HeartIcon className={classIcon} />,
    },
    {
      title: `${t('memberships')}`,
      href: '/memberships',
      icon: <LockKeyholeIcon className={classIcon} />,
    },
    {
      title: `${t('commissions')}`,
      href: '/commissions',
      icon: <HeartHandshakeIcon className={classIcon} />,
    },
    {
      title: `${t('shop')}`,
      href: '/shop',
      icon: <StoreIcon className={classIcon} />,
    },
  ]);
  const [supportItems] = useState<NavbarProps[]>([
    {
      title: `${t('posts')}`,
      href: '/posts',
      icon: <MenuSquareIcon className={classIcon} />,
    },
    {
      title: `${t('gallery')}`,
      href: '/gallery',
      icon: <ImageIcon className={classIcon} />,
    },
    {
      title: `${t('payments')}`,
      href: '/payments',
      icon: <ListIcon className={classIcon} />,
    },
  ]);
  const [settingItems] = useState<NavbarProps[]>([
    {
      title: `${t('settings')}`,
      href: '/settings',
      icon: <SettingsIcon className={classIcon} />,
    },
  ]);

  const bgColor = `bg-${user?.profile?.color}-600 text-white`;
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item: any, index: number) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={cn(
                    `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? bgColor
                        : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                    }`,
                  )}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
          </nav>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Monetize
            </p>

            <nav className="mt-4 flex-1 space-y-1">
              {monetizeItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? bgColor
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <a href="#" title="" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                        Hotjar
                                        <span className="text-xs uppercase ml-auto font-semibold text-indigo-600 bg-indigo-50 border border-indigo-300 rounded-full inline-flex items-center px-2 py-0.5"> New </span>
                                    </a> */}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Support
            </p>
            <nav className="mt-4 flex-1 space-y-1">
              {supportItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? bgColor
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Settings
            </p>
            <nav className="mt-4 flex-1 space-y-1">
              {settingItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? bgColor
                          : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                      }`,
                    )}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `dark:text-white bg-${user?.profile?.color}-600`
                      : "text-black dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link> */}

              <a
                href={void 0}
                title=""
                onClick={() => logoutUser()}
                className="group flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-200 dark:text-white dark:hover:bg-gray-200"
              >
                <LogOutIcon className={classIcon} />
                {t('logout')}
              </a>
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
