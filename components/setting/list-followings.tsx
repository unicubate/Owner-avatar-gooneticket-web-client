/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { FollowModel } from '@/types/follow';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: FollowModel;
  index: number;
  refetch: any;
};

const ListFollowings: React.FC<Props> = ({ item, index, refetch }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, hasErrors, setHasErrors } =
    useInputState();

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

  const followerItem = async (item: any) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        followerId: item?.profile?.userId,
        action: 'DELETE',
      });
      setHasErrors(false);
      setLoading(false);
      setIsOpen(false);
      refetch();
      AlertSuccessNotification({
        text: 'Unfollowing successfully',
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
      });
    }
  };

  return (
    <>
      <Fragment key={index}>
        <div className="py-5">
          <div className="flex items-center">
            <div
              onClick={() => router.push(`/${item?.profile?.username}`)}
              className="relative shrink-0 cursor-pointer"
            >
              <AvatarComponent size={40} profile={item?.profile} />
            </div>

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
              <ActionModalDialog
                title="Unfollowing?"
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => followerItem(item)}
                description={`Are you sure you want to unfollow ${
                  item?.profile?.firstName ?? ''
                } ${item?.profile?.lastName ?? ''}`}
                buttonDialog={
                  <ButtonInput size="sm" type="button" variant="outline">
                    UnFollow
                  </ButtonInput>
                }
              />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export { ListFollowings };
