/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOnPaymentPI, DeleteOnePaymentAPI } from '@/api-site/payment';
import {
  PaymentItemModel,
  statusPaymentColorLists,
  statusPaymentLists,
} from '@/types/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { truncateSubstring } from '@/utils/utils';
import { MailPlusIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { Badge } from '../ui/badge';
import { CreateValidationFormCodePhoneUser } from '../user/create-validation-form-code-phone-user';

const ListPayments = (props: { item: PaymentItemModel; index: number }) => {
  const { item, index } = props;
  const { isOpen, setIsOpen, loading, setLoading } = useInputState();
  const [showModal, setShowModal] = useState(false);
  const { locale } = useRouter();

  const { mutateAsync: createOnMutate } = CreateOnPaymentPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

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

  const resendItem = async (item: any) => {
    try {
      await createOnMutate({
        data: { phone: item?.phone, organizationId: item?.organizationId },
        paymentModel: 'RESEND-VERIFY-CODE-PHONE',
      });
      AlertSuccessNotification({
        text: 'Your validation code has been sent',
      });
      setShowModal(true);
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div key={index} className="py-2 flex items-center">
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
            {['PHONE'].includes(item?.type) && (
              <>
                <Badge
                  className="rounded-sm cursor-pointer"
                  variant={statusPaymentColorLists[item?.status] as any}
                  title={`${item?.type} ${statusPaymentLists[item?.status]}`}
                  onClick={() => {
                    item.status !== 'ACTIVE' ? resendItem(item) : null;
                  }}
                >
                  {`${item?.type} ${statusPaymentLists[item?.status]}`}
                </Badge>
              </>
            )}

            {['CARD'].includes(item?.type) && (
              <>
                <Badge
                  className="rounded-sm cursor-pointer"
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
                <Badge
                  className="ml-1 rounded-sm cursor-pointer"
                  variant="outline"
                >
                  {item.cardExpMonth}/
                  {truncateSubstring(String(item?.cardExpYear), 2)}
                </Badge>
              </>
            )}
            {['IBAN'].includes(item?.type) && (
              <>
                <Badge
                  className="rounded-sm cursor-pointer"
                  variant={statusPaymentColorLists[item?.status] as any}
                >
                  {`${item?.type} ${statusPaymentLists[item?.status]}`}
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="ml-auto">
          {['PHONE'].includes(item?.type) && item?.status !== 'ACTIVE' && (
            <ButtonInput
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => {
                item.status !== 'ACTIVE' ? resendItem(item) : null;
              }}
              icon={
                <MailPlusIcon className="size-4 text-gray-600 hover:text-yellow-600" />
              }
            />
          )}

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

      <CreateValidationFormCodePhoneUser
        item={item}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export { ListPayments };
