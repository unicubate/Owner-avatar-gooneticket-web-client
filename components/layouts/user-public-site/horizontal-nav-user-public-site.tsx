import { UserModel } from '@/types/user';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../util/context-user';

import { logoutUsersAPI } from '@/api-site/user';
import { CopyShareLink, ThemeToggle } from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertCircleIcon,
  LogOutIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { HorizontalNavPublicUser } from '../../user/horizontal-nav-public-user';
import { NavbarProps } from '../dashboard';

interface Props {
  user?: UserModel;
  showDrawer?: () => void;
}

const HorizontalNavUserPublicSite = ({ user, showDrawer }: Props) => {
  const t = useIntl();
  const { push } = useRouter();
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const pathname = usePathname();
  const username = user?.username;
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.HOME' })}`,
      count: 1,
      href: `/${username}`,
    },
    // {
    //   title: `${t.formatMessage({ id: 'MENU.EVENT' })}`,
    //   count: 1,
    //   href: `/${username}/events`,
    // },
    // {
    //   title: `${t.formatMessage({ id: 'MENU.GALLERY' })}`,
    //   count: user?.gallery?.count,
    //   href: `/${username}/gallery`,
    // },
    // {
    //   title: `${t.formatMessage({ id: 'MENU.MEMBERSHIP' })}`,
    //   count: user?.membership?.count,
    //   href: `/${username}/memberships`,
    // },
    // {
    //   title: `${t.formatMessage({ id: 'MENU.POST' })}`,
    //   count: user?.post?.count,
    //   href: `/${username}/posts`,
    // },
    // {
    //   title: `${t.formatMessage({ id: 'MENU.SHOP' })}`,
    //   count: user?.product?.count,
    //   href: `/${username}/shop`,
    // },
  ]);

  const logoutUserItem = async () => {
    await logoutUsersAPI();
    push(`/login`);
    location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 items-center gap-4 border-b border-gray-300 bg-white dark:border-gray-800 dark:bg-[#1c1b22]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button
                onClick={showDrawer}
                type="button"
                variant="ghost"
                className="bg-white text-gray-700 hover:text-gray-900 dark:bg-[#1c1b22] dark:hover:text-white"
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
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              {user?.id ? <HorizontalNavPublicUser user={user} /> : null}
            </div>

            <div className="ml-auto flex items-center justify-center">
              <nav className="ml-4 hidden w-auto space-x-10 lg:block">
                {navigation.map((item: any, index: number) => {
                  const isActive = pathname === item.href;
                  // const isActive = pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={index}
                      href={`${item?.href}`}
                      title={item?.title}
                      className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                          : `border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-300`
                      } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="ml-auto flex items-center justify-end">
              <div className="flex items-center">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="-m-3 bg-white text-gray-700 hover:text-gray-900 dark:bg-[#1c1b22] dark:hover:text-white"
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
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 dark:border-gray-800 dark:bg-[#1c1b22]">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setCopied(true)}>
                        <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                        <span className="ml-2 cursor-pointer hover:text-indigo-600">
                          {t.formatMessage({ id: 'UTIL.SHARE' })}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => push(`/orders`)}>
                        <AlertCircleIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                        <span className="ml-2 cursor-pointer hover:text-indigo-600">
                          {t.formatMessage({ id: 'UTIL.REPORT' })}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    {userVisiter?.id ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/orders`)}>
                            <ShoppingCartIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              {t.formatMessage({ id: 'MENU.ORDER' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/settings`)}>
                            <SettingsIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                            <span className="ml-2 cursor-pointer hover:text-indigo-600">
                              {t.formatMessage({ id: 'MENU.SETTING' })}
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUserItem()}>
                          <LogOutIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                          <span className="ml-2 cursor-pointer hover:text-indigo-600">
                            {t.formatMessage({ id: 'MENU.LOGOUT' })}
                          </span>
                        </DropdownMenuItem>
                      </>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/${username}`}
      />
    </>
  );
};

export { HorizontalNavUserPublicSite };
