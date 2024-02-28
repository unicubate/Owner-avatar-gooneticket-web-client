import { UserModel } from '@/types/user.type';
import { useTranslations } from 'next-intl';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';

export function HorizontalNavPublicUser(props: { user: UserModel }) {
  const { user } = props;
  const t = useTranslations();

  return (
    <>
      <div className="flex max-w-xs items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
        <AvatarComponent className="size-10" profile={user?.profile} />
        <div className="ml-2 min-w-0 flex-1">
          <p className="w-auto hidden text-sm font-bold text-gray-900 dark:text-white lg:block">
            {user?.profile?.firstName} {user?.profile?.lastName}
          </p>
          <p className="mt-1 hidden text-sm font-medium text-gray-600 lg:block">
            <span>
              {user?.totalSubscribe} {t('subscribes')}
            </span>
            {' - '}
            <span>
              {user?.totalFollower ?? 0} {t('followers')}
            </span>
          </p>
        </div>
      </div>
      {/* <div className="text-center">
        <AvatarComponent
          size={{ xs: 70, sm: 70, md: 70, lg: 84, xl: 80, xxl: 100 }}
          profile={user?.profile}
        />

        <p className="mt-6 text-lg font-bold dark:text-white">
          {user?.profile?.firstName ?? ''} {user?.profile?.lastName ?? ''}{' '}
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500">
          <span>
            {user?.totalFollower ?? 0} {t('followers')}
          </span>
          <span className="ml-2">
            {user?.totalFollowing ?? 0} {t('followings')}
          </span>
        </p>

        {user?.totalSubscribe > 0 ? (
          <p className="mt-2 text-sm font-medium text-gray-500">
            {user?.totalSubscribe} {t('subscribes')}
          </p>
        ) : null}

        <ButtonInput className="mt-4" type="button" variant="danger">
          Free membership
        </ButtonInput>
      </div> */}
    </>
  );
}
