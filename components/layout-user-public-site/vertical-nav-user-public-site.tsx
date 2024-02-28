import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  count?: number;
  icon?: any;
};

interface Props {
  user?: any;
}

const VerticalNavUserPublicSite: React.FC<Props> = ({ user }) => {
  const t = useTranslations('menu-site');
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
      status: true,
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
  const bgColor = `bg-${user?.profile?.color}-600 text-white`;
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigation
              .filter(
                (item) => item?.status === true && Number(item?.count) >= 1,
              )
              .map((item: any, index: number) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? bgColor
                        : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
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
    </>
  );
};

export { VerticalNavUserPublicSite };
