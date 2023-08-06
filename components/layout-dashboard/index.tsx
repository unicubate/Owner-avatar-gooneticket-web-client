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
          {process.env.NEXT_PUBLIC_NAME_SITE} | {title}
        </title>
      </Head>

      <div className="flex flex-col">
        <HeaderHorizontalNavDashboard user={user} />

        <div className="flex flex-1">

          <HeaderVerticalNavDashboard user={user}  />


          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
