import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../util/context-user';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';

const HorizontalNavPayoutSetting: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: 'Payout',
      href: '/payout-settings',
    },
  ]);

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
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
                    ? `text- bg-gray-100${profile?.color}-500`
                    : `hover:text- bg-transparent text-gray-500${profile?.color}-500 group hover:bg-gray-100`
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

export { HorizontalNavPayoutSetting };
