import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavbarSiteProps } from '.';
import { useInputState } from '@/components/hooks';

const VerticalNavSite = () => {
  const { t } = useInputState();
  const router = useRouter();
  const pathname = usePathname();
  const [navigation] = useState<NavbarSiteProps[]>([
    {
      title: 'AUTH.GENERAL.CONTACT',
      href: '/contact-us',
    },
  ]);

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-between overflow-x-scroll px-4">
        <div className="space-y-4">
          <nav className="flex-1 space-y-2">
            {navigation.map((item: any, index: number) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={`${item.href}`}
                  title={t.formatMessage({ id: item?.title })}
                  className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700`}
                >
                  {item?.icon}
                  {t.formatMessage({ id: item?.title })}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export { VerticalNavSite };
