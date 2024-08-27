'use client';

import { PaymentCardFormModel } from '@/types/payment';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { StripeProps } from './create-payment-stripe';

const StripeButtonCardForm = ({ data, paymentModel }: StripeProps) => {
  const { push } = useRouter();

  const { loading, linkHref, setLoading, hasErrors, setHasErrors } =
    useInputState();

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
    const payload: PaymentCardFormModel = {
      ...data,
      type: 'CARD',
      cancelUrl: linkHref,
      reference: newReference,
    };
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { data: session } = await mutateAsync({
        data: payload,
        paymentModel: paymentModel,
      });
      setHasErrors(false);
      setLoading(false);
      if (session?.id) {
        window.location.href = `${session?.url}`;
      }
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
        <div className="mt-4 flex items-center space-x-4">
          <ButtonInput
            size="lg"
            type="submit"
            className="w-full"
            variant="primary"
            loading={loading}
            disabled={!data?.userAddress?.email || !data?.userAddress?.fullName}
          >
            Continue
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { StripeButtonCardForm };
