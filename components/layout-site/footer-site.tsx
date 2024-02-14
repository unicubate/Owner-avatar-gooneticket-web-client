import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ButtonInput } from '../ui-setting';

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

const FooterSite: React.FC<Props> = ({ user, showDrawer }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-20 border-gray-300 bg-white dark:bg-[#121212]',
        )}
      >
        <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8')}>
          <div className={cn('flex h-16 justify-between')}>
            <div className={cn('-m-2 flex items-center xl:hidden')}>
              <button
                onClick={showDrawer}
                type="button"
                className={cn(
                  'inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-[#121212] dark:text-white dark:hover:bg-gray-100 dark:hover:text-gray-500 dark:focus:ring-indigo-600',
                )}
              >
                <svg
                  className={cn('size-6')}
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

            <div className={cn('ml-6 mr-auto flex xl:ml-0')}>
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

              <div
                className={cn('hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10')}
              >
                {NAVIGATION_ITEMS.map((item: any, index: number) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item?.title}
                      className={cn(
                        `inline-flex items-center border-b-2 px-1 pt-1 text-sm  font-medium transition-all duration-200${
                          isActive
                            ? `text-${
                                user?.profile?.color ?? 'indigo'
                              }-600 border-${
                                user?.profile?.color ?? 'indigo'
                              }-600`
                            : 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300'
                        } `,
                      )}
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

            <div className={cn('flex items-center justify-end')}>
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

              <div className={cn('flex items-center space-x-6 sm:ml-5')}>
                <div className="relative">
                  <ButtonInput
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      router.push(`${user?.profile ? `/dashboard` : `/login`}`);
                    }}
                  >
                    Log In
                  </ButtonInput>
                </div>
                <div className="relative">
                  <ButtonInput
                    type="button"
                    variant="info"
                    onClick={() => {
                      router.push(`${user?.profile ? `/dashboard` : `/login`}`);
                    }}
                  >
                    Sign Up
                  </ButtonInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { FooterSite };
