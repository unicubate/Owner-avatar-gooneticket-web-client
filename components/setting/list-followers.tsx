/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { FollowModel } from '@/types/follow';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';

type Props = {
  item?: FollowModel;
  index: number;
  refetch?: any;
};

const ListFollowers = ({ item, index, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrDeleteOneFollowerAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const followingItem = async (item: any) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        followerId: item?.profile?.userId,
        action: 'CREATE',
      });
      setHasErrors(false);
      setLoading(false);
      refetch();
      AlertSuccessNotification({
        text: 'Followed successfully',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <Fragment key={index}>
        <div className="py-5">
          <div className="flex items-center">
            <Link
              href={`/${item?.profile?.username}`}
              className="relative shrink-0 cursor-pointer"
            >
              <AvatarComponent size={40} profile={item?.profile} />
            </Link>

            <Link
              href={`/${item?.profile?.username}`}
              className="ml-4 min-w-0 flex-1 cursor-pointer"
            >
              <p className="text-sm font-bold dark:text-white">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {item?.profile?.username}
              </p>
            </Link>

            <div className="ml-auto flex items-center justify-end space-x-8">
              <ButtonInput
                size="sm"
                type="button"
                variant="info"
                loading={loading}
                onClick={() => followingItem(item)}
              >
                Follow back
              </ButtonInput>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export { ListFollowers };
