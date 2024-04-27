/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetOneOrderAPI } from '@/api-site/order-item';
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateFromNow } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import { CheckCheckIcon, MoreHorizontalIcon, ViewIcon } from 'lucide-react';
import Link from 'next/link';
import { useInputState } from '../hooks';
import { AvatarComponent } from '../ui-setting/ant';
import { SerialPrice } from '../ui-setting/serial-price';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { UpdateOrderItemModal } from './update-order-item-modal';

type Props = {
  item: OrderItemModel;
  index: number;
};

export function ListOrderItemsSeller(props: Props) {
  const { item, index } = props;
  const { isOpen, setIsOpen, locale } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  const { data: order } = GetOneOrderAPI({
    orderId: item?.orderId,
  });
  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            {item?.uploadsImages?.length > 0 ? (
              <div className="shrink-0">
                <Image
                  width={100}
                  height={60}
                  preview={false}
                  src={`${viewOneFileUploadAPI({
                    folder: 'products',
                    fileName: item?.uploadsImages[0]?.path,
                  })}`}
                  alt={item?.product?.title}
                />
              </div>
            ) : null}

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                <ReadMore html={`${item?.product?.title}`} value={100} />
              </p>
              <div className="hidden lg:table-cell">
                <p className="mt-1 flex min-w-0 flex-1 items-center text-sm font-bold text-gray-600">
                  {item?.profile ? (
                    <AvatarComponent size={35} profile={item?.profile} />
                  ) : null}
                  <div className="ml-2 min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      {item?.profile?.firstName} {item?.profile?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item?.profile?.email}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                      {formateFromNow(item?.createdAt as Date, locale)}
                    </p>
                  </div>
                </p>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale)}
              </p>

              <div className="mt-2 min-w-0 flex-1 lg:hidden">
                {item?.status === 'CANCELLED' && (
                  <Badge className="rounded-sm" variant={'danger'}>
                    {item?.status.toLocaleLowerCase()}
                  </Badge>
                )}
                {['DELIVERED'].includes(item?.status) && (
                  <Badge className="rounded-sm" variant={'success'}>
                    {item?.status.toLocaleLowerCase()}
                  </Badge>
                )}
                {['ACCEPTED'].includes(item?.status) && (
                  <Badge className="rounded-sm" variant={'success'}>
                    {item?.status.toLocaleLowerCase()}
                  </Badge>
                )}
                {item?.status === 'PENDING' && (
                  <Badge className="rounded-sm" variant={'warning'}>
                    {item?.status.toLocaleLowerCase()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </td>

        <td className="hidden text-sm font-bold text-gray-600 lg:table-cell">
          #{item?.orderNumber}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          {item?.status === 'CANCELLED' && (
            <Badge className="rounded-sm" variant={'danger'}>
              {item?.status}
            </Badge>
          )}
          {['DELIVERED'].includes(item?.status) && (
            <Badge className="rounded-sm" variant={'success'}>
              {item?.status}
            </Badge>
          )}
          {['ACCEPTED'].includes(item?.status) && (
            <Badge className="rounded-sm" variant={'success'}>
              {item?.status}
            </Badge>
          )}
          {item?.status === 'PENDING' && (
            <Badge className="rounded-sm" variant={'warning'}>
              {item?.status}
            </Badge>
          )}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <div className="ml-4 min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              <SerialPrice
                className="text-sm"
                value={Number(item?.priceDiscount)}
                currency={{ code: String(item?.currency) }}
              />
            </p>
          </div>
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium text-gray-600">


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <MoreHorizontalIcon className="size-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#121212]">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => showDrawer()}
                >
                  <ViewIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    View
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`/events/orders/${item?.orderNumber}/confirm`}>
                  <DropdownMenuItem>
                    <CheckCheckIcon className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      Confirm
                    </span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mt-1 pt-1 lg:hidden">
            <p className="inline-flex text-sm font-bold dark:text-white">
              <SerialPrice
                className="text-sm"
                value={Number(item?.priceDiscount)}
                currency={{ code: String(item?.currency) }}
              />
            </p>
            <div className="ml-auto mt-2 min-w-0 flex-1 font-bold">
              {item?.product?.productType}
            </div>
          </div>
        </td>
        <UpdateOrderItemModal
          item={item}
          order={order}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </tr>
    </>
  );
}
