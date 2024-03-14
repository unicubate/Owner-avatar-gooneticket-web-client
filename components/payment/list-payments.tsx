/* eslint-disable jsx-a11y/anchor-is-valid */
import { CreateOnPaymentPI, DeleteOnePaymentAPI } from '@/api-site/payment';
import { PaymentItemModel } from '@/types/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { truncateSubstring } from '@/utils/utils';
import { TrashIcon } from 'lucide-react';
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
  // const saveMutation = DeleteOneDiscountAPI({
  //   onSuccess: () => {},
  //   onError: (error?: any) => {},
  // });

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
        text: 'Your authentication code has been sent',
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
      <div key={index} className="py-4">
        <div className="flex items-center">
          <div className="min-w-0 flex-1">
            <div>
              {item?.type === 'CARD' ? (
                <p className="text-lg font-bold dark:text-white">
                  {`XXXX XXXX ${truncateSubstring(item?.cardNumber, 12)}`}
                </p>
              ) : null}

              {item?.type === 'PAYPAL' ? (
                <p className="text-lg font-bold dark:text-white">
                  {item?.email}
                </p>
              ) : null}

              {item?.type === 'PHONE' ? (
                <p className="text-lg font-bold dark:text-white">
                  {item?.phone}
                </p>
              ) : null}
            </div>
            <div>
              {['PHONE'].includes(item?.type) && (
                <Badge
                  className="rounded-sm cursor-pointer"
                  variant={`${item.status === 'ACTIVE' ? 'success' : 'danger'}`}
                  onClick={() => {
                    item.status === 'ACTIVE'
                      ? console.log('Phone number valid')
                      : resendItem(item);
                  }}
                  title="Resend code validation"
                >
                  {item.status === 'ACTIVE'
                    ? 'PHONE VALID'
                    : 'CONFIRM YOUR PHONE NUMBER'}
                </Badge>
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
