/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneCommissionAPI } from '@/api-site/commission';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { CommissionModel } from '@/types/commission';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatePrice,
} from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Avatar, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiMoney } from 'react-icons/bi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { formateDateDayjs } from '../../utils/formate-date-dayjs';
import { useDialog } from '../hooks/use-dialog';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: CommissionModel;
  index: number;
};

const ListCommissions: React.FC<Props> = ({ item, index }) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading } = useDialog();

  const { mutateAsync: saveMutation } = DeleteOneCommissionAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ commissionId: item?.id });
      AlertSuccessNotification({
        text: 'Commission deleted successfully',
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
    model: 'COMMISSION',
    uploadableId: `${item?.id}`,
    uploadType: 'image',
  });

  if (status === 'pending') {
    <p>loading...</p>;
  }

  return (
    <>
      <div key={index} className="divide-gray-200 py-5">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            <Avatar
              size={100}
              shape="square"
              src={viewOneFileUploadAPI({
                folder: 'commissions',
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
                  <span className="text-lg font-normal">
                    <BiMoney />
                  </span>
                  <span className="ml-2 text-sm font-bold">
                    {formatePrice({
                      value: Number(item?.price),
                      isDivide: false,
                    })}{' '}
                    {item?.currency?.symbol}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium text-gray-900">
            <Tooltip placement="bottomRight" title={'Edit'}>
              <button
                onClick={() => router.push(`/commissions/${item?.id}/edit`)}
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
      </div>
    </>
  );
};
export { ListCommissions };
