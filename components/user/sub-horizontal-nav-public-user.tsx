import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { useRouter } from "next/router";
import { UserModel } from "@/types/user.type";
import { navigationPublicUser } from "../layout-user-public-site";
import { useTranslations } from "next-intl";

const SubHorizontalNavPublicUser: React.FC<{ user: UserModel }> = ({
  user,
}) => {
  const t = useTranslations('menu-site');
  const { query } = useRouter();
  const username = String(query?.username);
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t("home")}`,
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: `${t("gallery")}`,
      status: user?.profile?.enableGallery,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: `${t("memberships")}`,
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: `${t("posts")}`,
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: `${t("shop")}`,
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
    {
      title: `${t("commissions")}`,
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
                      : `border-transparent text-gray-500 dark:text-gray-500 hover:border-gray-300`
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
