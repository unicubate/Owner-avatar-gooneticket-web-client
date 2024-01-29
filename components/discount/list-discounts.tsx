/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneDiscountAPI } from '@/api-site/discount';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDMYHH,
} from '@/utils';
import { Tag, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { CreateOrUpdateDiscount } from './create-or-update-discount';

const ListDiscounts: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => {
  const { locale } = useRouter();
  const [showModal, setShowModal] = useState(false);

  const saveMutation = DeleteOneDiscountAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = (item: any) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this?',
      confirmButtonText: 'Yes, Deleted',
      cancelButtonText: 'No, Cancel',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6f42c1',
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        //Envoyer la requet au serve
        try {
          await saveMutation.mutateAsync({ discountId: item?.id });
          AlertSuccessNotification({
            text: 'Discount deleted successfully',
          });
        } catch (error: any) {
          AlertDangerNotification({
            text: `${error.response.data.message}`,
          });
        }
      }
    });
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
                ? `Ends Midnight ${formateDMYHH(
                    item?.expiredAt,
                    String(locale),
                  )}`
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
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineModeEdit />
              </button>
            </Tooltip>
            <Tooltip placement="bottomRight" title={'Delete'}>
              <button
                onClick={() => deleteItem(item)}
                className="ml-2 text-lg text-gray-600 hover:text-red-600"
              >
                <MdOutlineDeleteOutline />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {showModal ? (
        <CreateOrUpdateDiscount
          showModal={showModal}
          setShowModal={setShowModal}
          discount={item}
        />
      ) : null}
    </>
  );
};

export { ListDiscounts };
