import { CreateOnPaymentAPI } from '@/api-site/payment';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { generateLongUUID } from '@/utils/generate-random';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { PaymentModel } from '../../api-site/payment';
import { useInputState } from '../hooks';
import { ButtonInput, PhoneNumberInput } from '../ui-setting';
import { TextInput } from '../ui-setting/shadcn';

const schema = yup.object({
  fullName: yup.string().required('full name is a required field'),
  phone: yup.string().required('phone is a required field'),
  email: yup.string().email().required('email is a required field'),
});

const CreatePaymentBooking = ({
  data,
  paymentModel,
}: {
  data?: any;
  paymentModel: PaymentModel;
}) => {
  const { push } = useRouter();
  const { hasErrors, setHasErrors, ipLocation } = useInputState();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { isPending: loading, mutateAsync } = CreateOnPaymentAPI();

  const onSubmit: SubmitHandler<any> = async (payload: any) => {
    const newReference = generateLongUUID(30);
    const payloadSave = {
      ...data,
      ...payload,
      type: 'BOOKING',
      reference: newReference,
    };
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: payloadSave,
        paymentModel: paymentModel,
      });
      setHasErrors(false);

      AlertSuccessNotification({
        text: `Booking save successfully`,
      });
      push(
        `/transactions/success?token=${newReference}&type=booking&tag=tickets`,
      );
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-input dark:bg-background">
          <div className="p-4 sm:p-4 lg:p-3">
            <p className="text-center text-sm font-semibold">
              The purchase of this ticket can only be done on site
            </p>
            {hasErrors && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{hasErrors}</AlertDescription>
              </Alert>
            )}

            <div className="mt-2">
              <TextInput
                label="Full name"
                control={control}
                type="text"
                name="fullName"
                placeholder="Full name"
                errors={errors}
                required
              />
            </div>

            <div className="mt-2">
              <TextInput
                control={control}
                label="Email"
                type="email"
                name="email"
                inputMode="email"
                placeholder="Email address"
                errors={errors}
                required
              />
            </div>

            <div className="mt-2">
              <PhoneNumberInput
                defaultCountry={ipLocation?.countryCode ?? 'IT'}
                control={control}
                name="phone"
                label="Phone"
                placeholder="Phone number"
                errors={errors}
                required
              />
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
            disabled={!data?.userAddress?.email || !data?.userAddress?.fullName}
          >
            Booking
          </ButtonInput>
        </div>
      </form>
    </>
  );
};

export { CreatePaymentBooking };
