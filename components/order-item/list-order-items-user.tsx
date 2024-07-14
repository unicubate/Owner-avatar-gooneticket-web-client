/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateFromNow, formateToRFC2822 } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import {
  BadgeAlertIcon,
  CalendarIcon,
  CheckCheckIcon,
  MoreHorizontalIcon,
  MoveRightIcon,
  ShareIcon,
  TicketIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { CopyShareLink, SerialPrice, SwiperImage } from '../ui-setting';
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

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsUser = (props: Props) => {
  const { push } = useRouter();
  const { item, index } = props;
  const [copied, setCopied] = useState(false);
  const { t, locale } = useInputState();
  const arrayItem = [
    {
      model: 'EVENT',
      title: item?.event?.title,
      url: `/orders/${item?.orderNumber}/ticket?model=${item?.model.toLocaleLowerCase()}`,
    },
    {
      model: 'PRODUCT',
      title: item?.product?.title,
      url: `/orders/${item?.orderNumber}/product?model=${item?.model.toLocaleLowerCase()}`,
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
              href={`${oneItem(item?.model)?.url}`}
              title={oneItem(item?.model)?.title}
            >
              {item?.uploadsImages?.length > 0 ? (
                <div className="relative shrink-0 cursor-pointer">
                  <SwiperImage
                    height="70px"
                    width="80px"
                    src={`${viewOneFileUploadAPI({
                      folder: String(item?.model.toLocaleLowerCase()),
                      fileName: item?.uploadsImages[0]?.path,
                    })}`}
                    alt={`${oneItem(item?.model)?.title}`}
                  />
                </div>
              ) : null}
            </Link>

            <div className="ml-2 min-w-0 flex-1 cursor-pointer">
              <div className="flex items-center text-gray-600">
                <button className="text-sm">
                  <CalendarIcon className="size-4" />
                </button>
                <span className="ml-1.5 text-sm font-normal">
                  {formateToRFC2822(item?.createdAt as Date, locale)}
                </span>
              </div>

              {item?.id ? (
                <p className="mt-2 font-bold transition-all duration-200 hover:text-blue-600">
                  <Link
                    href={`${oneItem(item?.model)?.url}`}
                    title={oneItem(item?.model)?.title}
                  >
                    <ReadMore
                      html={`${oneItem(item?.model)?.title}`}
                      value={100}
                    />
                  </Link>
                </p>
              ) : null}

              <div className="mt-2 flex items-center font-medium text-gray-600">
                <span className="text-sm font-bold text-gray-600">
                  #{item?.orderNumber}
                </span>

                <p className="ml-1.5 inline-flex text-sm font-bold">
                  <Badge className="gap-1 rounded-sm" variant="secondary">
                    <TicketIcon className="size-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {item?.model}
                    </span>
                  </Badge>
                </p>
                {['DELIVERED', 'ACCEPTED'].includes(item?.status) && (
                  <p className="ml-1.5 inline-flex gap-2 text-sm font-bold lg:hidden">
                    <Badge className="gap-1 rounded-sm" variant="success">
                      <CheckCheckIcon className="size-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {item?.status}
                      </span>
                    </Badge>
                  </p>
                )}

                {item?.model === 'EVENT' &&
                !['DELIVERED', 'ACCEPTED'].includes(item?.status) &&
                item?.event?.isExpired ? (
                  <p className="ml-1.5 inline-flex gap-2 text-sm font-bold lg:hidden">
                    <Badge className="gap-1 rounded-sm" variant="danger">
                      <BadgeAlertIcon className="size-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        EXPIRED
                      </span>
                    </Badge>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </td>

        <td className="hidden space-x-1 text-right text-sm font-bold dark:text-white lg:table-cell">
          {['CANCELLED'].includes(item?.status) && (
            <Badge className="rounded-sm" variant={'danger'}>
              {item?.status}
            </Badge>
          )}

          {['DELIVERED', 'ACCEPTED', 'CONFIRMED'].includes(item?.status) && (
            <Badge className="gap-1 rounded-sm" variant="success">
              <CheckCheckIcon className="size-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {item?.status}
              </span>
            </Badge>
          )}

          {!['DELIVERED', 'ACCEPTED', 'CONFIRMED'].includes(item?.status) &&
          item?.event?.isExpired ? (
            <Badge className="gap-1 rounded-sm" variant="danger">
              <BadgeAlertIcon className="size-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                EXPIRED
              </span>
            </Badge>
          ) : (
            ['PENDING'].includes(item?.status) && (
              <Badge className="rounded-sm" variant={'warning'}>
                {item?.status}
              </Badge>
            )
          )}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <div className="ml-4 min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {Number(item?.price) > 0 ? (
                <SerialPrice
                  className="text-sm"
                  value={Number(item?.price)}
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
                {item?.model === 'EVENT' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setCopied(true)}>
                      <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                      <span className="ml-2 cursor-pointer hover:text-indigo-600">
                        {t.formatMessage({ id: 'UTIL.SHARE' })}
                      </span>
                    </DropdownMenuItem>
                  </>
                )}
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

export { ListOrderItemsUser };
