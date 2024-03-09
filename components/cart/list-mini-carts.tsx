/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCartAPI } from '@/api-site/cart';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OneCartModel } from '@/types/cart';
import { AlertDangerNotification } from '@/utils';
import { Image } from 'antd';
import React from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';

type Props = {
  index: number;
  item: OneCartModel;
};

const ListMiniCats: React.FC<Props> = ({ item, index }) => {
  const { mutateAsync: saveMutation } = DeleteOneCartAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    //Envoyer la requet au serve
    try {
      await saveMutation({ cartId: item?.id });
      // AlertSuccessNotification({
      //   text: 'Product deleted successfully',
      // });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <li className="flex py-4" key={index}>
        {item?.uploadsImages?.length > 0 ? (
          <div className="flex-shrink-0">
            <Image
              width={80}
              height={50}
              preview={false}
              src={`${viewOneFileUploadAPI({
                folder: 'products',
                fileName: item?.uploadsImages[0]?.path,
              })}`}
              alt=""
            />
          </div>
        ) : null}

        <div className="relative ml-5 flex flex-1 flex-col justify-between">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
            <div className="pr-9 sm:pr-5">
              <p className="text-base font-bold dark:text-white">
                {item?.product?.title ?? ''}
              </p>
              <div className="mt-1.5 text-sm font-medium text-gray-500">
                Qty: {item?.quantity}
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
              <p className="text-left font-bold text-gray-500 sm:ml-4 sm:text-right">
                {item?.product?.priceDiscount} x {item?.quantity}{' '}
              </p>
              <p className="text-left font-bold sm:ml-4 sm:text-right">
                {item?.product?.priceDiscount * item?.quantity}{' '}
                {item?.product?.currency?.code ?? ''}
              </p>
            </div>
          </div>

          <div className="absolute right-0 top-0 flex sm:bottom-0 sm:top-auto">
            <button
              onClick={() => deleteItem(item)}
              className="text-gray-600 hover:text-red-400 focus:ring-red-400"
            >
              <MdOutlineDeleteOutline className="size-5" />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export { ListMiniCats };
