import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavbarSiteProps } from '.';
import { ButtonInput } from '../ui-setting';
import { Button } from '../ui/button';

interface Props {
  user?: any;
  showDrawer?: () => void;
}

const HorizontalNavSite = ({ user, showDrawer }: Props) => {
  const [navigation] = useState<NavbarSiteProps[]>([
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
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-black/5">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button onClick={showDrawer} type="button" variant="ghost">
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
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              <Link href="/">
                <div className="flex shrink-0 items-center">
                  <div className="block h-8 w-auto lg:hidden">
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
                  <div className="hidden h-8 w-auto lg:block">
                    {/* <div className="flex items-center">
                    <div
                      onClick={() => push('/')}
                      className="relative shrink-0 cursor-pointer"
                    >
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>
                  </div> */}
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
                </div>
              </Link>
            </div>

            <div className="ml-auto flex items-center justify-end space-x-2">
              <nav className="ml-4 hidden w-auto space-x-10 lg:block">
                {navigation.map((item: any, index: number) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={index}
                      href={`${item?.href}`}
                      title={item?.title}
                      className={`whitespace-nowrap border-transparent py-4 text-sm font-medium transition-all duration-200 hover:text-indigo-600`}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}
              </nav>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    push(`${user?.id ? `/orders` : `/login`}`);
                  }}
                >
                  Log In
                </ButtonInput>
              </div>
              <div className="relative">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    push(`${user?.id ? `/orders` : `/register`}`);
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
