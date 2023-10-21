import Head from "next/head";
import { getCurrentUserFormToken, useAuth } from "../util/context-user";
import { HeaderHorizontalNavUserPublicSite } from "./header-horizontal-nav-user-public-site";
import { useState } from "react";

interface IProps {
  user: any;
  title: string;
  children: React.ReactNode;
}

const LayoutUserPublicSite: React.FC<IProps> = ({ children, title ,user}) => {
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
        <div className="mx-auto lg:flex mb-10">{children}</div>
      </main>
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };
