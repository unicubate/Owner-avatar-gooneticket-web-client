/* eslint-disable jsx-a11y/anchor-is-valid */
import { deleteOneUserAPI } from '@/api-site/user';
import { UserModel } from '@/types/user.type';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useRouter } from 'next/router';
import React from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting/button-input';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  user: UserModel;
};

export const DeleteOneUser: React.FC<Props> = ({ user }) => {
  const { push } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteOneUserAPI({ userId: item?.id });
      AlertSuccessNotification({
        text: 'User deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
      push(`/`);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div className={`mt-8 rounded-lg border bg-red-100 border-red-500 `}>
        <div className="px-4 py-5 sm:p-3">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-2xs flex-1 md:mt-0">
              <p className="text-base font-bold text-gray-600">
                Delete account
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                You can delete your account here. This action is not reversible
              </p>
            </div>
            <div className="mt-4 flex items-center justify-start space-x-6 md:ml-auto md:mt-0 md:justify-end md:space-x-reverse">
              <ActionModalDialog
                title="Delete account?"
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => deleteItem(user)}
                description="Are you sure you want to delete your account?"
                buttonDialog={
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="danger"
                  >
                    Delete account
                  </ButtonInput>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
