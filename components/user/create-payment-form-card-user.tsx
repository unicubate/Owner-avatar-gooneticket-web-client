import { ButtonInput } from '../ui-setting';

import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useCreditCardValidator } from 'react-creditcard-validator';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { useInputState } from '../hooks';
import { Alert, AlertDescription } from '../ui/alert';
import { Input } from '../ui/input';

export function CreatePaymentFormCardUser(props: {
  showModal: boolean;
  setShowModal: any;
}) {
  const stripe = useStripe();
  const elements: any = useElements();
  if (!stripe || !elements) {
    return;
  }
  const { showModal, setShowModal } = props;
  const { loading, setLoading, hasErrors, setHasErrors } = useInputState();

  function expDateValidate(month: string, year: string) {
    if (Number(year) > 2070) {
      return 'Expiry Date Year cannot be greater than 2035';
    }
    return;
  }
  const [cardstate, setcardState] = useState({ fullName: '' });

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
    const { cardNumber, cvc, expiryDate } = cardstate as any;
    const strExpirySplit = expiryDate?.split(' ').join('');
    const strExpiryLength = Number(strExpirySplit?.length);
    const monthDate = strExpirySplit?.substring(2, 0);
    const yearDate = strExpirySplit?.substring(
      strExpiryLength,
      strExpiryLength - 2,
    );
    const payload: any = {
      cardNumber: cardNumber,
      cardExpMonth: Number(`${monthDate}`),
      cardExpYear: Number(`20${yearDate}`),
      type: 'CARD',
      cardCvc: cvc,
    };
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, type: 'CARD' },
        paymentModel: 'PAYMENT-CREATE',
      });
      AlertSuccessNotification({
        text: 'Card save successfully',
      });
      setHasErrors(false);
      setLoading(false);
      setShowModal(false);
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
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg dark:bg-[#121212]">
            <form onSubmit={handleUserPageSubmit}>
              {/* <h2 className="p-2 text-base font-bold">Add your card payment</h2> */}
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{hasErrors}</AlertDescription>
                  </Alert>
                )}

                <div className="relative mt-4">
                  <Input
                    required
                    placeholder="Full name"
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
                    className={`${
                      erroredInputs?.cardNumber ? 'border-red-500' : ''
                    }`}
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
                      className={`${
                        erroredInputs?.cvc ? 'border-red-500' : ''
                      }`}
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
                    type="button"
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    size="lg"
                    variant="info"
                    disabled={!stripe || !elements}
                    loading={loading}
                  >
                    Save
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
