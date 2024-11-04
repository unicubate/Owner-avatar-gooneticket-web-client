import {
  DeleteOnePaymentAPI,
  GetPaymentsPayoutSetupAPI,
} from '@/api-site/payment';
import { ButtonInput } from '@/components/ui-setting';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { CreditCardIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useInputState } from '../../hooks';
import { CreatePaymentIbanFormUserModal } from './create-payment-iban-form-user-modal';

const PayoutFormUser = () => {
  const { t, isOpen, setIsOpen, locale } = useInputState();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { isPending: loading, mutateAsync: saveMutation } =
    DeleteOnePaymentAPI();

  const {
    isLoading: isLoadingPayoutSetup,
    isError: isErrorPayoutSetup,
    data: dataPayoutSetup,
  } = GetPaymentsPayoutSetupAPI();

  const deleteItem = async (paymentId: string) => {
    setIsOpenDelete(true);
    try {
      await saveMutation({ paymentId });
      AlertSuccessNotification({
        description: 'Payout deleted successfully',
      });
      setIsOpenDelete(false);
    } catch (error: any) {
      setIsOpenDelete(true);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };
  return (
    <>
      <div className="dark:border-input dark:bg-background mt-6 overflow-hidden rounded-lg border bg-white">
        <div className="px-4 py-5">
          <div className="flow-root">
            <div className="border-input dark:bg-background mt-4 flex flex-row rounded-md border p-3">
              <div className="flex min-w-0 flex-1 items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold dark:text-white">
                    IBAN
                    {dataPayoutSetup?.ibanUser ? (
                      <>
                        :{' '}
                        <span className="text-primary">
                          {dataPayoutSetup?.ibanUser?.iban}
                        </span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    Save your IBAN to receive payments
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ButtonInput
                  variant={dataPayoutSetup?.ibanUser?.id ? 'danger' : 'outline'}
                  type="button"
                  icon={
                    dataPayoutSetup?.ibanUser?.id ? (
                      <TrashIcon className="size-4" />
                    ) : (
                      <CreditCardIcon className="size-4" />
                    )
                  }
                  onClick={() =>
                    dataPayoutSetup?.ibanUser?.id
                      ? setIsOpenDelete(true)
                      : setIsOpen(true)
                  }
                  size="sm"
                  loading={isLoadingPayoutSetup}
                >
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {dataPayoutSetup?.ibanUser?.id
                      ? `${t.formatMessage({ id: 'UTIL.DELETE' })}`
                      : 'IBAN'}
                  </span>
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <CreatePaymentIbanFormUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : null}

      <ActionModalDialog
        title={t.formatMessage({ id: 'UTIL.DELETE' })}
        loading={loading}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        onClick={() => deleteItem(dataPayoutSetup?.ibanUser?.id)}
        description={t.formatMessage({ id: 'UTIL.CONFIRM_DELETE' })}
      />
    </>
  );
};

export { PayoutFormUser };
