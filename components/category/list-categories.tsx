/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCategoryAPI } from '@/api-site/category';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateFromNow,
} from '@/utils';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateCategory } from './create-or-update-category';

const ListCategories = ({ item, index }: { item: any; index: number }) => {
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();
  const [showModal, setShowModal] = useState(false);

  const { mutateAsync: saveMutation } = DeleteOneCategoryAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ categoryId: item?.id });
      AlertSuccessNotification({
        text: 'Category deleted successfully',
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

  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.name}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-2 text-right text-sm font-medium">
          <ButtonInput
            variant="link"
            type="button"
            size="icon"
            title="Edit"
            icon={
              <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            }
            onClick={() => setShowModal(true)}
          />

          <ActionModalDialog
            title="Delete?"
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => deleteItem(item)}
            description="Are you sure you want to delete this category?"
            buttonDialog={
              <ButtonInput
                variant="link"
                type="button"
                size="icon"
                title="Delete"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />
        </td>
      </tr>

      {showModal ? (
        <CreateOrUpdateCategory
          showModal={showModal}
          setShowModal={setShowModal}
          category={item}
        />
      ) : null}
    </>
  );
};

export { ListCategories };
