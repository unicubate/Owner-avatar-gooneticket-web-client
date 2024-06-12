import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { NavbarProps } from '.';

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
      title: `${t.formatMessage({ id: 'MENU.EVENT' })}`,
      count: 1,
      href: '/events',
    },
    {
      title: `${t.formatMessage({ id: 'MENU.ORDER' })}`,
      count: 1,
      href: '/orders',
    },
    {
      title: `${t.formatMessage({ id: 'MENU.AFFILIATE' })}`,
      count: user?.affiliation?.count,
      href: `/orders/affiliates`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.MESSAGE' })}`,
      count: 1,
      href: '/messages',
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SETTING' })}`,
      count: 1,
      href: '/settings',
    },
  ]);

  const bgColor = `bg-indigo-600 text-white`;
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigationItems
              .filter((i) => Number(i.count) >= 1)
              .map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={cn(
                      `group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-indigo-600 text-white`
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
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };
