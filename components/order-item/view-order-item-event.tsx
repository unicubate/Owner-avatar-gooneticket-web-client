import { downloadOneUploadsAPI } from '@/api-site/upload';
import { QRCodeInput, SerialPrice } from '@/components/ui-setting';
import { ButtonInput } from '@/components/ui-setting/button-input';
import { Badge } from '@/components/ui/badge';
import { OrderItemModel } from '@/types/order-item';
import { AlertDangerNotification, formateToRFC2822 } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import {
  BadgeAlertIcon,
  CalendarDaysIcon,
  CircleCheckBigIcon,
  DownloadIcon,
  User2Icon,
} from 'lucide-react';
import { useInputState } from '../hooks';

type Props = {
  orderItem: OrderItemModel;
};

const ViewOrderItemEvent = ({ orderItem }: Props) => {
  const { t, locale, loading, setLoading } = useInputState();

  const handleDownloadRows = async () => {
    setLoading(true);
    try {
      const response = await downloadOneUploadsAPI({
        folder: String(orderItem?.model.toLocaleLowerCase()),
        fileName: orderItem?.uploadsFileTicket?.path,
      });
      const link = document.createElement('a');
      link.href = response?.config?.url;
      link.click();
      link.remove();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      AlertDangerNotification({
        text: "C'è stato un errore.",
      });
    }
  };
  return (
    <>
      <div className="px-4 py-5">
        <p className="mt-4 text-center text-xl font-semibold uppercase">
          {orderItem?.organizationSeller?.name}
        </p>

        <div className="mx-auto mt-4 max-w-max">
          <QRCodeInput
            size={200}
            errorLevel="L"
            value={orderItem?.orderNumber}
          />
        </div>

        {/* {!orderItem?.isExpired ? (
          <div className="mt-4 flex justify-center">
            <span className="relative flex size-8">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-8 rounded-full bg-green-500"></span>
            </span>
          </div>
        ) : null} */}

        <div className="text-center">
          {orderItem?.fullName ? (
            <div className="mt-2">
              <Badge className="rounded-sm text-sm font-bold" variant="outline">
                <User2Icon className="size-4" />
                <span className="ml-1.5">{orderItem?.fullName}</span>
              </Badge>
            </div>
          ) : null}
          <Badge
            className="mt-2 rounded-sm  text-lg font-semibold"
            variant="secondary"
          >
            {capitalizeFirstLetter(
              orderItem?.ticket?.name ?? t.formatMessage({ id: 'UTIL.FREE' }),
            )}
          </Badge>
          <p className="mt-2 font-semibold">
            <span>
              {Number(orderItem?.priceTotal) > 0 ? (
                <SerialPrice
                  className="text-2xl"
                  value={Number(orderItem?.priceTotal)}
                  currency={{ code: String(orderItem?.currency) }}
                />
              ) : (
                t.formatMessage({ id: 'UTIL.FREE' })
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
              variant={
                orderItem?.confirmedAt
                  ? 'success'
                  : `${orderItem?.eventDate?.expiredAt ? 'danger' : 'primary'}`
              }
              icon={
                orderItem?.confirmedAt ? (
                  <CircleCheckBigIcon className="size-4" />
                ) : orderItem?.eventDate?.expiredAt ? (
                  <BadgeAlertIcon className="size-4" />
                ) : (
                  <CalendarDaysIcon className="size-4" />
                )
              }
            >
              {formateToRFC2822(
                orderItem?.eventDate?.startedAt as Date,
                locale,
              )}{' '}
              at {orderItem?.eventDate?.timeInit}
            </ButtonInput>
          </p>
        </div>
        <p className="mt-4 text-center font-bold uppercase">
          <span>{orderItem?.eventDate?.address ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.eventDate?.city ?? ''}</span>
          <span className="ml-2 text-gray-400">-</span>
          <span className="ml-2">{orderItem?.eventDate?.country ?? ''}</span>
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
            <ButtonInput
              type="submit"
              size="sm"
              variant="ghost"
              loading={loading}
              icon={<DownloadIcon className="size-6" />}
              onClick={() => handleDownloadRows()}
            >
              Download
            </ButtonInput>
            {['DELIVERED', 'CONFIRMED'].includes(orderItem?.status) && (
              <ButtonInput
                icon={<CircleCheckBigIcon className="size-6" />}
                type="button"
                size="sm"
                variant="success"
              >
                {capitalizeFirstLetter(orderItem?.status)}
              </ButtonInput>
            )}
            {['CANCELLED'].includes(orderItem?.status) && (
              <ButtonInput type="button" size="sm" variant="danger">
                {capitalizeFirstLetter(orderItem?.status)}
              </ButtonInput>
            )}

            {!['DELIVERED', 'CONFIRMED'].includes(orderItem?.status) &&
            orderItem?.eventDate?.isExpired ? (
              <ButtonInput
                icon={<BadgeAlertIcon className="size-6" />}
                type="button"
                size="sm"
                variant="danger"
              >
                {capitalizeFirstLetter('EXPIRED')}
              </ButtonInput>
            ) : (
              ['ACCEPTED'].includes(orderItem?.status) && (
                <ButtonInput type="button" size="sm" variant="primary">
                  {capitalizeFirstLetter(orderItem?.status)}
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
