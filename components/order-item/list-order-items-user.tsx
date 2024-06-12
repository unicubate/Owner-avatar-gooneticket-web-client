/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateFromNow, formateToRFC2822 } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import {
  BadgeAlertIcon,
  CalendarIcon,
  CheckCheckIcon,
  MoveRightIcon,
  TicketIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ButtonInput, SerialPrice } from '../ui-setting';
import { Badge } from '../ui/badge';

type Props = {
  item: OrderItemModel;
  index: number;
};

const ListOrderItemsUser = (props: Props) => {
  const { push } = useRouter();
  const { item, index } = props;
  const { isOpen, setIsOpen, locale, ipLocation } = useInputState();
  const linkRedirect = `/orders/${item?.orderNumber}/tickets?model=${item?.model.toLocaleLowerCase()}`;
  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <Link href={linkRedirect} title={item?.product?.title}>
              {item?.uploadsImages?.length > 0 ? (
                <div className="relative shrink-0 cursor-pointer">
                  <Image
                    width={64}
                    height={64}
                    preview={false}
                    src={`${viewOneFileUploadAPI({
                      folder: String(item?.model.toLocaleLowerCase()),
                      fileName: item?.uploadsImages[0]?.path,
                    })}`}
                    alt={item?.product?.title}
                  />
                </div>
              ) : null}
            </Link>

            <div className="ml-2 min-w-0 flex-1 cursor-pointer">
              <div className="flex items-center text-gray-600">
                <button className="tex-sm">
                  <CalendarIcon className="size-4" />
                </button>
                <span className="ml-1.5 text-sm font-normal">
                  {formateToRFC2822(item?.createdAt as Date, locale)}
                </span>
              </div>

              {item?.product?.title ? (
                <p className="mt-2 font-bold transition-all duration-200 hover:text-blue-600">
                  <Link href={linkRedirect} title={item?.product?.title}>
                    <ReadMore
                      html={String(item?.product?.title ?? '')}
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

                {!['DELIVERED', 'ACCEPTED'].includes(item?.status) &&
                item?.product?.isExpired ? (
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

          {['DELIVERED', 'ACCEPTED'].includes(item?.status) && (
            <Badge className="gap-1 rounded-sm" variant="success">
              <CheckCheckIcon className="size-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {item?.status}
              </span>
            </Badge>
          )}

          {!['DELIVERED', 'ACCEPTED'].includes(item?.status) &&
          item?.product?.isExpired ? (
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
              {Number(item?.priceDiscount) > 0 ? (
                <SerialPrice
                  className="text-sm"
                  value={Number(item?.priceDiscount)}
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
          {item?.productId && (
            <div className="py-4 text-right text-sm font-medium text-gray-600">
              <ButtonInput
                type="button"
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => push(linkRedirect)}
                title={'View Content'}
                icon={<MoveRightIcon className="size-5 text-gray-400" />}
              />
            </div>
          )}

          {/* <div className="ml-auto flex items-center gap-2 lg:hidden">
            {item?.product?.isExpired ? (
              <Badge className="gap-1 rounded-sm" variant="danger">
                <BadgeAlertIcon className="size-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  EXPIRED
                </span>
              </Badge>
            ) : null}
          </div> */}
        </td>
      </tr>
    </>
  );
};

export { ListOrderItemsUser };
