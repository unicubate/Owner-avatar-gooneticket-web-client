/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCategoryAPI } from '@/api-site/category';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDate,
} from '@/utils';
import { Tooltip } from 'antd';
import { PencilIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateCategory } from './create-or-update-category';

const ListCategories: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const {
    isOpen,
    setIsOpen,
    loading,
    setLoading,
    lang: locale,
  } = useInputState();
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
      <div key={index} className="py-4">
        <div className="flex items-center">
          <p className="text-sm font-bold">{item?.name}</p>

          <div className="ml-auto">
            <p className="mt-1 text-sm font-medium">
              {formateDate(item?.createdAt as Date, locale as string)}
            </p>
          </div>

          <div className="ml-auto">
            <Tooltip placement="bottomRight" title={'Edit'}>
              <button
                onClick={() => setShowModal(true)}
                title="Edit"
                className="ml-2 text-gray-600 hover:text-indigo-600"
              >
                <PencilIcon className="size-4" />
              </button>
            </Tooltip>

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this category?"
              buttonDialog={
                <ButtonInput
                  className="text-sm text-gray-600 hover:text-red-600"
                  variant="link"
                  type="button"
                >
                  <TrashIcon className="size-4" />
                </ButtonInput>
              }
            />
          </div>
        </div>
      </div>

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
