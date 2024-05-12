/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateFromNow, formateToRFC2822 } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import { CalendarIcon, MoveRightIcon } from 'lucide-react';
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
  const { isOpen, setIsOpen, locale } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  const linkRedirect = `/orders/${item?.orderNumber}/tickets?model=${item?.model.toLocaleLowerCase()}`;
  return (
    <>
      <tr key={index}>
        <td className="py-2 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            {item?.uploadsImages?.length > 0 ? (
              <div className="relative shrink-0 cursor-pointer">
                <Image
                  width={80}
                  height={60}
                  preview={false}
                  src={`${viewOneFileUploadAPI({
                    folder: String(item?.model.toLocaleLowerCase()),
                    fileName: item?.uploadsImages[0]?.path,
                  })}`}
                  alt={item?.product?.title} />
              </div>
            ) : null}

            <div className="ml-3 min-w-0 flex-1 cursor-pointer">
              <div className="flex items-center text-gray-600">
                <button className="tex-sm">
                  <CalendarIcon className="size-4" />
                </button>
                <span className="ml-1.5 text-sm font-normal">
                  {formateToRFC2822(item?.product?.expiredAt as Date, locale)}
                </span>
              </div>

              {item?.product?.title ? (
                <Link href={linkRedirect}>
                  <div className="mt-2 flex items-center">
                    <p className="font-bold text-gray-600 dark:text-white">
                      <ReadMore
                        html={String(item?.product?.title ?? '')}
                        value={100}
                      />
                    </p>
                  </div>
                </Link>
              ) : null}

              <div className="mt-2 flex items-center font-medium text-gray-600">
                <span className="ml-1.5 text-sm font-bold text-gray-600">
                  #{item?.orderNumber}
                </span>
                <span className="ml-1.5 text-sm font-bold text-gray-600">-</span>
                <span className="ml-1.5 text-sm font-bold text-gray-600">
                  {item?.priceName?.toLocaleUpperCase() ?? 'FREE'}
                </span>

              </div>
            </div>
          </div>
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

          {item?.product?.isExpired ? (
            <Badge className="ml-2 mt-2 rounded-sm" variant={'danger'}>
              EXPIRED
            </Badge>
          ) : null}
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          <div className="ml-4 min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {Number(item?.priceDiscount) > 0 ?
                <SerialPrice
                  className="text-sm"
                  value={Number(item?.priceDiscount)}
                  currency={{ code: String(item?.currency) }}
                /> : 'Free'}
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

          <div className="mt-1 pt-1 lg:hidden">
            <p className="inline-flex text-sm font-bold dark:text-white">
              {item?.product?.isExpired ? (
                <Badge className="rounded-sm" variant={'danger'}>
                  EXPIRED
                </Badge>
              ) : null}
            </p>
          </div>
        </td>
      </tr>
    </>
  );
};

export { ListOrderItemsUser };
