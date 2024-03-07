import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput } from '../ui-setting';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { CreateOnPaymentPI } from '@/api-site/payment';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useStripe } from '@stripe/react-stripe-js';
import { SubmitHandler } from 'react-hook-form';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

// const stripeTestPromise = loadStripe(
//   `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`,
// );

const schema = yup.object({
  email: yup.string().required(),
});

export function CreatePaymentPayPalFormCardUser(props: {
  showModal: boolean;
  setShowModal: any;
}) {
  const { showModal, setShowModal } = props;
  const stripe = useStripe();
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
    try {
      const { data: setupIntent } = await mutateAsync({
        data: { ...payload, type: 'PAYPAL' },
        paymentModel: 'PAYMENT-CREATE',
      });
      AlertSuccessNotification({
        text: 'Phone save successfully',
      });
      // Redirects away from the client
      const stripeRes = await stripe?.confirmPayPalSetup(
        `${setupIntent?.client_secret}`,
        {
          return_url: 'https://www.unopot.com',
          mandate_data: {
            customer_acceptance: {
              type: 'online',
              online: {
                infer_from_client: true,
              },
            },
          },
        },
      );

      console.log('stripeRes ===>', stripeRes);

      // if (error) {
      //   // Inform the customer that there was an error.
      // }
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
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    errors={errors}
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
}
