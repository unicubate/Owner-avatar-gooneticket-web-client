/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import Swal from 'sweetalert2';
import { Avatar, Tooltip } from 'antd';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatePrice,
} from '@/utils';
import { DeleteOnePostAPI } from '@/api-site/post';
import { ReadMore } from '@/utils/read-more';
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { useRouter } from 'next/router';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { BiMoney } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MembershipModel } from '@/types/membership';
import { DeleteOneMembershipAPI } from '@/api-site/membership';
import { convertToPluralMonth } from '@/utils/utils';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { useDialog } from '../hooks/use-dialog';

type Props = {
  item?: MembershipModel;
  index: number;
};

const ListMemberships: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();

  const { mutateAsync: saveMutation } = DeleteOneMembershipAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ membershipId: item?.id });
      AlertSuccessNotification({
        text: 'Data deleted successfully',
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
    uploadType: 'image',
    model: 'membership',
    organizationId: item?.organizationId,
    uploadableId: String(item?.id),
  });

  if (status === 'pending') {
    <p>loading...</p>;
  }

  return (
    <>
      <div className="flex items-center py-5">
        <div className="relative shrink-0 cursor-pointer">
          <Avatar
            size={100}
            shape="square"
            src={viewOneFileUploadAPI({
              folder: 'memberships',
              fileName: String(dataImages?.[0]?.path),
            })}
            alt={item?.title}
          />
        </div>

        <div className="ml-3 min-w-0 flex-1 cursor-pointer">
          <div className="flex items-center">
            <button className="tex-sm text-gray-700">
              <AiOutlineCalendar />
            </button>
            <span className="ml-1.5 text-sm font-normal">
              {formateDateDayjs(item?.createdAt as Date)}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            {item?.title ? (
              <p className="text-lg font-bold text-gray-600">
                <ReadMore html={String(item?.title ?? '')} value={50} />
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex items-center">
            {item?.price ? (
              <>
                <button className="text-lg font-normal">
                  <BiMoney />
                </button>
                <span className="ml-1.5 text-sm font-bold">
                  {formatePrice({
                    value: Number(item?.price),
                    isDivide: false,
                  })}{' '}
                  {item?.currency?.symbol}
                </span>
                <span className="ml-1.5 text-sm font-bold">
                  per {convertToPluralMonth(Number(item?.month))}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="py-4 text-right text-sm font-medium text-gray-900">
          <Tooltip placement="bottomRight" title={'Edit'}>
            <button
              onClick={() => router.push(`/memberships/${item?.id}/edit`)}
              className="ml-2 text-lg text-gray-600 hover:text-indigo-600"
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
    </>
  );
};
export { ListMemberships };
