import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";

const HorizontalNavCommission: React.FC = () => {
  const { profile } = useAuth() as any;
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Commissions",
      href: "/commissions",
    },
    {
      title: "Orders",
      href: "/commissions/orders",
    },
    {
      title: "Settings",
      href: "/commissions/settings",
    },
  ]);

  return (
    <>
       <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-[#121212]">
        <nav className="flex flex-wrap gap-4">
          {navigation.map((item: any, index: number) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={index}
                href={`${item.href}`}
                title={item.title}
                className={`group inline-flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `bg- text-white${profile?.color}-600`
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

      {/* <div className="px-3 py-2 border-gray-200 border-b">
                <nav className="flex flex-wrap gap-4">

                    {navigation.map((item: any, index: number) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={`${item.href}`}
                                title=""
                                className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                                    ? "text-indigo-600 border-indigo-600"
                                    : "border-transparent hover:border-gray-300"
                                    } `}
                            >
                                {item?.icon}

                                {item?.title}
                            </Link>
                        );
                    })}

                </nav>
            </div> */}
    </>
  );
};

export { HorizontalNavCommission };
