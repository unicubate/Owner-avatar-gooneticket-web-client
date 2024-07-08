import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateToRFC2822 } from '@/utils';
import { QRCode, QRCodeProps } from 'antd';
import {
  BadgeAlertIcon,
  CalendarDaysIcon,
  CheckCheckIcon,
  DownloadIcon,
} from 'lucide-react';
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
        <p className="mt-4 text-center text-2xl font-semibold uppercase">
          {orderItem?.organizationSeller?.name}
        </p>

        <div className="mx-auto max-w-max border-none border-gray-200 bg-white">
          <p className="mt-4 text-center text-lg font-semibold">
            <QRCode
              size={240}
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

        <div className="text-center">
          <p className="mt-2 text-xl font-semibold">
            {orderItem?.address?.fullName}
          </p>

          <p className="mt-2 text-lg font-semibold">
            {orderItem?.ticketName?.toLocaleUpperCase() ?? 'FREE'}
          </p>
          <p className="mt-2 font-semibold">
            <span>
              {Number(orderItem?.price) > 0 ? (
                <SerialPrice
                  className="text-2xl"
                  value={Number(orderItem?.price)}
                  currency={{ code: String(orderItem?.currency) }}
                />
              ) : (
                'Free'
              )}
            </span>
            <span className="ml-2 text-gray-400">-</span>
            <span className="ml-2 text-xl ">#{orderItem?.orderNumber}</span>
          </p>
          <p className="mt-4 text-xl font-semibold">
            {orderItem?.event?.title}
          </p>
        </div>

        <div className="mx-auto max-w-sm">
          <p className="mt-4 text-center text-lg font-semibold">
            <ButtonInput
              type="button"
              className="uppercase"
              variant={orderItem?.event?.isExpired ? 'danger' : 'success'}
              icon={
                orderItem?.event?.isExpired ? (
                  <BadgeAlertIcon className="size-4" />
                ) : (
                  <CalendarDaysIcon className="size-4" />
                )
              }
            >
              {formateToRFC2822(orderItem?.event?.expiredAt as Date, locale)} at{' '}
              {orderItem?.event?.timeInit}
            </ButtonInput>
          </p>
        </div>
        <p className="mt-4 text-center font-bold uppercase">
          <span>{orderItem?.event?.address ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.event?.city ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.event?.country?.name ?? ''}</span>
        </p>
        {/* <p className="mt-2 text-center text-xl font-bold">
          <span className="ml-2">{orderItem?.event?.timeInit ?? ''}</span>
          {orderItem?.event?.timeEnd ? (
            <>
              <span className="ml-1.5 text-gray-400">-</span>
              <span className="ml-1.5">{orderItem?.event?.timeEnd ?? ''}</span>
            </>
          ) : null}
        </p> */}

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
              <ButtonInput
                icon={<CheckCheckIcon className="size-6" />}
                type="button"
                size="sm"
                variant="success"
              >
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
            ) && orderItem?.event?.isExpired ? (
              <ButtonInput
                icon={<BadgeAlertIcon className="size-6" />}
                type="button"
                size="sm"
                variant="danger"
              >
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
