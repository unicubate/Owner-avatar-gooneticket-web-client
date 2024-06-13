import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateToRFC2822 } from '@/utils';
import { QRCode, QRCodeProps } from 'antd';
import { BadgeAlertIcon, CalendarDaysIcon, DownloadIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { SerialPrice } from '../ui-setting';
import { ButtonInput } from '../ui-setting/button-input';

type Props = {
  orderItem: OrderItemModel;
};

const ViewOrderItemEvent = ({ orderItem }: Props) => {
  const { locale, ipLocation } = useInputState();
  const [level, setLevel] = useState<string | number>('L');
  const { query, push, back } = useRouter();

  return (
    <>
      <div className="px-4 py-5">
        <p className="mt-4 text-center text-3xl font-semibold">
          {orderItem?.organizationSeller?.name}
        </p>

        <div className="mx-auto max-w-max border-none border-gray-200 bg-white">
          <p className="mt-4 text-center text-lg font-semibold">
            <QRCode
              size={200}
              errorLevel={level as QRCodeProps['errorLevel']}
              value={orderItem?.orderNumber}
            />
          </p>
        </div>
        {!orderItem?.isExpired ? (
          <div className="mt-4 flex justify-center">
            <span className="relative flex size-8">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-8 rounded-full bg-green-500"></span>
            </span>
          </div>
        ) : null}

        <p className="mt-4 text-center text-xl font-semibold">
          {orderItem?.priceName?.toLocaleUpperCase() ?? 'FREE'}
        </p>
        <p className="mt-4 text-center font-semibold">
          <span>
            {Number(orderItem?.priceDiscount) > 0 ? (
              <SerialPrice
                className="text-2xl"
                value={Number(orderItem?.priceDiscount)}
                currency={{ code: String(orderItem?.currency) }}
              />
            ) : (
              'Free'
            )}
          </span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2 text-xl ">#{orderItem?.orderNumber}</span>
        </p>
        <p className="mt-4 text-center text-xl font-semibold">
          {orderItem?.product?.title}
        </p>
        <div className="mx-auto max-w-sm">
          <p className="mt-4 text-center text-lg font-semibold">
            <ButtonInput
              type="button"
              className="uppercase"
              variant={orderItem?.product?.isExpired ? 'danger' : 'success'}
              icon={
                orderItem?.product?.isExpired ? (
                  <BadgeAlertIcon className="size-4" />
                ) : (
                  <CalendarDaysIcon className="size-4" />
                )
              }
            >
              {formateToRFC2822(orderItem?.product?.expiredAt as Date, locale)}
            </ButtonInput>
          </p>
        </div>
        <p className="mt-4 text-center text-xl font-bold">
          <span>{orderItem?.product?.country?.name ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.product?.address ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.product?.city ?? ''}</span>
        </p>
        <p className="mt-2 text-center text-xl font-bold">
          <span className="ml-2">{orderItem?.product?.timeInit ?? ''}</span>
          {orderItem?.product?.timeEnd ? (
            <>
              <span className="ml-1.5 text-gray-400">-</span>
              <span className="ml-1.5">
                {orderItem?.product?.timeEnd ?? ''}
              </span>
            </>
          ) : null}
        </p>

        <div className="mx-auto max-w-max">
          <div className="my-4 flex items-center space-x-4">
            {/* <ButtonInput
              type="button"
              size="sm"
              variant="outline"
              icon={<MoveLeftIcon className="size-6" />}
              onClick={() => push(`/orders`)}
            >
              Back
            </ButtonInput> */}
            <ButtonInput
              type="submit"
              size="sm"
              variant="primary"
              icon={<DownloadIcon className="size-6" />}
              onClick={() => {
                push(
                  `${downloadOneFileUploadAPI({
                    folder: String(orderItem?.model.toLocaleLowerCase()),
                    fileName: orderItem?.uploadsFiles[0]?.path,
                  })}`,
                );
              }}
            >
              Download
            </ButtonInput>
            {['DELIVERED', 'ACCEPTED', 'CONFIRMED'].includes(
              orderItem?.status,
            ) && (
              <ButtonInput type="button" size="sm" variant="success">
                {orderItem?.status}
              </ButtonInput>
            )}
            {['CANCELLED'].includes(orderItem?.status) && (
              <ButtonInput type="button" size="sm" variant="danger">
                {orderItem?.status}
              </ButtonInput>
            )}

            {!['DELIVERED', 'ACCEPTED', 'CONFIRMED'].includes(
              orderItem?.status,
            ) && orderItem?.product?.isExpired ? (
              <ButtonInput type="button" size="sm" variant="danger">
                EXPIRED
              </ButtonInput>
            ) : (
              ['PENDING'].includes(orderItem?.status) && (
                <ButtonInput type="button" size="sm" variant="warning">
                  {orderItem?.status}
                </ButtonInput>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { ViewOrderItemEvent };
