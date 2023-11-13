import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiHomeCircle,
  BiSearch,
  BiDetail,
  BiCog,
  BiWallet,
  BiLockOpen,
  BiBookContent,
  BiShoppingBag,
  BiImage,
  BiHeart,
  BiLayout,
  BiStore,
  BiStoreAlt,
} from "react-icons/bi";
import { RiShakeHandsLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "../util/context-user";
import { ThemeToggle } from "../ui/theme-toggle";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  count?: number;
  icon?: any;
};
const classIcon = "flex-shrink-0 w-5 h-5 mr-4";

const MONETIZE_ITEMS: NavbarProps[] = [
  {
    title: "Donations",
    href: "/donations",
    icon: <BiHeart className={classIcon} />,
  },
  // {
  //   title: "Gift",
  //   href: "/gifts",
  //   icon: <BsGift className={classIcon} />,
  // },
  {
    title: "Memberships",
    href: "/memberships",
    icon: <BiLockOpen className={classIcon} />,
  },
  {
    title: "Commissions",
    href: "/commissions",
    icon: <RiShakeHandsLine className={classIcon} />,
  },
  {
    title: "Shop",
    href: "/shop",
    icon: <BiStoreAlt className={classIcon} />,
  },
];

const SUPPORT_ITEMS = [
  {
    title: "Posts",
    href: "/posts",
    icon: <BiDetail className={classIcon} />,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: <BiImage className={classIcon} />,
  },
];

const SETTINGS_ITEMS = [
  {
    title: "Settings",
    href: "/settings",
    icon: <BiCog className={classIcon} />,
  },
  // {
  //   title: "Integrations",
  //   href: "integrations",
  //   icon: <BiCodeCurly className={classIcon} />,
  // },
];

interface Props {
  user?: any;
}

const VerticalNavDashboard: React.FC<Props> = ({ user }) => {
  
  const router = useRouter();
  const t = useTranslations('dashboard_vertical_menu');
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: `${t('home')}`,
      href: "/dashboard",
      icon: <BiHomeCircle className={classIcon} />,
    },
    {
      title: `${t('your_page')}`,
      href: `/${user?.username}`,
      icon: <BiLayout className={classIcon} />,
    },
    {
      title: "Feed",
      href: "/home",
      icon: <BiBookContent className={classIcon} />,
    },
    {
      title: "Explore",
      href: "/explore",
      icon: <BiSearch className={classIcon} />,
    },
  ]);

  const [monetizeItems] = useState<NavbarProps[]>(MONETIZE_ITEMS);
  const [supportItems] = useState<NavbarProps[]>(SUPPORT_ITEMS);
  const [settingItems] = useState<NavbarProps[]>(SETTINGS_ITEMS);



  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-full px-4 overflow-x-scroll">
        <div className="space-y-4">
          <ThemeToggle />
          <nav className="flex-1 space-y-1">
            {navigationItems.map((item: any, index: number) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                    ? `text-white bg-${user?.profile?.color}-600`
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    } `}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
          </nav>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 dark:text-white uppercase">
              Monetize
            </p>

            <nav className="flex-1 mt-4 space-y-1">
              {monetizeItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <a href="#" title="" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                        Hotjar
                                        <span className="text-xs uppercase ml-auto font-semibold text-indigo-600 bg-indigo-50 border border-indigo-300 rounded-full inline-flex items-center px-2 py-0.5"> New </span>
                                    </a> */}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 dark:text-white uppercase">
              Support
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {supportItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}
            </nav>
          </>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 dark:text-white uppercase">
              Settings
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {settingItems.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              {/* <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `dark:text-white bg-${user?.profile?.color}-600`
                      : "text-black dark:text-white"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link> */}

              <a
                href={void (0)}
                title=""
                onClick={() => logoutUser()}
                className="flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 rounded-lg dark:hover:bg-gray-200 group cursor-pointer"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </a>
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export { VerticalNavDashboard };


