import Head from "next/head";
import { getCurrentUserFormToken, useAuth } from "../util/context-user";
import { HeaderHorizontalNavUserPublicSite } from "./header-horizontal-nav-user-public-site";
import { useState } from "react";
import { UserModel } from "@/types/user.type";
import { useTranslations } from "next-intl";

interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

export const navigationPublicUser = (options: {
  username: string;
  user: UserModel;
}) => {

  const { username, user } = options;

  return [
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
  ];
};

const LayoutUserPublicSite: React.FC<IProps> = ({ children, title, user }) => {
  const { theme } = useAuth() as any;
  // const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      <HeaderHorizontalNavUserPublicSite user={user} />

      <main>
        <div className="mx-auto lg:flex mb-10">
          {user?.profile?.id && theme ? (
            <div
              className={`flex flex-col flex-1 bg-gray-100 dark:dark:bg-[#232325]`}
            >
              {children}
            </div>
          ) : null}
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };
