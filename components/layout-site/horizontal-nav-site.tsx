import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavbarSiteProps } from '.';
import { ButtonInput, ThemeToggle } from '../ui-setting';
import { Button } from '../ui/button';

interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavSite = ({ user, showDrawer }: Props) => {
  const [navigation] = useState<NavbarSiteProps[]>([
    // {
    //   title: 'Explore',
    //   href: '/explore',
    // },
    {
      title: 'Faq',
      href: '/faqs',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact-us',
    },
  ]);
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 lg:hidden">
              <Button onClick={showDrawer} type="button" variant="ghost">
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
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="flex ml-2 xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <div className="block w-auto h-8 lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>

                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 hidden w-auto h-8 lg:block">
                  <div className="flex items-center">
                    <div
                      onClick={() => push('/')}
                      className="relative shrink-0 cursor-pointer"
                    >
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden w-auto ml-4 space-x-10 lg:block">
              {navigation.map((item: any, index: number) => {
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={`${item?.href}`}
                    title={item?.title}
                    className={`whitespace-nowrap py-4 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? `text-indigo-600 `
                        : `border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300`
                    } `}
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end ml-auto space-x-2">
              <div className="flex items-center">
                <ThemeToggle />
              </div>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="ghost"
                  onClick={() => {
                    push(`${user?.id ? `/dashboard` : `/login`}`);
                  }}
                >
                  Log In
                </ButtonInput>
              </div>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="info"
                  onClick={() => {
                    push(`${user?.id ? `/dashboard` : `/register`}`);
                  }}
                >
                  Sign Up
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavSite };
