import { usePathname } from 'next/navigation';
import React from 'react'
import { NavbarProps } from '../layout-dashboard/header-vertical-nav-dashboard';
import Link from 'next/link';


const NAVIGATION_ITEMS: NavbarProps[] = [
    {
        title: "Profile",
        href: "/settings",
    },
    {
        title: "Notifications",
        href: "/settings/notifications",
    },
    {
        title: "Billing",
        href: "/settings/billing",
    },
    {
        title: "Configurations",
        href: "/settings/config",
    },
];

const HorizontalNavSetting: React.FC = () => {
    const pathname = usePathname();
    return (
        <>
            <div className="w-full pb-1 overflow-x-auto">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-10">

                        {NAVIGATION_ITEMS.map((item: any, index: number) => {
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
            </div>
        </>
    )
}

export { HorizontalNavSetting }