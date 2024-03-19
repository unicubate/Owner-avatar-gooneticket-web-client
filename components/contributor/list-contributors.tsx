'use client';

import {
  CreateOrUpdateOneContributorAPI,
  DeleteOneContributorAPI,
} from '@/api-site/contributor';
import { ContributorModel } from '@/types/contributor';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { MailPlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { UpdateRoleContributorModal } from './update-role-contributor-modal';

type Props = {
  item?: ContributorModel;
  index: number;
};

export function ListContributors({ item, index }: Props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const { locale } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, setHasErrors, userStorage } =
    useInputState();

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneContributorAPI({
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
        text: 'Contributor deleted successfully',
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
        role: 'MODERATOR',
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
          <AvatarComponent size={50} profile={item?.profile} />
          <div className="ml-2 min-w-0 flex-1">
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

            <div className="mt-1">
              <Badge className="rounded-sm cursor-pointer" variant="default">
                {item?.role?.name}
              </Badge>
              <Badge
                className="ml-2 rounded-sm cursor-pointer"
                variant={`${item?.confirmedAt ? 'success' : 'destructive'}`}
              >
                {item?.confirmedAt ? 'CONFIRM' : 'PENDING'}
              </Badge>
            </div>
          </div>

          {item?.userId !== userStorage?.id ? (
            <div className="py-1 text-right text-sm font-medium">
              {!item?.confirmedAt && (
                <ActionModalDialog
                  title="Resend invitation?"
                  loading={loading}
                  isOpen={isResend}
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
              )}

              {userStorage?.role?.name === 'ADMIN' ? (
                <>
                  <UpdateRoleContributorModal
                    buttonDialog={
                      <ButtonInput
                        variant="ghost"
                        type="button"
                        size="icon"
                        icon={
                          <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                        }
                      />
                    }
                    contributor={item}
                    showModal={isUpdate}
                    setShowModal={setIsUpdate}
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
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
