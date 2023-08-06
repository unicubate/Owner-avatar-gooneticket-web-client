import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '../util/session/context-user';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';




const HorizontalNavSetting: React.FC = () => {
    const {profile} = useAuth() as any;
    const pathname = usePathname();
    const [navigation] = useState<NavbarProps[]>([
        {
            title: "Profile",
            href: "/settings",
        },
        {
            title: "Payments",
            href: "/settings/payments",
        },
        {
            title: "Configurations",
            href: "/settings/config",
        },
        {
            title: "Billing",
            href: "/settings/billing",
        },
        {
            title: "Notifications",
            href: "/settings/notifications",
        },
        {
            title: "Followings",
            href: "/settings/followings",
        },
        {
            title: "Followers",
            href: "/settings/followers",
        },
    ])


    return (
        <>
            <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                <nav className="flex flex-wrap gap-4">
                    {navigation.map((item: any, index: number) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={`${item.href}`}
                                title={item.title}
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg group whitespace-nowrap ${isActive
                                    ? `bg-gray-100 text-${profile?.color}-500`
                                    : `text-gray-500 bg-transparent hover:text-${profile?.color}-500 hover:bg-gray-100 group`
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
    )
}

export { HorizontalNavSetting }