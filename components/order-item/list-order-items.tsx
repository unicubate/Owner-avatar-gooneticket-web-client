/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateFromNow } from '@/utils';
import { Button, Image } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { SerialPrice } from '../ui-setting/serial-price';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItems: React.FC<Props> = ({ item, index }) => {
  const { locale } = useRouter();
  return (
    <>
      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            {item?.uploadsImages?.length > 0 ? (
              <div className="flex-shrink-0">
                <Image
                  width={70}
                  height={40}
                  preview={false}
                  src={`${viewOneFileUploadAPI({
                    folder: 'products',
                    fileName: item?.uploadsImages[0]?.path,
                  })}`}
                  alt=""
                />
              </div>
            ) : null}

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.product?.title}
              </p>
              <p className="mt-1 text-sm font-medium  text-gray-600">
                {item?.quantity && `Qty: ${item?.quantity}`}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </div>
          </div>
        </td>

        {/* <td className="hidden text-left text-sm font-medium dark:text-white lg:table-cell">
          {item?.model.toLocaleLowerCase()}
        </td> */}

        <td className="text-left text-sm font-medium dark:text-white">
          {item?.status === 'CANCELLED' && (
            <Badge className="rounded-sm" variant={'danger'}>
              {item?.status.toLocaleLowerCase()}
            </Badge>
          )}
          {['DELIVERED', 'ACCEPTED'].includes(item?.status) && (
            <Badge className="rounded-sm" variant={'success'}>
              {item?.status.toLocaleLowerCase()}
            </Badge>
          )}
          {item?.status === 'PENDING' && (
            <Badge className="rounded-sm" variant={'warning'}>
              {item?.status.toLocaleLowerCase()}
            </Badge>
          )}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <SerialPrice
            className="text-sm"
            value={Number(item?.priceDiscount)}
            currency={{ code: String(item?.currency) }}
          />
        </td>

        {/* <td className="text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            {item?.profile ? (
              <AvatarComponent size={40} profile={item?.profile} />
            ) : null}

            <div className="ml-4 min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {item?.profile?.firstName} {item?.profile?.lastName}
              </p>
              <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
                {item?.profile?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
                <ReadMore html={`${item?.profile?.email}`} value={18} />
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale as string)}
              </p>
            </div>
          </div>
        </td> */}

        {/* <td className="hidden text-sm text-right font-medium text-gray-900 lg:table-cell">
          <ReadMore html={`${item?.description ?? ""}`} value={20} />
        </td> */}

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale as string)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="text"
                shape="circle"
                icon={<BiDotsHorizontal className="size-5 text-gray-400" />}
                size="small"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span className="cursor-pointer">View info</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                          <span className="cursor-pointer">Invite</span>
                        </DropdownMenuItem> */}
              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="cursor-pointer">Envoice</span>
              </DropdownMenuItem> */}
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

            {/* <div className="inline-flex items-center justify-end mt-1">
                                      07 January, 2022
                                    </div> */}
          </div>
        </td>
      </tr>
    </>
  );
};

export { ListOrderItems };
