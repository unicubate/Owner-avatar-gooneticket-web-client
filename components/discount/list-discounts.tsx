/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneDiscountAPI } from '@/api-site/discount';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDate,
  formateFromNow,
} from '@/utils';
import { Tag } from 'antd';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateDiscountModal } from './create-or-update-discount-modal';

const ListDiscounts = ({ item, index }: { item: any; index: number }) => {
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();

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
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.percent}% Off Commissions
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt, locale)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-left text-sm font-medium dark:text-white lg:table-cell">
          <Tag
            bordered={false}
            className="ml-2"
            color={`${item.isValid ? 'success' : 'error'}`}
          >
            {item.isValid ? 'Valid' : 'Invalid'}
          </Tag>
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {item?.enableExpiredAt
            ? `Ends Midnight ${formateDate(item?.expiredAt, locale)}`
            : `Never Expires `}
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <ButtonInput
            variant="link"
            type="button"
            size="icon"
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
            description="Are you sure you want to delete this?"
            buttonDialog={
              <ButtonInput
                variant="link"
                type="button"
                size="icon"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />

          <div className="mt-1 pt-1 lg:hidden">
            <p className="inline-flex">
              {item?.enableExpiredAt
                ? `Ends Midnight ${formateDate(item?.expiredAt, locale)}`
                : `Never Expires `}
            </p>
            <p className="ml-2 inline-flex">
              <Tag
                bordered={false}
                className="ml-2"
                color={`${item.isValid ? 'success' : 'error'}`}
              >
                {item.isValid ? 'Valid' : 'Invalid'}
              </Tag>
            </p>
          </div>
        </td>
      </tr>

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
