import Head from "next/head";
import { HeaderHorizontalNavDashboard } from "./header-horizontal-nav-dashboard";
import { HeaderVerticalNavDashboard } from "./header-vertical-nav-dashboard";
import { useContext } from "react";


interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutDashboard = ({ children, title }: IProps) => {
  // console.log('user =====>',user)
  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_NAME_SITE} | {title}
        </title>
      </Head>

      <div className="flex flex-col">
        <HeaderHorizontalNavDashboard  />

        <div className="flex flex-1">
          <HeaderVerticalNavDashboard  />

          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDashboard;
