import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { ThemeToggle } from '../ui-setting/theme-toggle';

export type NavbarProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const NAVIGATION_ITEMS: NavbarProps[] = [
  {
    title: 'Explore',
    href: '/explore',
  },
  {
    title: 'Faq',
    href: '/faqs',
  },
  {
    title: 'about',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact-us',
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
      <header className="sticky top-0 z-20 border-gray-300 bg-white dark:bg-[#1c1b22]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="-m-2 flex items-center xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-[#121212] dark:text-white dark:hover:bg-gray-100 dark:hover:text-gray-500 dark:focus:ring-indigo-600"
              >
                <svg
                  className="size-6"
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

            <div className="ml-6 mr-auto flex xl:ml-0">
              {/* <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                {NAVIGATION_ITEMS.map((item: any, index: number) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item?.title}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm  font-medium transition-all duration-200${isActive
                        ? `text-${user?.profile?.color ?? "indigo"
                        }-600 border-${user?.profile?.color ?? "indigo"
                        }-600`
                        : "border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300"
                        } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}
              </div> */}
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
                      className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                      <AvatarComponent
                        className="size-9"
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
