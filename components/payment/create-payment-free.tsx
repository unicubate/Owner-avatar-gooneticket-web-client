import { CreateOnPaymentPI } from '@/api-site/payment';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { PaymentModel } from '../../api-site/payment';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';

type Props = { data?: any; paymentModel: PaymentModel };
const CreatePaymentFree = ({ data, paymentModel }: Props) => {
  const { push } = useRouter();
  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();

  const { mutateAsync } = CreateOnPaymentPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const handleUserPageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReference = generateLongUUID(30);
    const payload = {
      ...data,
      type: 'FREE',
      reference: newReference,
    };
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: payload,
        paymentModel: paymentModel,
      });
      setHasErrors(false);
      setLoading(false);

      push(`/transactions/success?token=${newReference}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleUserPageSubmit}>
        <div className="flex-auto justify-center">
          {hasErrors && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{hasErrors}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <ButtonInput
              size="lg"
              type="submit"
              className="w-full"
              variant="primary"
              loading={loading}
              disabled={
                !data?.userAddress?.email || !data?.userAddress?.fullName
              }
            >
              Continue Free
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreatePaymentFree };
