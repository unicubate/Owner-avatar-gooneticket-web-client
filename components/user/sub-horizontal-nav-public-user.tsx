import { UserModel } from '@/types/user.type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { NavbarProps } from '../layout-dashboard/vertical-nav-dashboard';

const SubHorizontalNavPublicUser = ({ user }: { user: UserModel }) => {
  const t = useIntl();
  const { query } = useRouter();
  const username = String(query?.username);
  const pathname = usePathname();
  const [navigation] = useState<NavbarProps[]>([
    {
      title: `${t.formatMessage({ id: 'MENU.HOME' })}`,
      status: true,
      count: 1,
      href: `/${username}`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.GALLERY' })}`,
      status: user?.profile?.enableGallery,
      count: user?.gallery?.count,
      href: `/${username}/gallery`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.MEMBERSHIP' })}`,
      status: true,
      count: user?.membership?.count,
      href: `/${username}/memberships`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.POST' })}`,
      status: true,
      count: user?.post?.count,
      href: `/${username}/posts`,
    },
    {
      title: `${t.formatMessage({ id: 'MENU.SHOP' })}`,
      status: user?.profile?.enableShop,
      count: user?.product?.count,
      href: `/${username}/shop`,
    },
  ]);

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap justify-center space-x-8">
          {navigation
            .filter((item) => item?.status === true && Number(item?.count) >= 1)
            .map((item: any, index: number) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item.title}
                  className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                      : `border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-500`
                  } `}
                >
                  {item?.icon}

                  {item?.title}
                </Link>
              );
            })}
        </nav>
      </div>

      {/* <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="w-full pb-1 overflow-x-auto">
              <nav className="flex -mb-px space-x-10">
                {navigation.filter((item) => item?.status === true).map((item: any, index: number) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={index}
                      href={`${item.href}`}
                      title={item.title}
                      className={`py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${isActive
                        ? `text-${user?.profile?.color}-600 border-${user?.profile?.color}-600`
                        : `border-transparent text-gray-500 hover:border-gray-300`
                        } `}
                    >
                      {item?.icon}

                      {item?.title}
                    </Link>
                  );
                })}

              </nav>
            </div>
          </div> */}
    </>
  );
};

export { SubHorizontalNavPublicUser };
