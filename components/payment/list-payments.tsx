/* eslint-disable jsx-a11y/anchor-is-valid */
import { DeleteOnePaymentAPI } from '@/api-site/payment';
import {
  PaymentItemModel,
  statusPaymentColorLists,
  statusPaymentLists,
} from '@/types/payment';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formateDate,
} from '@/utils';
import { truncateSubstring } from '@/utils/utils';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';

const ListPayments = (props: { item: PaymentItemModel; index: number }) => {
  const { item, index } = props;
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();
  const [showModal, setShowModal] = useState(false);

  const { mutateAsync: deleteOnMutate } = DeleteOnePaymentAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await deleteOnMutate({ paymentId: item?.id });
      AlertSuccessNotification({
        text: 'Payment deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div key={index} className="flex items-center py-2">
        <div className="min-w-0 flex-1">
          <div>
            {item?.type === 'CARD' ? (
              <p className="text-lg font-bold dark:text-white">
                {`XXXX XXXX ${truncateSubstring(item?.cardNumber, 12)}`}
              </p>
            ) : null}

            {item?.type === 'IBAN' ? (
              <p className="text-lg font-bold dark:text-white">{item?.iban}</p>
            ) : null}

            {item?.type === 'PAYPAL' ? (
              <p className="text-lg font-bold dark:text-white">{item?.email}</p>
            ) : null}

            {item?.type === 'PHONE' ? (
              <p className="text-lg font-bold dark:text-white">{item?.phone}</p>
            ) : null}
          </div>
          <div className="mt-1">
            <div className="flex items-center">
              {['PHONE'].includes(item?.type) && (
                <>
                  <Badge
                    className="cursor-pointer rounded-sm"
                    variant={statusPaymentColorLists[item?.status] as any}
                    title={`${item?.type} ${statusPaymentLists[item?.status]}`}
                  >
                    {`${item?.type} ${statusPaymentLists[item?.status]}`}
                  </Badge>
                </>
              )}

              {['CARD'].includes(item?.type) && (
                <>
                  <Badge
                    className="cursor-pointer rounded-sm"
                    variant={`${
                      Number(item.cardExpYear) >= new Date().getFullYear()
                        ? 'success'
                        : 'danger'
                    }`}
                  >
                    {Number(item.cardExpYear) >= new Date().getFullYear()
                      ? 'CARD VALID'
                      : 'CARD INVALID'}
                  </Badge>
                  {/* <span className="ml-3 text-sm font-normal text-red-600">
                    {item.cardExpMonth}/
                    {truncateSubstring(String(item?.cardExpYear), 2)}
                  </span> */}
                </>
              )}
              {['IBAN'].includes(item?.type) && (
                <>
                  <Badge
                    className="cursor-pointer rounded-sm"
                    variant={statusPaymentColorLists[item?.status] as any}
                  >
                    {`${item?.type} ${statusPaymentLists[item?.status]}`}
                  </Badge>
                </>
              )}

              <span className="ml-2 text-sm font-normal text-gray-600">
                {formateDate(item?.createdAt as Date, locale)}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <ActionModalDialog
            title="Delete?"
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => deleteItem(item)}
            description="Are you sure you want to delete this?"
            buttonDialog={
              <ButtonInput
                variant="ghost"
                type="button"
                size="icon"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export { ListPayments };
