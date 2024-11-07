import {
  ButtonInput,
  ButtonLoadMore,
  ErrorFile,
  LoadingFile,
} from '@/components/ui-setting';
import * as yup from 'yup';

import { CreateOnPaymentAPI, GetInfinitePaymentsAPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import { SelectOptionInput, TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { PaymentItemModel } from '@/types/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
};
const schema = yup.object({
  amount: yup.number().min(5).required(),
  paymentId: yup.string().uuid().required('payment method is a required field'),
});

const CreateWithdrawFormUser = ({ isOpen, setIsOpen }: Props) => {
  const { t, hasErrors, setHasErrors } = useInputState();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { user } = useInputState();

  const {
    isLoading: isLoadingPayments,
    isError: isErrorPayments,
    data: dataPayments,
    isFetchingNextPage: isFetchingNextPagePayments,
    hasNextPage: hasNextPagePayments,
    fetchNextPage: fetchNextPagePayments,
  } = GetInfinitePaymentsAPI({
    take: 10,
    sort: 'DESC',
  });

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOnPaymentAPI();

  const onSubmit = async (payload: any) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        data: {
          ...payload,
          currency: user?.profile?.currency?.code,
          customer: 'client',
        },
        paymentModel: 'PAYMENT-SELLER-WITHDRAWALS-CREATE',
      });
      setHasErrors(false);
      AlertSuccessNotification({
        description: 'Request send successfully',
      });
      reset();
      setIsOpen(false);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogContent className="dark:border-input max-h-screen max-w-2xl overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-auto justify-center p-2">
              {hasErrors && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-600 text-center"
                >
                  <AlertDescription className="text-white">
                    {hasErrors}
                  </AlertDescription>
                </Alert>
              )}
              <h2 className="text-center font-bold">
                {' '}
                {t.formatMessage({ id: 'TRANSACTION.WITHDRAW' })}
              </h2>

              <div className="mt-2">
                <TextInput
                  control={control}
                  label="Amount"
                  name="amount"
                  placeholder="amount"
                  errors={errors}
                  required
                  type="number"
                  pattern="[0-9]*"
                  prefix={user?.profile?.currency?.code}
                />
              </div>

              <div className="mt-4">
                <SelectOptionInput
                  label="Payment method"
                  control={control}
                  errors={errors}
                  placeholder="Select payment method"
                  name="paymentId"
                  required
                >
                  {isLoadingPayments ? (
                    <LoadingFile />
                  ) : isErrorPayments ? (
                    <ErrorFile
                      title="404"
                      description="Error find data please try again..."
                    />
                  ) : Number(dataPayments?.pages[0]?.data?.total) <=
                    0 ? null : (
                    dataPayments?.pages
                      .flatMap((page: any) => page?.data?.value)
                      .map((item: PaymentItemModel, index: number) => (
                        <>
                          <option value={item?.id} key={index}>
                            <p className="text-lg font-semibold">
                              {item?.type === 'IBAN' && item?.iban}
                              {item?.type === 'PAYPAL' && item?.email}
                            </p>
                          </option>
                        </>
                      ))
                  )}

                  {hasNextPagePayments && (
                    <div className="mx-auto mt-4 justify-center text-center">
                      <ButtonLoadMore
                        className="h-8 w-[200px]"
                        hasNextPage={hasNextPagePayments}
                        isFetchingNextPage={isFetchingNextPagePayments}
                        onClick={() => fetchNextPagePayments()}
                      />
                    </div>
                  )}
                </SelectOptionInput>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  {t.formatMessage({ id: 'UTIL.CANCEL' })}
                </ButtonInput>
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                >
                  {t.formatMessage({ id: 'UTIL.SAVE' })}
                </ButtonInput>
              </div>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { CreateWithdrawFormUser };
