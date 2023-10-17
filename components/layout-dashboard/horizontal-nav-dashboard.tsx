import Link from "next/link";
import { BiHomeCircle, BiSearch, BiBookContent } from "react-icons/bi";
import { VscOpenPreview } from "react-icons/vsc";
import { useRouter } from "next/router";
import { Avatar, Button, Image } from "antd";
import { usePathname } from "next/navigation";
import { getCurrentUserFormToken } from "../util/context-user";
import { useState } from "react";
import { AvatarComponent } from "../ui/avatar-component";

export type NavbarProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const NAVIGATION_ITEMS: NavbarProps[] = [
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Faq",
    href: "/faqs",
  },
  {
    title: "about",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact-us",
  },
];

interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavDashboard: React.FC<Props> = ({ user, showDrawer }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header className="dark:bg-white border-[1px] dark:border-gray-300 sticky top-0 z-20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center p-2 dark:text-gray-400 dark:bg-white rounded-lg dark:hover:text-gray-500 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-indigo-600"
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
              {/* <div className="flex items-center flex-shrink-0">
                <Image
                  preview={false}
                  className="block w-auto h-8 lg:hidden"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                  alt=""
                />
                <Image
                  preview={false}
                  className="hidden w-auto h-8 lg:block"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                  alt=""
                />
              </div> */}

              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                {NAVIGATION_ITEMS.map((item: any, index: number) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item?.title}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium  transition-all duration-200 border-b-2  ${isActive
                          ? `text-${user?.profile?.color ?? "indigo"
                          }-600 border-${user?.profile?.color ?? "indigo"
                          }-600`
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-900"
                        } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}

                {/* <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600"
                >
                  {" "}
                  Dashboard{" "}
                </a> */}

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

              <div className="flex items-center space-x-6 sm:ml-5">

                {/* <div className="relative">
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
                </div> */}
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  <AvatarComponent
                    profile={user?.profile}
                    className="object-cover bg-gray-300 rounded-full w-9 h-9"
                  />
                  <p className="ml-1 text-sm font-bold text-gray-900">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavDashboard };
