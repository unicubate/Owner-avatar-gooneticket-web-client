import { UserModel } from '@/types/user.type';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { CreateModalPublicDonation } from '../donation/create-modal-public-donation';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';
import { CreateOrUpdateFormFollow } from '../like-follow/create-or-update-form-follow';
import { ButtonInput } from '../ui-setting';
import { ThemeToggle } from '../ui-setting/theme-toggle';
import { logoutUser, useAuth } from '../util/context-user';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/router';

interface Props {
  user?: UserModel;
  showDrawer?: () => void;
}

const HorizontalNavUserPublicSite: React.FC<Props> = ({ user, showDrawer }) => {
  const t = useTranslations('menu-site');
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { userStorage: userVisiter } = useAuth() as any;
  const pathname = usePathname();
  const username = user?.username;
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t('home')}`,
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: `${t('gallery')}`,
      status: user?.profile?.enableGallery,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: `${t('memberships')}`,
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: `${t('posts')}`,
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: `${t('shop')}`,
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
    {
      title: `${t('commissions')}`,
      status: user?.profile?.enableCommission,
      count: user?.commission?.count,
      href: `/${username}/commissions`,
    },
  ]);

  return (
    <>
      <header className="sticky top-0 z-20 border-gray-300 bg-white dark:bg-[#1c1b22]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="ml-6 mr-auto flex xl:ml-0">
              <div className="hidden sm:-my-px sm:ml-8 xl:flex xl:space-x-10">
                <nav className="-mb-px flex space-x-10">
                  {navigation
                    .filter(
                      (item) =>
                        item?.status === true && Number(item?.count) >= 1,
                    )
                    .map((item: any, index: number) => {
                      const isActive = pathname === item.href;
                      // const isActive = pathname.startsWith(item.href);
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
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-2 sm:ml-5">
                <div className="relative">
                  <ThemeToggle />
                </div>

                {userVisiter?.id !== user?.id ? (
                  <>
                    <ButtonInput
                      // color={user?.profile?.color as ColorType}
                      type="button"
                      variant="info"
                      onClick={() => setOpenModal(true)}
                      icon={<BiCoffeeTogo className="mr-2 size-5" />}
                    >
                      Donate
                    </ButtonInput>
                    <CreateOrUpdateFormFollow item={user} />
                  </>
                ) : null}
                {userVisiter?.id ? (
                  <div className="-m-2 flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="link"
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
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => push(`/dashboard`)}>
                            <span className="cursor-pointer">
                              {t('dashboard')}
                            </span>
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                          <span className="cursor-pointer">Invite</span>
                        </DropdownMenuItem> */}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logoutUser()}>
                          <span className="cursor-pointer">{t('logout')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {openModal ? (
        <CreateModalPublicDonation
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
        />
      ) : null}
    </>
  );
};

export { HorizontalNavUserPublicSite };
