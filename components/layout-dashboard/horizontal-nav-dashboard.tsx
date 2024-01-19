import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { AvatarComponent } from "../ui-setting/ant/avatar-component";
import { ThemeToggle } from "../ui-setting/theme-toggle";

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
      <header className="bg-white dark:bg-[#1c1b22] border-gray-300 sticky top-0 z-20">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 dark:text-white bg-white dark:bg-[#121212] rounded-lg dark:hover:text-gray-500 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-indigo-600"
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
                        : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300"
                        } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}
              </div>
            </div>


            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-6 sm:ml-5">

                <div className="relative">
                  <ThemeToggle />
                </div>

                <div className="relative">
                  {user?.profile ? (
                    <button
                      type="button"
                      className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      <AvatarComponent
                        className="w-9 h-9"
                        profile={user?.profile}
                      />
                      <p className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
                        {user?.profile?.firstName} {user?.profile?.lastName}
                      </p>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavDashboard };
