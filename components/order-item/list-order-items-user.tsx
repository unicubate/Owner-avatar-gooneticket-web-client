/* eslint-disable jsx-a11y/anchor-is-valid */
import { OrderItemModel } from '@/types/order-item';
import {
  formateFromNow,
  formateToCccc,
  formateTodd,
  formateToLLLL,
  viewYyformateToYyyy,
} from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  BadgeAlertIcon,
  CircleCheckBigIcon,
  MailIcon,
  MoreHorizontalIcon,
  MoveRightIcon,
  PencilIcon,
  ShareIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { CopyShareLink, SerialPrice } from '../ui-setting';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UpdateOrderItemsModal } from './update-order-items-modal';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsUser = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [level, setLevel] = useState<string | number>('L');
  const [copied, setCopied] = useState(false);
  const { t, locale, isOpen, setIsOpen } = useInputState();
  const arrayItem = [
    {
      model: 'EVENT',
      title: item?.event?.title,
      url: `/orders/${item?.orderId}/order-items/${item?.orderNumber}/ticket?model=${item?.model.toLocaleLowerCase()}`,
    },
    {
      model: 'PRODUCT',
      title: item?.product?.title,
      url: `/orders/${item?.orderId}/order-items/${item?.orderNumber}/product?model=${item?.model.toLocaleLowerCase()}`,
    },
  ];
  const oneItem = (model: string) =>
    arrayItem.find((item) => item?.model === model);

  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <Link
              prefetch={true}
              href={`${oneItem(item?.model)?.url}`}
              title={oneItem(item?.model)?.title}
            >
              <div
                className={`${item?.confirmedAt ? 'text-success hover:text-green-700' : `${item?.eventDate?.isExpired ? `text-danger` : `text-gray-600 hover:text-gray-800`}`}`}
              >
                <p className="text-6xl">
                  {formateTodd(item?.eventDate?.expiredAt as Date, locale)}
                </p>
                <p className="mt-1 text-center">
                  {capitalizeFirstLetter(
                    formateToCccc(item?.eventDate?.expiredAt as Date, locale),
                  )}
                </p>
              </div>
            </Link>

            <div className="ml-2 min-w-0 flex-1 cursor-pointer">
              <div className={`flex items-center font-bold`}>
                <p
                  className={`text-sm ${item?.confirmedAt ? 'text-success hover:text-green-700' : `${item?.eventDate?.isExpired ? `text-danger` : `text-gray-600`}`}`}
                >
                  {capitalizeFirstLetter(
                    formateToLLLL(item?.eventDate?.expiredAt as Date, locale),
                  )}
                  <span className="ml-1.5">
                    {viewYyformateToYyyy(item?.eventDate?.expiredAt as Date)}
                  </span>
                </p>
              </div>

              <div className="mt-2 text-sm">
                <Badge className="rounded-sm text-sm" variant="secondary">
                  {capitalizeFirstLetter(item?.ticket?.name ?? 'FREE')}
                </Badge>
              </div>

              {item?.fullName ? (
                <div className="mt-1 flex items-center font-bold text-gray-600">
                  <UserIcon className="size-4" />
                  <span className="ml-1">{item?.fullName}</span>
                </div>
              ) : null}

              {item?.email ? (
                <div className="mt-1 flex items-center font-bold text-gray-600">
                  <MailIcon className="size-4" />
                  <span className="ml-1"> {item?.email}</span>
                </div>
              ) : null}
            </div>
          </div>
        </td>

        <td className="hidden space-x-1 text-right text-sm font-bold dark:text-white lg:table-cell">
          {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
          item?.eventDate?.isExpired ? (
            <Badge className="ml-2 mt-2 rounded-sm" variant={'danger'}>
              EXPIRED
            </Badge>
          ) : (
            ['ACCEPTED'].includes(item?.status) && (
              <Badge className="rounded-sm" variant="secondary">
                {item?.status}
              </Badge>
            )
          )}

          {['DELIVERED', 'CONFIRMED'].includes(item?.status) && (
            <Badge className="rounded-sm" variant={'success'}>
              {item?.status}
            </Badge>
          )}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          {Number(item?.price) > 0 ? (
            <SerialPrice
              className="text-sm"
              value={Number(item?.price)}
              currency={{ code: String(item?.currency) }}
            />
          ) : (
            'Free'
          )}
        </td>

        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          {!['DELIVERED', 'CONFIRMED'].includes(item?.status) &&
          item?.eventDate?.isExpired ? (
            <div title={`Event expired`} className="pt-1 lg:hidden">
              <BadgeAlertIcon className="ml-auto  text-red-600" />
            </div>
          ) : (
            ['ACCEPTED'].includes(item?.status) && (
              <div title={`Event accepted`} className="pt-1 lg:hidden">
                <CircleCheckBigIcon className="ml-auto text-gray-600" />
              </div>
            )
          )}

          {['DELIVERED', 'CONFIRMED'].includes(item?.status) && (
            <div title={`Event confirmed`} className="pt-1 lg:hidden">
              <CircleCheckBigIcon className="ml-auto text-green-600" />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <MoreHorizontalIcon className="size-5 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-background">
              <DropdownMenuGroup>
                <Link
                  prefetch={true}
                  href={`${oneItem(item?.model)?.url}`}
                  title={oneItem(item?.model)?.title}
                >
                  <DropdownMenuItem>
                    <MoveRightIcon className="size-4 text-gray-600 hover:text-blue-600" />
                    <span className="ml-2 cursor-pointer hover:text-blue-600">
                      Manage
                    </span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                {!item?.confirmedAt ? (
                  <>
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                      <span className="ml-2 cursor-pointer hover:text-indigo-600">
                        {t.formatMessage({ id: 'MENU.SETTING' })}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ) : null}
                <DropdownMenuItem onClick={() => setCopied(true)}>
                  <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'UTIL.SHARE' })}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="pt-1 text-sm font-bold lg:hidden">
            {Number(item?.price) > 0 ? (
              <SerialPrice
                className="text-sm"
                value={Number(item?.price)}
                currency={{ code: String(item?.currency) }}
              />
            ) : (
              'Free'
            )}
          </div>
        </td>
      </tr>

      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/orders/${item?.orderId}/order-items/${item?.orderNumber}/ticket-public`}
      />

      {isOpen ? (
        <UpdateOrderItemsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          orderItem={item}
        />
      ) : null}
    </>
  );
};

export { ListOrderItemsUser };
