import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
// import IBAN from 'iban';
import { SubmitHandler } from 'react-hook-form';
import { useInputState } from '../hooks';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

type Props = {
  showModal: boolean;
  setShowModal: any;
};
const schema = yup.object({
  fullName: yup.string().required('full name is a required field'),
  iban: yup.string().required('IBAN is a required field'),
  // .test('isValid', 'IBAN invalide', (value) => {
  //   return IBAN.isValid(value);
  // }),
  ibanConfirm: yup
    .string()
    .oneOf([yup.ref('iban')], 'IBAN must match')
    .required('IBAN is a required field'),
  // .test('isValid', 'IBAN invalide', (value) => {
  //   return IBAN.isValid(value);
  // }),
});

const CreatePaymentIbanFormUser = ({ showModal, setShowModal }: Props) => {
  const { ipLocation } = useInputState();
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

  const onSubmit: SubmitHandler<{ email: string }> = async (payload) => {
    setLoading(true);
    setHasErrors(undefined);
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, type: 'IBAN' },
        paymentModel: 'PAYMENT-CREATE',
      });
      AlertSuccessNotification({
        text: 'IBAN save successfully',
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

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg dark:bg-[#121212]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription> {hasErrors}</AlertDescription>
                  </Alert>
                )}

                <div className="mt-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    errors={errors}
                    label="Full name"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-2">
                  <div className="mb-2">
                    <TextInput
                      control={control}
                      type="text"
                      name="iban"
                      placeholder={`${ipLocation?.countryCode}1234567890`}
                      errors={errors}
                      label="IBAN"
                    />
                  </div>

                  <div className="mb-2">
                    <TextInput
                      control={control}
                      type="text"
                      name="ibanConfirm"
                      placeholder={`${ipLocation?.countryCode}1234567890`}
                      errors={errors}
                      label="Confirm IBAN"
                    />
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

export { CreatePaymentIbanFormUser };
