/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOrDeleteOneFollowerAPI } from '@/api-site/follow';
import { UserModel } from '@/types/user.type';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant/avatar-component';

type Props = {
  item?: UserModel;
  index: number;
};

const ListInviteUsers: React.FC<Props> = ({ item, index }) => {
  const { locale } = useRouter();
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
      <div key={index} className="py-5">
        <div className="flex items-center">
          <Link
            href={`/${item?.username}`}
            className="relative shrink-0 cursor-pointer"
          >
            <AvatarComponent size={40} profile={item?.profile} />
          </Link>
          <div className="ml-4 min-w-0 flex-1">
            <Link href={`/${item?.username}`}>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
                {item?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
                {item?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </Link>
          </div>

          <div className="ml-auto flex items-center justify-end space-x-8">
            <ButtonInput
              size="sm"
              type="button"
              variant="ghost"
              loading={loading}
              onClick={() => followingItem(item)}
            >
              Invite
            </ButtonInput>
          </div>
        </div>
      </div>
    </>
  );
};

export { ListInviteUsers };
