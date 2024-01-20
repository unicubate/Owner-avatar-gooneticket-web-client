import { ButtonInput } from "../ui-setting/ant";
import { PaymentCardFormModel } from "@/types/payment";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useCreditCardValidator, images } from "react-creditcard-validator";

import { FormEvent, useState } from "react";
import { CreateOnPaymentPI } from "@/api-site/payment";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";

const CreatePaymentFormCardUser: React.FC<{
  showModal: boolean;
  setShowModal: any;
}> = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  function expDateValidate(month: string, year: string) {
    if (Number(year) > 2070) {
      return "Expiry Date Year cannot be greater than 2035";
    }
    return;
  }
  const [cardstate, setcardState] = useState({ fullName: "" });

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
    const strExpirySplit = expiryDate?.split(" ").join("");
    const strExpiryLength = Number(strExpirySplit?.length);
    const monthDate = strExpirySplit?.substring(2, 0);
    const yearDate = strExpirySplit?.substring(
      strExpiryLength,
      strExpiryLength - 2
    );
    const payload: PaymentCardFormModel = {
      cardNumber: cardNumber,
      cardExpMonth: Number(`${monthDate}`),
      cardExpYear: Number(`20${yearDate}`),
      type: "CARD",
      cardCvc: cvc,
    };
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, type: "CARD" },
        paymentModel: "PAYMENT-CREATE",
      });
      AlertSuccessNotification({
        text: "Card save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setHasErrors(false);
      setLoading(false);
      setShowModal(false)
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
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
              <h2 className="p-2 text-base font-bold">Add your card payment</h2>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}
                <div className="relative mt-4">
                  <input
                    type="text"
                    className={`block w-full rounded-lg border border-gray-300 px-3 py-2.5 caret-indigo-200 placeholder:text-gray-500 focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm ${erroredInputs?.cvc ? "border-red-500" : ""
                      }`}
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
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg {...getCardImageProps({ images })} />
                  </div>
                  <input
                    className={`block w-full rounded-lg border border-gray-300 px-3 py-2.5 pl-12 caret-indigo-200 placeholder:text-gray-500 focus:border-indigo-200 focus:ring-indigo-500 sm:text-sm ${erroredInputs?.cardNumber ? "border-red-500" : ""
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
                    <input
                      className={`block w-full rounded-lg border border-gray-300 px-3 py-2.5 caret-indigo-50 placeholder:text-gray-500 focus:border-indigo-50 focus:ring-indigo-50 sm:text-sm ${erroredInputs?.expiryDate ? "border-red-500" : ""
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
                    <input
                      className={`block w-full rounded-lg border border-gray-300 px-3 py-2.5 caret-indigo-200 placeholder:text-gray-500 focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm ${erroredInputs?.cvc ? "border-red-500" : ""
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
                    status="cancel"
                    type="button"
                    shape="default"
                    size="normal"
                    loading={loading}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </ButtonInput>
                  <ButtonInput
                    minW="fit"
                    shape="default"
                    type="submit"
                    size="large"
                    loading={loading}
                    color="indigo"
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
};

export { CreatePaymentFormCardUser };
