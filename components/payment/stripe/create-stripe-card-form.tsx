import { PaymentCardFormModel } from '@/types/payment';

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useCreditCardValidator } from 'react-creditcard-validator';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { StripeProps } from './create-payment-stripe';

export function CreateStripeCardForm(props: StripeProps) {
  const { push } = useRouter();
  const stripe = useStripe();
  if (!stripe) {
    return;
  }
  const { data, paymentModel } = props;
  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();

  function expDateValidate(month: string, year: string) {
    if (Number(year) > 2070) {
      return 'Expiry Date Year cannot be greater than 2035';
    }
    return;
  }
  const [cardstate, setcardState] = useState({ fullName: '', email: '' });

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
    const { cardNumber, cvc, email, fullName, expiryDate } = cardstate as any;
    const strExpirySplit = expiryDate?.split(' ').join('');
    const strExpiryLength = Number(strExpirySplit?.length);
    const monthDate = strExpirySplit?.substring(2, 0);
    const yearDate = strExpirySplit?.substring(
      strExpiryLength,
      strExpiryLength - 2,
    );

    const payload: PaymentCardFormModel = {
      card: {
        cardNumber: cardNumber,
        cardExpMonth: Number(`${monthDate}`),
        cardExpYear: Number(`20${yearDate}`),
        cardCvc: cvc,
        email: email,
        fullName: fullName,
      },
      type: 'CARD',
      ...data,
    };
    setLoading(true);
    setHasErrors(undefined);
    const newReference = generateLongUUID(30);
    try {
      await mutateAsync({
        data: { ...payload, reference: newReference, type: 'CARD' },
        paymentModel: paymentModel,
      });
      AlertSuccessNotification({
        text: 'Card save successfully',
      });
      setHasErrors(false);
      setLoading(false);

      //push(`/transactions/success?token=${newReference}`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

  return (
    <>
      <form onSubmit={handleUserPageSubmit}>
        <div className="flex-auto justify-center">
          {hasErrors && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{hasErrors}</AlertDescription>
            </Alert>
          )}
          <div className="relative mt-4">
            <Input
              placeholder="Full name or nickname"
              name="fullName"
              onChange={(e) =>
                setcardState({
                  ...cardstate,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="relative mt-4">
            <Input
              required
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setcardState({
                  ...cardstate,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="relative mt-4">
            <Input
              className={`${erroredInputs?.cardNumber ? 'border-red-500' : ''}`}
              required
              {...getCardNumberProps({
                onChange: (e) =>
                  setcardState({
                    ...cardstate,
                    [e.target.name]: e.target.value,
                  }),
              })}
            />
            {erroredInputs?.cardNumber && (
              <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                {erroredInputs?.cardNumber}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-2">
            <div className="mb-2">
              <Input
                className={`${
                  erroredInputs?.expiryDate ? 'border-red-500' : ''
                }`}
                required
                {...getExpiryDateProps({
                  onChange: (e) =>
                    setcardState({
                      ...cardstate,
                      [e.target.name]: e.target.value,
                    }),
                })}
              />
              {erroredInputs?.expiryDate && (
                <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  {erroredInputs?.expiryDate}
                </span>
              )}
            </div>

            <div className="mb-2">
              <Input
                className={`${erroredInputs?.cvc ? 'border-red-500' : ''}`}
                required
                {...getCVCProps({
                  onChange: (e) =>
                    setcardState({
                      ...cardstate,
                      [e.target.name]: e.target.value,
                    }),
                })}
              />
              {erroredInputs?.cvc && (
                <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                  {erroredInputs?.cvc}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <ButtonInput
              type="submit"
              className="w-full"
              size="lg"
              variant="info"
              disabled={!stripe}
              loading={loading}
            >
              Continue
            </ButtonInput>
          </div>
        </div>
      </form>
    </>
  );
}
