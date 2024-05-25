'use client';

import { PaymentCardFormModel } from '@/types/payment';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { AlertDangerNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { useStripe } from '@stripe/react-stripe-js';
import { Checkbox } from 'antd';
import valid from 'card-validator';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { images, useCreditCardValidator } from 'react-creditcard-validator';
import { StripeProps } from './create-payment-stripe';

const CreateStripeCardForm = ({ data, paymentModel }: StripeProps) => {
  const { push } = useRouter();
  const stripe = useStripe();

  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();
  const [isSaveCard, setIsSaveCard] = useState(false);
  const [cardstate, setCardState] = useState({
    fullName: '',
    email: '',
  });
  const { cardNumber, cvc, fullName, isReuse, expiryDate } = cardstate as any;

  const isValidCardNumber = valid.number(cardNumber).isValid;
  const isValidExpirationDate = valid.expirationDate(expiryDate).isValid;

  const cardNumberValidator = () => {
    if (!isValidCardNumber) {
      return 'Credit card number is invalid';
    }
    return;
  };

  const expiryDateValidator = (month: string, year: string) => {
    const currentYear = new Date().getFullYear();
    if (Number(year) > currentYear + 20) {
      return 'Expiry Date Year cannot be greater than';
    }
    return;
  };

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
    const strExpirySplit = expiryDate?.split(' ').join('');
    const strExpiryLength = Number(strExpirySplit?.length);
    const monthDate = strExpirySplit?.substring(2, 0);
    const yearDate = strExpirySplit?.substring(
      strExpiryLength,
      strExpiryLength - 2,
    );

    const newReference = generateLongUUID(30);
    const payload: PaymentCardFormModel = {
      card: {
        cardNumber: cardNumber,
        cardExpMonth: Number(`${monthDate}`),
        cardExpYear: Number(`20${yearDate}`),
        cardCvc: cvc,
        email: data?.userAddress?.email,
        isSaveCard: isSaveCard,
        fullName: fullName,
      },
      ...data,
      type: 'CARD',
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

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator({
    expiryDateValidator,
    cardNumberValidator,
  });

  return (
    <>
      <form onSubmit={handleUserPageSubmit}>
        <div className="mt-2 overflow-hidden rounded-lg bg-white dark:bg-[#04080b]">
          <div className="p-4 sm:p-4 lg:p-3">
            <div className="flex-auto justify-center">
              {hasErrors && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{hasErrors}</AlertDescription>
                </Alert>
              )}
              <div className="relative mt-4">
                <Input
                  placeholder="Full name"
                  name="fullName"
                  onChange={(e) =>
                    setCardState({
                      ...cardstate,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="relative mt-4">
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
          </div> */}
              <div className="mt-4">
                <div className="max-w-auto relative flex w-full">
                  <Input
                    className={`${erroredInputs?.cardNumber ? 'border-red-500' : ''}`}
                    required
                    {...getCardNumberProps({
                      onChange: (e) =>
                        setCardState({
                          ...cardstate,
                          [e.target.name]: e.target.value,
                        }),
                    })}
                  />
                  <ButtonInput
                    type="button"
                    variant="link"
                    size="sm"
                    className="!absolute right-1 top-1 rounded"
                  >
                    <svg {...getCardImageProps({ images })} />
                  </ButtonInput>
                </div>
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
                        setCardState({
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
                        setCardState({
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
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isReuse"
                    defaultChecked={isSaveCard}
                    onChange={() => {
                      setIsSaveCard((i) => !i);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-500"
                  >
                    Save this payment method
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <ButtonInput
            size="lg"
            type="submit"
            className="w-full"
            variant="primary"
            loading={loading}
            disabled={
              !stripe ||
              !!isValidCardNumber ||
              !isValidExpirationDate ||
              !data?.userAddress?.email ||
              !data?.userAddress?.fullName
            }
          >
            Continue
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { CreateStripeCardForm };
