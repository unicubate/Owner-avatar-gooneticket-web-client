import { useInputState } from '@/components/hooks';
import {
  DropdownMenuContentUser,
  ImageLogo,
  ThemeToggle,
} from '@/components/ui-setting';
import { AvatarComponent } from '@/components/ui-setting/';
import { LangToggle } from '@/components/ui-setting/lang-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalizeFirstLetter } from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavbarProps } from '.';

interface Props {
  showDrawer?: () => void;
}

const HorizontalNavDashboard = ({ showDrawer }: Props) => {
  const { push, pathname } = useRouter();
  const { t, linkHref, userStorage: user } = useInputState();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.EVENT' })}`,
      count: 1,
      href: '/events',
    },
    {
      title: `${t.formatMessage({ id: 'MENU.ORDER' })}`,
      count: 1,
      href: '/orders',
    },
    {
      title: `${t.formatMessage({ id: 'MENU.AFFILIATE' })}`,
      count: user?.affiliation?.count,
      href: `/affiliates`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.MESSAGE' })}`,
      count: 1,
      href: '/messages',
    },
  ]);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 items-center gap-4 border-b border-gray-100 bg-background dark:border-input">
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
              <div className="flex shrink-0 items-center">
                <div className="block h-8 w-auto lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <ImageLogo />
                    </div>
                  </div>
                </div>
                <div className="ml-4 hidden h-8 w-auto lg:block">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <ImageLogo />
                    </div>
                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {user ? (
              <div className="ml-auto flex items-center justify-center">
                <nav className="ml-4 hidden w-auto space-x-10 lg:block">
                  {navigation
                    .filter((i) => Number(i.count) >= 1)
                    .map((item: any, index: number) => {
                      //const isActive = pathname === item.href;
                      const isActive = pathname?.startsWith(item.href);
                      return (
                        <Link
                          key={index}
                          href={`${item?.href}`}
                          title={item?.title}
                          className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? `border-blue-700 text-blue-700`
                              : `border-transparent hover:border-blue-600 hover:text-blue-600`
                          } `}
                        >
                          {item?.icon}

                          {item?.title}
                        </Link>
                      );
                    })}
                </nav>
              </div>
            ) : null}

            <div className="ml-auto flex items-center justify-end">
              <ThemeToggle />
              <LangToggle />
              <div className="items-end">
                {/* <ThemeToggle /> */}
                {user?.profile ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="flex max-w-xs items-center gap-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                          <AvatarComponent
                            className="size-9"
                            profile={user?.profile}
                          />

                          <div className="sr-only ml-2 flex flex-col items-start justify-center sm:not-sr-only">
                            <div
                              className="line-clamp-1 text-sm font-bold"
                              title={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                            >
                              {capitalizeFirstLetter(user?.profile?.firstName)}{' '}
                              {capitalizeFirstLetter(user?.profile?.lastName)}
                            </div>
                            <div className="line-clamp-1 text-xs font-normal text-gray-500">
                              {user?.email}
                            </div>
                          </div>
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContentUser />
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavDashboard };
