/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOneMembershipAPI } from '@/api-site/membership';
import { GetUploadsAPI, viewOneFileUploadAPI } from '@/api-site/upload';
import { MembershipModel } from '@/types/membership';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatePrice,
} from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { convertToPluralMonth } from '@/utils/utils';
import { Avatar } from 'antd';
import { CalendarIcon, PencilIcon, TrashIcon, WalletIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { formateDate } from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';

type Props = {
  item?: MembershipModel;
  index: number;
};

const ListMemberships = ({ item, index }: Props) => {
  const router = useRouter();
  const { isOpen, setIsOpen, loading, setLoading, lang } = useInputState();

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
          <div className="flex items-center text-gray-600">
            <button className="font-bold">
              <CalendarIcon className="size-4" />
            </button>
            <span className="ml-1.5 text-sm font-normal">
              {formateDate(item?.createdAt as Date, lang)}
            </span>
          </div>

          <div className="mt-2 flex items-center">
            {item?.title ? (
              <p className="text-lg font-bold">
                <ReadMore html={String(item?.title ?? '')} value={50} />
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex items-center text-gray-600">
            {item?.price ? (
              <>
                <button className="font-normal">
                  <WalletIcon className="size-4" />
                </button>
                <span className="ml-1.5 text-sm font-bold">
                  {formatePrice({
                    value: Number(item?.price),
                    isDivide: false,
                  })}{' '}
                  {item?.currency?.symbol}
                </span>
                <span className="ml-1.5 text-sm font-bold">
                  / {convertToPluralMonth(Number(item?.month))}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="py-4 text-right text-sm font-medium text-gray-900">
          <ButtonInput
            variant="ghost"
            type="button"
            size="icon"
            icon={
              <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            }
            onClick={() => router.push(`/memberships/${item?.id}/edit`)}
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
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />
        </div>
      </div>
    </>
  );
};
export { ListMemberships };
