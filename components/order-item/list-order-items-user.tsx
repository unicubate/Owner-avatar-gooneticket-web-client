/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateDateDayjs, formatePrice } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Avatar, Tooltip } from 'antd';
import { CalendarIcon, ViewIcon, Wallet2Icon } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { LiaDnaSolid } from 'react-icons/lia';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsUser: React.FC<Props> = ({ item, index }) => {
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  const { locale } = useRouter();
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
                fileName: item?.uploadsImages[0]?.path,
              })}
              alt={item?.product?.title}
            />
          </div>

          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="tex-sm">
                <CalendarIcon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>
            <div className="mt-2 flex items-center">
              {item?.product?.title ? (
                <p className="text-lg font-bold text-gray-600 dark:text-white">
                  <ReadMore
                    html={String(item?.product?.title ?? '')}
                    value={100}
                  />
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex items-center">
              <span className="text-lg">
                <LiaDnaSolid />
              </span>
              <span className="ml-1.5 text-sm font-bold text-gray-600">
                {item?.product?.productType}
              </span>
            </div>

            <div className="mt-2 flex items-center font-medium text-gray-600">
              <button className="text-lg">
                <Wallet2Icon className="size-4" />
              </button>
              <span className="ml-1.5 text-sm">
                {formatePrice({
                  value: Number(item?.priceDiscount ?? 0),
                  isDivide: true,
                })}{' '}
                {item?.currency}
              </span>

              {item?.percentDiscount ? (
                <span className="ml-1.5 text-sm">
                  <del>
                    {formatePrice({
                      value: Number(item?.price ?? 0),
                      isDivide: true,
                    })}{' '}
                    {item?.currency}
                  </del>
                </span>
              ) : null}
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium text-gray-600">
            <ButtonInput
              type="button"
              size="sm"
              variant="ghost"
              className="hover:text-indigo-600"
            >
              <Tooltip placement="bottomRight" title={'View Content'}>
                <ViewIcon className="size-6" />
              </Tooltip>
            </ButtonInput>
          </div>
        </div>
      </div>
    </>
  );
};

export { ListOrderItemsUser };
