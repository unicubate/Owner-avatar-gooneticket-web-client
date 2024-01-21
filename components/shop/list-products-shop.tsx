/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import Swal from 'sweetalert2';
import { Avatar, Switch, Tooltip } from 'antd';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { DeleteOnePostAPI } from '@/api-site/post';
import { ReadMore } from '@/utils/read-more';
import {
  MdOutlineDeleteOutline,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineModeEdit,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { BiMoney } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { ProductModel } from '@/types/product';
import { DeleteOneProductAPI } from '@/api-site/product';
import { formatePrice } from '@/utils';
import { LiaDnaSolid } from 'react-icons/lia';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { TbWorld } from 'react-icons/tb';
import { useDialog } from '../hooks/use-dialog';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: ProductModel;
  index: number;
};

const ListProductsShop: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();

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
        className: 'info',
        gravity: 'top',
        position: 'center',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: 'top',
        className: 'info',
        position: 'center',
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
              <button className="tex-sm">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDateDayjs(item?.createdAt as Date)}
              </span>
            </div>
            <div className="mt-4 flex items-center">
              {item?.title ? (
                <p className="text-lg font-bold text-gray-600 dark:text-white">
                  <ReadMore html={String(item?.title ?? '')} value={100} />
                </p>
              ) : null}
            </div>

            <div className="mt-4 flex items-center font-medium text-gray-600">
              <button className="text-lg">
                <BiMoney />
              </button>
              <span className="ml-1.5 text-sm">
                {formatePrice({
                  value: Number(item?.priceDiscount ?? 0),
                  isDivide: false,
                })}{' '}
                {item?.currency?.symbol}
              </span>

              {item?.enableDiscount ? (
                <span className="ml-1.5 text-sm">
                  <del>
                    {formatePrice({
                      value: Number(item?.price ?? 0),
                      isDivide: false,
                    })}{' '}
                    {item?.currency?.symbol}
                  </del>
                </span>
              ) : null}

              <span className="ml-1.5 text-lg">
                {item?.whoCanSee === 'PUBLIC' ? (
                  <TbWorld />
                ) : (
                  <HiOutlineLockClosed />
                )}
              </span>
              <span className="ml-1.5 text-sm">{item?.whoCanSee}</span>

              <span className="ml-1.5 text-lg">
                <LiaDnaSolid />
              </span>
              <span className="ml-1.5 text-sm">{item?.productType}</span>
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium text-gray-600">
            {/* <Tooltip placement="bottomRight" title={"View"}>
              <button
                onClick={() => router.push(`/shop/${item?.id}/edit`)}
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <MdOutlineRemoveRedEye />
              </button>
            </Tooltip> */}

            {/* <Tooltip placement="bottomRight" title={"Deactivate"}>
              <button
                // onClick={() => router.push(`/shop/${item?.id}/edit`)}
                className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
              >
                <Switch size="small" defaultChecked />
              </button>
            </Tooltip> */}
            <Tooltip placement="bottomRight" title={'Edit'}>
              <button
                onClick={() => router.push(`/shop/${item?.id}/edit`)}
                className="ml-2 text-lg text-gray-600  hover:text-indigo-600"
              >
                <MdOutlineModeEdit />
              </button>
            </Tooltip>

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this?"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ListProductsShop };
