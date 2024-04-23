import { cn } from '@/lib/utils';
import {
  HomeIcon,
  ImageIcon,
  ListIcon,
  MailIcon,
  MenuSquareIcon,
  SettingsIcon,
  StoreIcon,
  TicketIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

export type NavbarProps = {
  title: ReactNode;
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

const VerticalNavDashboard = ({ user }: Props) => {
  const t = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.DASHBOARD' })}`,
      href: '/dashboard',
      icon: <HomeIcon className={classIcon} />,
    },
  ]);

  const [supportItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.EVENT' })}`,
      href: '/events',
      icon: <TicketIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SHOP' })}`,
      href: '/shop',
      icon: <StoreIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.POST' })}`,
      href: '/posts',
      icon: <MenuSquareIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.GALLERY' })}`,
      href: '/gallery',
      icon: <ImageIcon className={classIcon} />,
    },
  ]);
  const [settingItems] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.PAYMENT' })}`,
      href: '/payments',
      icon: <ListIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.MESSAGE' })}`,
      href: '/messages',
      icon: <MailIcon className={classIcon} />,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SETTING' })}`,
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
                    `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
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
              {t.formatMessage({ id: 'MENU.SUPPORT' })}
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
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
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
              {t.formatMessage({ id: 'MENU.SETTING' })}
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
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
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
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
