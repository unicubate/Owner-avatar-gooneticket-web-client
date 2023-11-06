import Head from "next/head";
import Main from "./main";
import { getCurrentUserFormToken, useAuth } from "../util/context-user";
import { HeaderHorizontalNavSite } from "./header-horizontal-nav-site";
import { useState } from "react";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutSite: React.FC<IProps> = ({ children, title }) => {
  const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      <HeaderHorizontalNavSite user={user} />
      <Main>
        <div className="w-full max-w-lg p-6 m-auto mt-10 md:mt-16 mx-auto bg-gray-100 dark:bg-zinc-800 rounded-lg shadow-md">
          {children}
        </div>
      </Main>
      {/* </div> */}
    </>
  );
};

export { LayoutSite };
