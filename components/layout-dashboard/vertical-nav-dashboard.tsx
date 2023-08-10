import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BiHomeCircle,
  BiSearch,
  BiMessageRoundedDots,
  BiDetail,
  BiCog,
  BiCodeCurly,
  BiLockOpen,
} from "react-icons/bi";
import { FiList } from "react-icons/fi";
import { TfiGallery } from "react-icons/tfi";
import { VscOpenPreview } from "react-icons/vsc";
import { BsGift, BsShop } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";

export type NavbarProps = {
  title: string;
  href: string;
  icon?: any;
};
const classIcon = "flex-shrink-0 w-5 h-5 mr-4";

const NAVIGATION_ITEMS: NavbarProps[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <BiHomeCircle className={classIcon} />,
  },
  {
    title: "Your Page",
    href: "/",
    icon: <VscOpenPreview className={classIcon} />,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: <BiSearch className={classIcon} />,
  },
];

const MONETIZE_ITEMS: NavbarProps[] = [  
  {
    title: "Donations",
    href: "/donations",
    icon: <MdOutlineFavoriteBorder className={classIcon} />,
  },
  {
    title: "Gift",
    href: "/gifts",
    icon: <BsGift className={classIcon} />,
  },
  {
    title: "Memberships",
    href: "/memberships",
    icon: <BiLockOpen className={classIcon} />,
  },
];

const SUPPORT_ITEMS = [
  {
    title: "Payments History",
    href: "/payments-history",
    icon: <FiList className={classIcon} />,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <BiMessageRoundedDots className={classIcon} />,
  },
  {
    title: "My Supporters",
    href: "/supporters",
    icon: <TbUsersGroup className={classIcon} />,
  },
  {
    title: "Articles",
    href: "/articles",
    icon: <BiDetail className={classIcon} />,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: <TfiGallery className={classIcon} />,
  },
];

const SETTINGS_ITEMS = [
  {
    title: "Shops",
    href: "/shops",
    icon: <BsShop className={classIcon} />,
  },
  {
    title: "Integrations",
    href: "aIntegrations",
    icon: <BiCodeCurly className={classIcon} />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <BiCog className={classIcon} />,
  },
];

interface Props {
  user?: any;
}

const VerticalNavDashboard: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col justify-between flex-1 h-full px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-1">
            {NAVIGATION_ITEMS.map((item: any, index: number) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title=""
                  className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                    ? `text-white bg-${user?.profile?.color}-600`
                    : "hover:bg-gray-200 text-gray-900"
                    } `}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
          </nav>

          <>
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Monetize
            </p>

            <nav className="flex-1 mt-4 space-y-1">
              {MONETIZE_ITEMS.map((item: any, index: number) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title=""
                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 text-gray-900"
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
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Support
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {SUPPORT_ITEMS.map((item: any, index: number) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title=""
                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 text-gray-900"
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
            <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Settings
            </p>
            <nav className="flex-1 mt-4 space-y-1">
              {SETTINGS_ITEMS.map((item: any, index: number) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title=""
                    className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 group rounded-lg ${isActive
                      ? `text-white bg-${user?.profile?.color}-600`
                      : "hover:bg-gray-200 text-gray-900"
                      } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}

              <a
                href="#"
                title=""
                className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
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

        {/* <div className="pb-4 mt-12">
                            <nav className="flex-1 space-y-1">

                                <a href="#" title="" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group">
                                    <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </a>
                            </nav>
                        </div> */}
      </div>
    </>
  );
};

export { VerticalNavDashboard };
