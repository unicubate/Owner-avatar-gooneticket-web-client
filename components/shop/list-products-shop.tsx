/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneProductAPI } from '@/api-site/product';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { ProductModel } from '@/types/product';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatePrice,
} from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Avatar } from 'antd';
import {
  AtomIcon,
  CalendarIcon,
  GlobeIcon,
  LockKeyholeIcon,
  PencilIcon,
  TrashIcon,
  WalletIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: ProductModel;
  index: number;
};

const ListProductsShop: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();

  const { mutateAsync: saveMutation } = DeleteOneProductAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ productId: item?.id });
      AlertSuccessNotification({
        text: 'Product deleted successfully',
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

  const { status, data: dataImages } = GetUploadsAPI({
    organizationId: item?.organizationId,
    model: 'PRODUCT',
    uploadableId: `${item?.id}`,
    uploadType: 'image',
  });

  if (status === 'pending') {
    <p>loading...</p>;
  }

  return (
    <>
      <div key={index} className="py-5">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({
                folder: 'products',
                fileName: String(dataImages?.[0]?.path),
              })}
              alt={item?.title}
            />
          </div>

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="font-normal">
                <CalendarIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              {item?.title ? (
                <p className="text-lg font-bold">
                  <ReadMore html={String(item?.title ?? '')} value={100} />
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex items-center text-gray-600">
              <span className="font-bold">
                <AtomIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.productType}</span>

              <span className="ml-1.5">
                {item?.whoCanSee === 'PUBLIC' ? (
                  <GlobeIcon className="size-4" />
                ) : (
                  <LockKeyholeIcon className="size-4" />
                )}
              </span>
              <span className="ml-1.5 text-sm">{item?.whoCanSee}</span>
            </div>

            <div className="mt-4 flex items-center font-medium text-gray-600">
              <button className="font-normal">
                <WalletIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm">
                {formatePrice({
                  value: Number(item?.priceDiscount ?? 0),
                  isDivide: false,
                })}{' '}
                {item?.currency?.symbol}
              </span>

              {item?.enableDiscount ? (
                <span className="ml-1.5 text-sm text-red-600">
                  <del>
                    {formatePrice({
                      value: Number(item?.price ?? 0),
                      isDivide: false,
                    })}{' '}
                    {item?.currency?.symbol}
                  </del>
                </span>
              ) : null}
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium text-gray-600">
            <ButtonInput
              variant="ghost"
              type="button"
              size="icon"
              icon={<PencilIcon className="size-4 text-gray-600" />}
              onClick={() => router.push(`/shop/${item?.id}/edit`)}
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
                  icon={<TrashIcon className="size-4 text-gray-600" />}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ListProductsShop };
