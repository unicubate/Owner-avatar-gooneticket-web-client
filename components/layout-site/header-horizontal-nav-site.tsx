import { useState } from "react";
import { Avatar, Button, Drawer, Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../util/session/context-user";
import { VerticalNavDashboard } from "../layout-dashboard/vertical-nav-dashboard";

interface Props {
  user?: any;
}

const HeaderHorizontalNavSite: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      <header className="bg-white border-[1px] border-gray-300 sticky top-0 z-20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <div className="flex ml-6 mr-auto xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <Image
                  preview={false}
                  className="block w-auto h-8 lg:hidden"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                  alt=""
                />
                <Image
                  className="hidden w-auto h-8 lg:block"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                  alt=""
                />
              </div>

              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                {/* <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600"
                >
                  {" "}
                  Dashboard{" "}
                </a> */}
                <Link
                  href="/explore"
                  title="Explore"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900"
                >
                  Explore
                </Link>

                <Link
                  href="/faqs"
                  title="Faq"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900"
                >
                  Faq
                </Link>

                <Link
                  href="/about"
                  title="Explore"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900"
                >
                  About
                </Link>

                {/* <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900"
                >
                  {" "}
                  Customers{" "}
                </a>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-900"
                >
                  {" "}
                  Support{" "}
                </a> */}
              </div>
            </div>

            <div className="flex items-center justify-end">
              {/* <div className="flex-1 hidden max-w-xs ml-auto lg:block">
                    <label className="sr-only"> Search </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <input type="search" name="" id="" className="block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                    </div>
                </div> */}

              <div className="flex items-center space-x-6 sm:ml-5">
                {user?.id ? (
                  <>
                    <div className="relative">
                      <button
                        type="button"
                        className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                        {" "}
                        2{" "}
                      </span>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                      >
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </button>
                      <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                        {" "}
                        6{" "}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      <Avatar
                        className="object-cover bg-gray-300 rounded-full w-9 h-9"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/horizontal-menu/3/avatar-male.png"
                        alt=""
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Button
                        onClick={() => {
                          router.push(`${`/login`}`);
                        }}
                        size="middle"
                      >
                        Log In
                      </Button>
                    </div>
                    <div className="relative">
                      <Button
                        onClick={() => {
                          router.push(`${`/register`}`);
                        }}
                        size="middle"
                        type="primary"
                        danger
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <Drawer title="" placement="right" closable={true} onClose={onClose} open={open}>
        <div className="flex flex-col pt-5 overflow-y-auto">
          <VerticalNavDashboard user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavSite };
