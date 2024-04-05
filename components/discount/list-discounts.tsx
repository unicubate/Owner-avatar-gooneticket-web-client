/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneDiscountAPI } from '@/api-site/discount';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from '@/utils';
import { Tag, Tooltip } from 'antd';
import { PencilIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateDiscountModal } from './create-or-update-discount-modal';

const ListDiscounts: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const { isOpen, setIsOpen, loading, setLoading, lang } = useInputState();

  const [showModal, setShowModal] = useState(false);

  const { mutateAsync: saveMutation } = DeleteOneDiscountAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ discountId: item?.id });
      AlertSuccessNotification({
        text: 'Discount deleted successfully',
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
          <>
            <p className="text-sm font-bold">
              {item?.percent}% Off Commissions
            </p>
            <p className="ml-2 mt-1 text-sm font-medium">{item?.code}</p>
          </>

          <div className="ml-auto">
            <p className="mt-1 text-sm font-medium">
              {item?.enableExpiredAt
                ? `Ends Midnight ${formateDMYHH(item?.expiredAt, lang)}`
                : `Never Expires `}
            </p>
          </div>

          <div className="ml-auto">
            <button className="ml-2 text-lg font-bold transition-all duration-200">
              <Tag
                bordered={false}
                className="ml-2"
                color={`${item.isValid ? 'success' : 'error'}`}
              >
                {item.isValid ? 'Valid' : 'Invalid'}
              </Tag>
            </button>

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
              description="Are you sure you want to delete this discount?"
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
        <CreateOrUpdateDiscountModal
          showModal={showModal}
          setShowModal={setShowModal}
          discount={item}
        />
      ) : null}
    </>
  );
};

export { ListDiscounts };
