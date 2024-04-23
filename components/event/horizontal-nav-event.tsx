import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { useAuth } from '../util/context-user';

const HorizontalNavEvent = () => {
  const { t } = useInputState();
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.EVENT' })}`,
      href: '/events',
    },
    {
      title: 'Extras',
      href: '/events/extras',
    },
    {
      title: 'Orders',
      href: '/events/orders',
    },
  ]);

  return (
    <>
      <div className="border-b border-gray-200 dark:border-b-gray-600">
        <nav className="flex flex-wrap gap-4 space-x-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${isActive
                  ? `text-${profile?.color}-600 border-${profile?.color}-600`
                  : 'border-transparent hover:border-gray-300'
                  } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export { HorizontalNavEvent };
