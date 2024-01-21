import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BiHomeCircle,
  BiDetail,
  BiLockOpen,
  BiImage,
  BiShoppingBag,
  BiStoreAlt,
  BiStore,
} from 'react-icons/bi';
import { RiShakeHandsLine } from 'react-icons/ri';
import { useState } from 'react';
import { UserModel } from '@/types/user.type';

export type NavbarProps = {
  title: string;
  href: string;
  status?: boolean;
  description?: string;
  icon?: any;
};
const classIcon = 'flex-shrink-0 w-6 h-6 mr-4';

interface Props {
  user?: UserModel;
}

const VerticalNavUserPublicSite: React.FC<Props> = ({ user }) => {
  const pathname = usePathname();
  const [navigationItems] = useState<NavbarProps[]>([
    {
      title: 'Home',
      status: true,
      href: `/${user?.username}`,
      icon: <BiHomeCircle className={classIcon} />,
    },
    {
      title: 'Gallery',
      status: user?.profile?.enableGallery,
      href: `/${user?.username}/gallery`,
      icon: <BiImage className={classIcon} />,
    },
    {
      title: 'Memberships',
      status: true,
      href: `/${user?.username}/memberships`,
      icon: <BiLockOpen className={classIcon} />,
    },
    {
      title: 'Posts',
      status: true,
      href: `/${user?.username}/posts`,
      icon: <BiDetail className={classIcon} />,
    },
    {
      title: 'Shop',
      status: user?.profile?.enableShop,
      href: `/${user?.username}/shop`,
      icon: <BiStoreAlt className={classIcon} />,
    },
    {
      title: 'Commissions',
      status: user?.profile?.enableCommission,
      href: `/${user?.username}/commissions`,
      icon: <RiShakeHandsLine className={classIcon} />,
    },
  ]);

  const bgColor = `bg-${user?.profile?.color}-600 text-white`;
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item: any, index: number) => {
              // const isActive = pathname.startsWith(item.href);
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={item?.title}
                  className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive ? bgColor : 'text-gray-900 hover:bg-gray-200'
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
