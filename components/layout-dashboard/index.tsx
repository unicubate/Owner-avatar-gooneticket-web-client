import Head from "next/head";
import { HeaderHorizontalNavDashboard } from "./header-horizontal-nav-dashboard";
import { HeaderVerticalNavDashboard } from "./header-vertical-nav-dashboard";
import { useContext, useState } from "react";
import { Button, Drawer } from "antd";
import { useAuth } from "../util/session/context-user";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutDashboard = ({ children, title }: IProps) => {
  const user = useAuth() as any;
  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="flex flex-col bg-gray-100">
        {/* <HeaderHorizontalNavDashboard user={user} /> */}

        <div className="flex flex-1">
          
          {user?.id ? <HeaderVerticalNavDashboard user={user} /> : null}

          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
