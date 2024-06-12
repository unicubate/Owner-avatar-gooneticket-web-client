import { UserModel } from '@/types/user';
import { capitalizeFirstLetter } from '@/utils/utils';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { AvatarImageComponent } from '../ui-setting/ant';

const HorizontalNavPublicUser = ({ user }: { user: UserModel }) => {
  const t = useIntl();

  return (
    <>
      <div className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
        <div className="hidden lg:block">
          <Link href={`/${user?.username}`}>
            <AvatarImageComponent
              preview={false}
              className="size-10 rounded-md"
              profile={user?.profile}
            />
          </Link>
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <Link href={`/${user?.username}`}>
            <p className="hidden w-auto text-sm font-bold text-gray-900 dark:text-white lg:block">
              {capitalizeFirstLetter(user?.organization?.name)}
            </p>
          </Link>

          <p className="mt-1 hidden text-sm font-medium text-gray-600 lg:block">
            <span>
              {user?.totalFollower ?? 0}{' '}
              {t.formatMessage({ id: 'MENU.FOLLOWER' })}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export { HorizontalNavPublicUser };
