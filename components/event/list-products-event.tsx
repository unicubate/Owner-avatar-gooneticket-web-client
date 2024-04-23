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
  CalendarDaysIcon,
  CalendarIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  WalletIcon
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { formateDate } from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { CopyShareLink } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  item?: ProductModel;
  index: number;
};

const ListProductsEvent = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [copied, setCopied] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();

  const { mutateAsync: saveMutation } = DeleteOneProductAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ productId: item?.id });
      AlertSuccessNotification({
        text: 'Event deleted successfully',
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
    model: 'EVENT',
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
              <span className="font-bold">
                <CalendarIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm font-normal">
                {formateDate(item?.createdAt as Date, locale)}
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
              <span className="ml-2 text-sm">{item?.productType}</span>

              <span className="ml-2">
                <GlobeIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.model}</span>
            </div>

            <div className="mt-4 flex items-center font-medium text-gray-600">
              <span className="font-bold">
                <CalendarDaysIcon className="size-4" />
              </span>
              <span className="ml-2 text-sm font-normal">
                {formateDate(item?.expiredAt as Date, locale)}
              </span>

              <span className="ml-2 font-bold">
                <WalletIcon className="size-4" />
              </span>
              <span className="ml-2 text-sm">
                {formatePrice({
                  value: Number(item?.priceDiscount ?? 0),
                  isDivide: false,
                })}{' '}
                {item?.currency?.symbol}
              </span>

              {item?.enableDiscount ? (
                <span className="ml-2 text-sm text-red-600">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" size="icon" variant="ghost">
                  <MoreHorizontalIcon className="size-5 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#121212]">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setCopied(true)}>
                    <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      Share
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => push(`/events/${item?.id}/edit`)}
                  >
                    <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      Edit
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      Delete
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/**** Copy and delete *****/}
      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/events/${item?.slug}`}
      />
      <ActionModalDialog
        title="Delete?"
        loading={loading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={() => deleteItem(item)}
        description="Are you sure you want to delete this?"
      />
    </>
  );
};

export { ListProductsEvent };
