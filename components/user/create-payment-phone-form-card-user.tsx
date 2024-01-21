import * as yup from 'yup';
import { ButtonInput } from '../ui-setting';
import { useReactHookForm } from '../hooks/use-react-hook-form';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { PhoneNumberInput } from '../ui-setting/ant';
import { SubmitHandler } from 'react-hook-form';
import { TextInput } from '../ui-setting/shadcn';

const schema = yup.object({
  fullName: yup.string().optional(),
  phone: yup.string().required(),
});

const CreatePaymentPhoneFormCardUser: React.FC<{
  showModal: boolean;
  setShowModal: any;
}> = ({ showModal, setShowModal }) => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

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
        className: 'info',
        gravity: 'top',
        position: 'center',
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
        gravity: 'top',
        className: 'info',
        position: 'center',
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
                  <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}

                <div className="mt-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    errors={errors}
                  />
                </div>

                <div className="mt-4">
                  <PhoneNumberInput
                    control={control}
                    name="phone"
                    placeholder="xxx xxx xxx"
                    errors={errors}
                    required={true}
                  />
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
