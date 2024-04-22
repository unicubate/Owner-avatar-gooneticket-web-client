import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, PhoneNumberInput } from '../ui-setting';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { sendCodePhoneUserAPI } from '@/api-site/user';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDecrementTimer, useInputState } from '../hooks';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  phone: yup.string().required(),
  code: yup.string().required(),
});

const CreatePaymentPhoneFormCardUser = (props: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const defaultTimer = 60;
  const { timer, isRunning, setIsRunning } = useDecrementTimer(defaultTimer);
  const [isResend, setIsResend] = useState(false);

  const { ipLocation } = useInputState();
  const { showModal, setShowModal } = props;
  const {
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const watchPhone = watch('phone', '');
  const watchCode = watch('code', '');

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

  const onSubmit: SubmitHandler<{ phone: string; fullName: string }> = async (
    payload,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, type: 'PHONE' },
        paymentModel: 'PAYMENT-CREATE',
      });
      AlertSuccessNotification({
        text: 'Phone save successfully',
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

  const resendCodeItem = async (item: string) => {
    setHasErrors(undefined);
    setIsResend(true);
    try {
      await sendCodePhoneUserAPI({ phone: watchPhone });
      setIsResend(false);
      setIsRunning(true);
    } catch (error: any) {
      setIsResend(false);
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg dark:bg-[#121212]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="p-2 text-base font-bold">Add your phone number</h2>
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

                {/* <div className="mt-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    errors={errors}
                  />
                </div> */}

                <div className="mt-4">
                  <PhoneNumberInput
                    defaultCountry={ipLocation?.countryCode}
                    control={control}
                    name="phone"
                    placeholder="xxx xxx xxx"
                    errors={errors}
                    required={true}
                  />
                </div>

                <div className="mt-4">
                  <div className="space-y-2 sm:flex sm:items-start sm:space-x-2 sm:space-y-0">
                    <div className="flex-1">
                      <TextInput
                        control={control}
                        name="code"
                        placeholder="Enter 6-digit code"
                        errors={errors}
                        required
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                    </div>

                    <div className="group relative">
                      <ButtonInput
                        type="button"
                        variant="info"
                        className="w-full"
                        loading={isResend}
                        onClick={() => resendCodeItem(watchPhone)}
                        disabled={!watchPhone || isRunning ? true : false}
                      >
                        {timer} Send code
                      </ButtonInput>
                    </div>
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
                    loading={loading}
                    disabled={watchCode.length !== 6 && true}
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

export { CreatePaymentPhoneFormCardUser };
