/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderModel } from '@/types/order-item';
import { formateFromNow } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import {
  BrickWallIcon,
  MoreHorizontalIcon,
  MoveRightIcon,
  NotepadTextIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { CopyShareLink, SerialPrice, SwiperImage } from '../ui-setting';
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
  item: OrderModel;
  index: number;
};

const ListOrdersUser = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [copied, setCopied] = useState(false);
  const { t, locale } = useInputState();

  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <Link
              href={`/orders/${item?.id}/order-items`}
              title={item?.event?.title}
            >
              {item?.oneUploadImage?.path ? (
                <div className="relative shrink-0 cursor-pointer">
                  <SwiperImage
                    height="70px"
                    width="80px"
                    src={`${viewOneFileUploadAPI({
                      folder: String(
                        item?.oneUploadImage?.model.toLocaleLowerCase(),
                      ),
                      fileName: item?.oneUploadImage?.path,
                    })}`}
                    alt={item?.event?.title}
                  />
                </div>
              ) : null}
            </Link>

            <div className="ml-2 min-w-0 flex-1 cursor-pointer">
              <div className="flex items-center font-bold text-gray-600">
                <span className="text-sm font-bold text-gray-600">
                  #{item?.orderNumber}
                </span>
              </div>

              {item?.id ? (
                <p className="mt-2 font-bold transition-all duration-200 hover:text-blue-600">
                  <Link
                    href={`/orders/${item?.id}/order-items`}
                    title={item?.event?.title}
                  >
                    <ReadMore html={item?.event?.title} value={100} />
                  </Link>
                </p>
              ) : null}

              <div className="mt-2 flex items-center font-medium text-gray-600">
                <button className="text-sm">
                  <BrickWallIcon className="size-4" />
                </button>
                <span className="ml-1.5 text-sm font-bold">
                  {item?.quantity}
                </span>
              </div>
            </div>
          </div>
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <div className="ml-4 min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {Number(item?.totalPrice) > 0 ? (
                <SerialPrice
                  className="text-sm"
                  value={Number(item?.totalPrice)}
                  currency={{ code: String(item?.currency) }}
                />
              ) : (
                'Free'
              )}
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
            <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#04080b]">
              <DropdownMenuGroup>
                <Link
                  href={`/orders/${item?.id}/order-items`}
                  title={item?.event?.title}
                >
                  <DropdownMenuItem>
                    <MoveRightIcon className="size-4 text-gray-600 hover:text-blue-600" />
                    <span className="ml-2 cursor-pointer hover:text-blue-600">
                      Manage
                    </span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={`/orders/${item?.transaction?.id}/transaction`}>
                  <DropdownMenuItem>
                    <NotepadTextIcon className="size-4 text-gray-600 hover:text-blue-600" />
                    <span className="ml-2 cursor-pointer hover:text-blue-600">
                      Invoice
                    </span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>

      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/orders/${item?.orderNumber}/ticket-public`}
      />
    </>
  );
};

export { ListOrdersUser };
