import { downloadOneFileUploadAPI } from '@/api-site/upload';
import { formateToRFC2822 } from '@/utils';
import { QRCode, QRCodeProps } from 'antd';
import {
  BadgeAlertIcon,
  CalendarDaysIcon,
  DownloadIcon,
  MoveLeftIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting/button-input';

type Props = {
  orderItem: any;
};

const schema = yup.object({});

const ViewOrderItemEvent = ({ orderItem }: Props) => {
  const { locale } = useInputState();
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
              size={330}
              errorLevel={level as QRCodeProps['errorLevel']}
              value={orderItem?.orderNumber}
            />
          </p>
        </div>
        <p className="mt-4 text-center text-xl font-semibold">
          {orderItem?.priceName?.toLocaleUpperCase() ?? 'FREE'}
        </p>
        <p className="mt-4 text-center text-xl font-semibold">
          #{orderItem?.orderNumber}
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
          <span className="ml-2">{orderItem?.product?.address ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.product?.city ?? ''}</span>
          <span className="ml-2 text-gray-400">|</span>
          <span className="ml-2">{orderItem?.product?.timeInit ?? ''}</span>
          <span className="ml-1.5 text-gray-400">-</span>
          <span className="ml-1.5">{orderItem?.product?.timeEnd ?? ''}</span>
        </p>

        <div className="mx-auto max-w-max">
          <div className="my-4 flex items-center space-x-4">
            <ButtonInput
              type="button"
              size="sm"
              variant="outline"
              icon={<MoveLeftIcon className="size-6" />}
              onClick={() => push(`/orders`)}
            >
              Back
            </ButtonInput>
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
          </div>
        </div>
      </div>
    </>
  );
};

export { ViewOrderItemEvent };
