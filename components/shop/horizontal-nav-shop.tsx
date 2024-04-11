import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { useAuth } from '../util/context-user';

const HorizontalNavShop: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: 'Shop',
      href: '/shop',
    },
    {
      title: 'Extras',
      href: '/shop/extras',
    },
    {
      title: 'Orders',
      href: '/shop/orders',
    },
    {
      title: 'Configurations',
      href: '/shop/config',
    },
  ]);

  const bgColor = `bg-${profile?.color}-600 text-white`;
  return (
    <>
      {/* <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-[#121212]">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`group inline-flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? bgColor
                    : `text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700`
                } `}
              >
                {item?.icon}

                {item?.title}
              </Link>
            );
          })}
        </nav>
      </div> */}

      <div className="border-b border-gray-200 dark:border-b-gray-600">
        <nav className="flex flex-wrap gap-4 space-x-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                  isActive
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

export { HorizontalNavShop };
