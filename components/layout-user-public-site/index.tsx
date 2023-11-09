import Head from "next/head";
import { getCurrentUserFormToken, useAuth } from "../util/context-user";
import { HeaderHorizontalNavUserPublicSite } from "./header-horizontal-nav-user-public-site";
import { useState } from "react";
import { UserModel } from "@/types/user.type";

interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

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
          {user?.profile?.id && theme ?
            <div className={`flex flex-col flex-1 bg-gray-100 dark:bg-zinc-800`}>
              {children}
            </div>
            : null}
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };
