import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/session/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { useRouter } from "next/router";
import { Avatar } from "antd";
import { ButtonInput } from "../templates/button-input";
import { HtmlParser } from "@/utils/html-parser";
import { ReadMore } from "@/utils/read-more";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { CreateOrUpdateFormFollow } from "../like-follow/create-or-update-form-follow";

const HorizontalNavPublicUser: React.FC<{ user: any }> = ({ user }) => {
  const { query } = useRouter();
  const username = String(query?.username);

  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Home",
      href: `/${username}`,
    },
    {
      title: "Memberships",
      href: `/${username}/memberships`,
    },
    {
      title: "Posts",
      href: `/${username}/posts`,
    },
    {
      title: "Shop",
      href: `/${username}/shop`,
    },
  ]);
  
  return (
    <>
      <div
        className={`py-12 bg-gray-900 sm:pb-6 sm:pt-16 lg:pt-20`}
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-8xl">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-stretch justify-between sm:items-center">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={user?.profile?.image}
                alt={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
              />

              <div className="flex flex-col justify-between flex-1 ml-6 sm:flex-row sm:items-center sm:space-x-6">
                <div className="sm:flex-1">
                  <p className="text-xl font-bold text-white">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                  <p className="mt-1 text-sm text-white">
                    <ReadMore html={String(user?.profile?.description ?? '')} value={150} />
                  </p>
                  {user?.profile?.url ? (
                    <p className="mt-1 text-sm text-white">{user?.profile?.url}</p>
                  ) : null}
                </div>
                <div className="mt-4 sm:ml-auto sm:mt-0">
                  <CreateOrUpdateFormFollow  item={user}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="w-full pb-1 overflow-x-auto">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-10">
              {navigation.map((item: any, index: number) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item.title}
                    className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                      isActive
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
        </div>
      </div>
    </>
  );
};

export { HorizontalNavPublicUser };
