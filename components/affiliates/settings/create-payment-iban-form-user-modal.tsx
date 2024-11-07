import { ButtonInput } from '@/components/ui-setting';
import * as yup from 'yup';

import { CreateOnPaymentAPI } from '@/api-site/payment';
import { useInputState } from '@/components/hooks';
import { TextInput } from '@/components/ui-setting/shadcn';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import IBAN from 'iban';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  setIsOpen: (i: boolean) => void;
};
const schema = yup.object({
  fullName: yup.string().required('full name is a required field'),
  iban: yup
    .string()
    .required('IBAN is a required field')
    .test('iban', 'IBAN value is invalid', (value) => {
      return IBAN.isValid(value);
    }),
  ibanConfirm: yup
    .string()
    .oneOf([yup.ref('iban')], 'IBAN must match')
    .required('IBAN is a required field'),
});

const CreatePaymentIbanFormUserModal = ({ isOpen, setIsOpen }: Props) => {
  const { ipLocation, hasErrors, setHasErrors } = useInputState();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOnPaymentAPI();

  const onSubmit: SubmitHandler<{ email: string }> = async (payload) => {
    try {
      await saveMutation({
        data: { ...payload, type: 'IBAN', customer: 'client' },
        paymentModel: 'PAYMENT-CREATE',
      });
      AlertSuccessNotification({
        description: 'IBAN save successfully',
      });
      setIsOpen(false);
      reset();
    } catch (error: any) {
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        description: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent className="dark:border-input max-h-screen max-w-2xl overflow-y-scroll">
          <form onSubmit={handleSubmit(onSubmit)}>
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

              <div className="mt-2">
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
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </ButtonInput>
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="primary"
                  loading={loading}
                >
                  Save
                </ButtonInput>
              </div>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { CreatePaymentIbanFormUserModal };
