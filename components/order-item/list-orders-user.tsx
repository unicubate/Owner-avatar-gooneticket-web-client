/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderModel } from '@/types/order-item';
import { formateDate, formateFromNow } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import {
  CalendarIcon,
  MailIcon,
  MoreHorizontalIcon,
  MoveRightIcon,
  NotepadTextIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { SerialPrice, SwiperImage } from '../ui-setting';
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
  const { t, locale } = useInputState();

  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <Link
              prefetch={true}
              href={`/orders/${item?.id}/order-items`}
              title={item?.event?.title}
            >
              {item?.oneUploadImage?.path ? (
                <div className="relative shrink-0 cursor-pointer">
                  <SwiperImage
                    height="74px"
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
              <div className="flex items-center font-bold text-gray-600 lg:hidden">
                <CalendarIcon className="size-4" />
                <span className="ml-1">
                  {formateDate(item?.createdAt as Date, locale)}
                </span>
              </div>
              {item?.id ? (
                <p className="mt-1 font-bold transition-all duration-200 hover:text-blue-600">
                  <Link
                    href={`/orders/${item?.id}/order-items`}
                    title={item?.event?.title}
                  >
                    <ReadMore html={item?.event?.title} value={100} />
                  </Link>
                </p>
              ) : null}
              {item?.address?.fullName ? (
                <div className="mt-1 flex items-center font-bold text-gray-600">
                  <UserIcon className="size-4" />
                  <span className="ml-1">{item?.address?.fullName}</span>
                </div>
              ) : null}

              <div className="mt-1 flex items-center font-bold text-gray-600">
                <MailIcon className="size-4" />
                <span className="ml-1"> {item?.address?.email}</span>
              </div>
            </div>
          </div>
        </td>

        <td className="hidden text-left text-sm font-medium text-gray-600 lg:table-cell">
          Qty: {Number(item?.quantity)}
        </td>

        <td className="hidden text-center text-sm font-bold dark:text-white lg:table-cell">
          {Number(item?.totalPrice) > 0 ? (
            <SerialPrice
              className="text-sm"
              value={Number(item?.totalPrice)}
              currency={{ code: String(item?.currency) }}
            />
          ) : (
            'Free'
          )}
        </td>

        <td className="hidden text-center text-sm font-medium text-gray-600 lg:table-cell">
          {item?.orderNumber}
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <MoreHorizontalIcon className="size-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 dark:border-gray-900 dark:bg-background">
              <DropdownMenuGroup>
                <Link
                  prefetch={true}
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
                <Link
                  prefetch={true}
                  href={`/orders/${item?.transaction?.id}/transaction`}
                >
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
          <div className="pt-1 lg:hidden">
            <p className={`inline-flex text-sm font-bold`}>
              <span className={`ml-1`}>
                {Number(item?.totalPrice) > 0 ? (
                  <SerialPrice
                    className="text-sm"
                    value={Number(item?.totalPrice)}
                    currency={{ code: String(item?.currency) }}
                  />
                ) : (
                  'Free'
                )}
              </span>
            </p>
          </div>
          <div className="pt-1 lg:hidden">
            <span className="text-gray-600">Qty: {item?.quantity}</span>
          </div>
        </td>
      </tr>
    </>
  );
};

export { ListOrdersUser };
