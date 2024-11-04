import { UserModel } from '@/types/user';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../util/context-user';

import { logoutUsersAPI } from '@/api-site/user';
import { DropdownMenuContentUser } from '@/components/ui-setting';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GripIcon } from 'lucide-react';
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
      <header className="sticky top-0 z-20 h-16 items-center gap-4 border-b border-gray-100 bg-white dark:border-input dark:bg-background">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="-m-3 flex items-center lg:hidden">
              <Button
                onClick={showDrawer}
                type="button"
                variant="ghost"
                className="bg-white text-gray-700 hover:text-gray-900 dark:bg-background dark:hover:text-white"
              >
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </Button>
            </div>

            <div className="ml-2 flex xl:ml-0">
              {user?.id ? <HorizontalNavPublicUser user={user} /> : null}
            </div>

            {/* <div className="ml-auto flex items-center justify-center">
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
            </div> */}

            <div className="ml-auto flex items-center justify-end">
              <div className="flex items-center space-x-1.5">
                {/* <div className="py-2 sm:mt-0">
                  {userVisiter?.id !== user?.id ? (
                    <CreateConversationForm item={user} />
                  ) : null}
                </div>
                <div className="py-2 sm:mt-0">
                  {userVisiter?.organizationId !== user?.organizationId ? (
                    <CreateOrUpdateFormFollow item={user} />
                  ) : null}
                </div> */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className="bg-white text-gray-700 hover:text-gray-900 dark:bg-background dark:hover:text-white"
                    >
                      <GripIcon className="size-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContentUser username={username ?? ''} />
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HorizontalNavUserPublicSite };
