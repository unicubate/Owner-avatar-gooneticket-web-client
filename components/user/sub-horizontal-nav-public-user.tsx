import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { useRouter } from "next/router";
import { AvatarComponent } from "../ui/avatar-component";
import { UserModel } from "@/types/user.type";

const SubHorizontalNavPublicUser: React.FC<{ user: UserModel }> = ({
  user,
}) => {
  const { query } = useRouter();
  const username = String(query?.username);

  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Home",
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: "Gallery",
      status: user?.profile?.enableGallery,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: "Memberships",
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: "Posts",
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: "Shop",
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
    {
      title: "Commissions",
      status: user?.profile?.enableCommission,
      count: user?.commission?.count,
      href: `/${username}/commissions`,
    },
  ]);

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap justify-center space-x-8">
          {navigation
            .filter((item) => item?.status === true && Number(item?.count) >= 1)
            .map((item: any, index: number) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item.title}
                  className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    isActive
                      ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                      : `border-transparent text-gray-500 dark:text-gray-500 hover:border-${user?.profile?.color}-300`
                  } `}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
        </nav>
      </div>

      {/* <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="w-full pb-1 overflow-x-auto">
              <nav className="flex -mb-px space-x-10">
                {navigation.filter((item) => item?.status === true).map((item: any, index: number) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item.title}
                      className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                        ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                        : `border-transparent text-gray-500 hover:border-gray-300`
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

export { SubHorizontalNavPublicUser };
