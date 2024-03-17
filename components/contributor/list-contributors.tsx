'use client';

import {
  CreateOneContributorAPI,
  DeleteOneContributorAPI,
} from '@/api-site/contributor';
import { ContributorModel } from '@/types/contributor';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { MailPlusIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: ContributorModel;
  index: number;
};

export function ListContributors({ item, index }: Props) {
  const [IsResend, setIsResend] = useState(false);
  const { locale } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, setHasErrors, userStorage } =
    useInputState();

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOneContributorAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const { mutateAsync: saveMutationDelete } = DeleteOneContributorAPI({
    onSuccess: () => {},
    onError: (error?: any) => {
      setHasErrors(error.response.data.message);
    },
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutationDelete({ contributorId: item?.id });
      AlertSuccessNotification({
        text: 'Post deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const inviteItem = async (item: any) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        userId: item?.userId,
        action: 'INVITED',
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Invitation send successfully',
      });
      setIsResend(false);
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
      <div key={index} className="py-4">
        <div className="flex items-center">
          <AvatarComponent size={40} profile={item?.profile} />
          <div className="ml-4 min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {item?.profile?.firstName} {item?.profile?.lastName}
            </p>
            <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
              {item?.profile?.email}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
              {item?.profile?.email}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
              {formateFromNow(item?.createdAt as Date, locale as string)}
            </p>
          </div>

          {item?.userId !== userStorage?.id ? (
            <div className="py-1 text-right text-sm font-medium">
              <ActionModalDialog
                title="Resend invitation?"
                loading={loading}
                isOpen={IsResend}
                setIsOpen={setIsResend}
                onClick={() => inviteItem(item)}
                variant="info"
                description="Are you sure you want to resend invitation in this user?"
                buttonDialog={
                  <ButtonInput
                    variant="ghost"
                    type="button"
                    size="icon"
                    icon={
                      <MailPlusIcon className="size-4 text-gray-600 hover:text-yellow-600" />
                    }
                  />
                }
              />

              <ActionModalDialog
                title="Delete?"
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => deleteItem(item)}
                description="Are you sure you want to delete this?"
                buttonDialog={
                  <ButtonInput
                    variant="ghost"
                    type="button"
                    size="icon"
                    icon={
                      <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    }
                  />
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
