import Head from "next/head";
import HeaderNav from "./header-nav";
import Main from "./main";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ children, title }: IProps) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME_SITE} | {title}</title>
      </Head>

      <div className="min-h-screen space-y-5">
        <HeaderNav />

        <Main>{children}</Main>
      </div>
    </>
  );
};

export default Layout;
