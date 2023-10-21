import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../util/context-user";
import { NavbarProps } from "../layout-dashboard/vertical-nav-dashboard";
import { useRouter } from "next/router";
import { AvatarComponent } from "../ui/avatar-component";

const HorizontalNavPublicUser: React.FC<{ user: any }> = ({ user }) => {
  const { userStorage: userVisiter } = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);

  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: "Home",
      status: true,
      href: `/${username}`,
    },
    {
      title: "Gallery",
      status: user?.profile?.enableGallery,
      href: `/${username}/gallery`,
    },
    {
      title: "Memberships",
      status: true,
      href: `/${username}/memberships`,
    },
    {
      title: "Posts",
      status: true,
      href: `/${username}/posts`,
    },
    {
      title: "Shop",
      status: user?.profile?.enableShop,
      href: `/${username}/shop`,
    },
    {
      title: "Commissions",
      status: user?.profile?.enableCommission,
      href: `/${username}/commissions`,
    },
  ]);

  return (
    <>
        <div className="text-center">
          <AvatarComponent
            size={{ xs: 50, sm: 50, md: 60, lg: 64, xl: 80, xxl: 100 }}
            profile={user?.profile}
          />

          <p className="mt-6 text-lg font-semibold text-black">
            {user?.profile?.firstName ?? ""} {user?.profile?.lastName ?? ""}
            {" "}
          </p>

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

        </div>


    </>
  );
};

export { HorizontalNavPublicUser };
