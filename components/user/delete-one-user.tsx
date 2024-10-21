/* eslint-disable jsx-a11y/anchor-is-valid */
import { deleteOneUserAPI, logoutUsersAPI } from '@/api-site/user';
import { UserModel } from '@/types/user';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting/button-input';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  user: UserModel;
};

const DeleteOneUser = ({ user }: Props) => {
  const { push } = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteOneUserAPI({ userId: item?.id });
      await logoutUsersAPI();
      AlertSuccessNotification({
        description: 'User deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
      push(`/`);
      location.reload();
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div className="border-input mt-4 flex flex-row rounded-md border p-3 border-red-500 bg-red-100">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-600">Delete account</p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              You can delete your account here. This action is not reversible
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
          <ButtonInput
            type="button"
            variant="danger"
            className="w-full"
            icon={<TrashIcon className="size-4" />}
            onClick={() => setIsOpen(true)}
          >
            Delete account
          </ButtonInput>
        </div>
      </div>

      <ActionModalDialog
        title="Delete account?"
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(user)}
        description="Are you sure you want to delete your account?"
      />
    </>
  );
};

export { DeleteOneUser };
