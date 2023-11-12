import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";

const HorizontalNavDonation: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Donations",
      href: "/donations",
    },
    {
      title: "Settings",
      href: "/donations/settings",
    },
  ]);

  return (
    <>
      <div className="px-3 py-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-lg">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group whitespace-nowrap ${
                  isActive
                    ? `text-white bg-${profile?.color}-600`
                    : `hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white`
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

export { HorizontalNavDonation };
