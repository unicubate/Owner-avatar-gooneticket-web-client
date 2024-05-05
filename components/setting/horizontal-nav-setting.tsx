import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../util/context-user';

export function HorizontalNavSetting() {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<any[]>([
    {
      title: 'Profile',
      href: '/settings',
    },
    {
      title: 'Payout',
      href: '/settings/payout',
    },
    {
      title: 'Subscribers',
      href: '/settings/subscribers',
    },
    {
      title: 'Categories',
      href: '/settings/categories',
    },
  ]);

  const bgColor = `bg-${profile?.color}-600 text-white`;
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
}
