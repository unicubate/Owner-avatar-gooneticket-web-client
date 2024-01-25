import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { useAuth } from '../util/context-user';

const HorizontalNavMembership: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: 'Memberships',
      href: '/memberships',
    },
    {
      title: 'Levels',
      href: '/memberships/levels',
    },
    // {
    //     title: "Settings",
    //     href: "/memberships/settings",
    // }
  ]);

  const bgColor = `bg-${profile?.color}-600 text-white`;
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-[#121212]">
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
      </div>
      {/* <div className="w-full pb-1 overflow-x-auto">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-10">

                        {navigation.map((item: any, index: number) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={`${item.href}`}
                                    title=""
                                    className={`py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 ${isActive
                                        ? "border-indigo-600 whitespace-nowrap"
                                        : "border-transparent hover:border-gray-300 whitespace-nowrap"
                                        } `}
                                >
                                    {item?.icon}

                                    {item?.title}
                                </Link>
                            );
                        })}

                    </nav>
                </div>
            </div> */}
    </>
  );
};

export { HorizontalNavMembership };
